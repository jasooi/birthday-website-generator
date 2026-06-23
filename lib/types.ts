export type BirthdayPageRecord = {
  slug: string;
  friend_name: string;
  birthday_month: number;
  birthday_day: number;
  timezone: string;
  message: string;
  photo_url: string | null;
  photo_storage_path: string | null;
  fallback_meme_id: number;
  birthday_at_utc: string;
  expires_at_utc: string;
};

export type BirthdayPageViewModel = {
  slug: string;
  friendName: string;
  message: string;
  photoUrl: string | null;
  fallbackMemeId: number;
  birthdayAtUtc: string;
  expiresAtUtc: string;
};

export type CreateBirthdayPageResponse =
  | {
      ok: true;
      slug: string;
      url: string;
      birthdayAtUtc: string;
      expiresAtUtc: string;
    }
  | {
      ok: false;
      error: string;
      fieldErrors?: Record<string, string>;
    };
