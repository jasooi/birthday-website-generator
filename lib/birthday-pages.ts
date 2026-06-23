import { PHOTO_BUCKET } from "./constants";
import { calculateExpiryUtc, calculateNextBirthdayUtc } from "./time";
import type { BirthdayPageRecord, BirthdayPageViewModel } from "./types";
import type { ValidatedBirthdayInput } from "./validation";
import { createSlug } from "./slug";

type SupabaseAdminClient = ReturnType<typeof import("./supabase").getSupabaseAdminClient>;

type UploadedPhoto = {
  url: string;
  storagePath: string;
};

export function toViewModel(record: BirthdayPageRecord): BirthdayPageViewModel {
  return {
    slug: record.slug,
    friendName: record.friend_name,
    message: record.message,
    photoUrl: record.photo_url,
    fallbackMemeId: record.fallback_meme_id,
    birthdayAtUtc: record.birthday_at_utc,
    expiresAtUtc: record.expires_at_utc
  };
}

function getFileExtension(file: File) {
  if (file.type === "image/png") {
    return "png";
  }

  if (file.type === "image/webp") {
    return "webp";
  }

  return "jpg";
}

async function uploadPhoto(
  supabase: SupabaseAdminClient,
  slug: string,
  file: File | null
): Promise<UploadedPhoto | null> {
  if (!file || file.size === 0) {
    return null;
  }

  const extension = getFileExtension(file);
  const storagePath = `birthday-pages/${slug}/${crypto.randomUUID()}.${extension}`;
  const bytes = Buffer.from(await file.arrayBuffer());

  const { error } = await supabase.storage.from(PHOTO_BUCKET).upload(storagePath, bytes, {
    contentType: file.type,
    upsert: false
  });

  if (error) {
    throw new Error(`Photo upload failed: ${error.message}`);
  }

  const { data } = supabase.storage.from(PHOTO_BUCKET).getPublicUrl(storagePath);

  return {
    url: data.publicUrl,
    storagePath
  };
}

async function deleteUploadedPhoto(supabase: SupabaseAdminClient, upload: UploadedPhoto | null) {
  if (upload?.storagePath) {
    await supabase.storage.from(PHOTO_BUCKET).remove([upload.storagePath]);
  }
}

export async function createBirthdayPage(
  supabase: SupabaseAdminClient,
  input: ValidatedBirthdayInput,
  photo: File | null
) {
  const birthdayAtUtc = calculateNextBirthdayUtc(
    input.birthdayMonth,
    input.birthdayDay,
    input.timezone
  );
  const expiresAtUtc = calculateExpiryUtc(birthdayAtUtc);
  const fallbackMemeId = Math.floor(Math.random() * 9) + 1;

  for (let attempt = 0; attempt < 5; attempt += 1) {
    const slug = createSlug(input.friendName);
    let upload: UploadedPhoto | null = null;

    try {
      upload = await uploadPhoto(supabase, slug, photo);

      const { data, error } = await supabase
        .from("birthday_pages")
        .insert({
          slug,
          friend_name: input.friendName,
          birthday_month: input.birthdayMonth,
          birthday_day: input.birthdayDay,
          timezone: input.timezone,
          message: input.message,
          photo_url: upload?.url ?? null,
          photo_storage_path: upload?.storagePath ?? null,
          fallback_meme_id: fallbackMemeId,
          birthday_at_utc: birthdayAtUtc.toISO(),
          expires_at_utc: expiresAtUtc.toISO()
        })
        .select("slug,birthday_at_utc,expires_at_utc")
        .single();

      if (!error && data) {
        return data;
      }

      await deleteUploadedPhoto(supabase, upload);

      if (error?.code !== "23505") {
        throw new Error(error?.message ?? "Could not create the birthday page.");
      }
    } catch (error) {
      await deleteUploadedPhoto(supabase, upload);

      if (attempt === 4) {
        throw error;
      }
    }
  }

  throw new Error("Could not generate a unique birthday page link.");
}

export async function getBirthdayPageBySlug(supabase: SupabaseAdminClient, slug: string) {
  const { data, error } = await supabase
    .from("birthday_pages")
    .select(
      "slug,friend_name,birthday_month,birthday_day,timezone,message,photo_url,photo_storage_path,fallback_meme_id,birthday_at_utc,expires_at_utc"
    )
    .eq("slug", slug)
    .maybeSingle<BirthdayPageRecord>();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
