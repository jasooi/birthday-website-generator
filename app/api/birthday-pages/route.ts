import { NextRequest, NextResponse } from "next/server";
import { createBirthdayPage } from "@/lib/birthday-pages";
import { getSupabaseAdminClient, MissingEnvironmentError } from "@/lib/supabase";
import type { CreateBirthdayPageResponse } from "@/lib/types";
import { validateBirthdayForm, validatePhotoFile } from "@/lib/validation";

export const runtime = "nodejs";

function getOrigin(request: NextRequest) {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  }

  if (process.env.VERCEL === "1") {
    return "https://birthday-website-generator-beta.vercel.app";
  }

  return request.nextUrl.origin;
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const validated = validateBirthdayForm(formData);
    const rawPhoto = formData.get("photo");
    const photo = rawPhoto instanceof File && rawPhoto.size > 0 ? rawPhoto : null;
    const photoError = validatePhotoFile(photo);

    if (!validated.ok || photoError) {
      const response: CreateBirthdayPageResponse = {
        ok: false,
        error: "Please fix the highlighted fields.",
        fieldErrors: {
          ...(!validated.ok ? validated.fieldErrors : {}),
          ...(photoError ? { photo: photoError } : {})
        }
      };

      return NextResponse.json(response, { status: 400 });
    }

    const supabase = getSupabaseAdminClient();
    const page = await createBirthdayPage(supabase, validated.data, photo);
    const response: CreateBirthdayPageResponse = {
      ok: true,
      slug: page.slug,
      url: `${getOrigin(request)}/${page.slug}`,
      birthdayAtUtc: page.birthday_at_utc,
      expiresAtUtc: page.expires_at_utc
    };

    return NextResponse.json(response);
  } catch (error) {
    const message =
      error instanceof MissingEnvironmentError
        ? error.message
        : error instanceof Error
          ? error.message
          : "Something went wrong while creating the page.";

    return NextResponse.json(
      {
        ok: false,
        error: message
      } satisfies CreateBirthdayPageResponse,
      { status: 500 }
    );
  }
}
