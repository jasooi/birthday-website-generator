import { NextRequest, NextResponse } from "next/server";
import { PHOTO_BUCKET } from "@/lib/constants";
import { getSupabaseAdminClient, MissingEnvironmentError } from "@/lib/supabase";

export const runtime = "nodejs";

type ExpiredPage = {
  id: number;
  photo_storage_path: string | null;
};

function isAuthorized(request: NextRequest) {
  const secret = process.env.CRON_SECRET;
  const bearer = request.headers.get("authorization");
  const headerSecret = request.headers.get("x-cron-secret");

  return Boolean(
    secret && (bearer === `Bearer ${secret}` || headerSecret === secret)
  );
}

export async function GET(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const supabase = getSupabaseAdminClient();
    const now = new Date().toISOString();
    const { data, error } = await supabase
      .from("birthday_pages")
      .select("id,photo_storage_path")
      .lt("expires_at_utc", now)
      .limit(100)
      .returns<ExpiredPage[]>();

    if (error) {
      throw new Error(error.message);
    }

    const expiredPages = data ?? [];
    const photoPaths = expiredPages
      .map((page) => page.photo_storage_path)
      .filter((path): path is string => Boolean(path));

    let deletedFiles = 0;

    if (photoPaths.length > 0) {
      const { error: storageError } = await supabase.storage
        .from(PHOTO_BUCKET)
        .remove(photoPaths);

      if (storageError) {
        throw new Error(storageError.message);
      }

      deletedFiles = photoPaths.length;
    }

    const ids = expiredPages.map((page) => page.id);

    if (ids.length > 0) {
      const { error: deleteError } = await supabase
        .from("birthday_pages")
        .delete()
        .in("id", ids);

      if (deleteError) {
        throw new Error(deleteError.message);
      }
    }

    return NextResponse.json({
      ok: true,
      checkedAt: now,
      deletedPages: ids.length,
      deletedFiles
    });
  } catch (error) {
    const message =
      error instanceof MissingEnvironmentError
        ? error.message
        : error instanceof Error
          ? error.message
          : "Cleanup failed.";

    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
