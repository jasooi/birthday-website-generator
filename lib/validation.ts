import {
  ALLOWED_PHOTO_TYPES,
  MAX_FRIEND_NAME_LENGTH,
  MAX_MESSAGE_LENGTH,
  MAX_PHOTO_BYTES
} from "./constants";
import { isValidTimezone, parseBirthdayDate } from "./time";

export type ValidatedBirthdayInput = {
  friendName: string;
  birthdayMonth: number;
  birthdayDay: number;
  timezone: string;
  message: string;
};

export function normalizeText(value: FormDataEntryValue | null) {
  return typeof value === "string" ? value.replace(/\s+/g, " ").trim() : "";
}

export function validateBirthdayForm(formData: FormData) {
  const fieldErrors: Record<string, string> = {};
  const friendName = normalizeText(formData.get("friendName"));
  const birthday = normalizeText(formData.get("birthday"));
  const timezone = normalizeText(formData.get("timezone"));
  const message = normalizeText(formData.get("message"));
  const parsedBirthday = parseBirthdayDate(birthday);

  if (!friendName) {
    fieldErrors.friendName = "Add your friend's name.";
  } else if (friendName.length > MAX_FRIEND_NAME_LENGTH) {
    fieldErrors.friendName = `Use ${MAX_FRIEND_NAME_LENGTH} characters or fewer.`;
  }

  if (!parsedBirthday) {
    fieldErrors.birthday = "Choose a valid birthday date.";
  }

  if (!timezone || !isValidTimezone(timezone)) {
    fieldErrors.timezone = "Choose a valid timezone.";
  }

  if (!message) {
    fieldErrors.message = "Add a short birthday message.";
  } else if (message.length > MAX_MESSAGE_LENGTH) {
    fieldErrors.message = `Use ${MAX_MESSAGE_LENGTH} characters or fewer.`;
  }

  if (Object.keys(fieldErrors).length > 0 || !parsedBirthday) {
    return {
      ok: false as const,
      fieldErrors
    };
  }

  return {
    ok: true as const,
    data: {
      friendName,
      birthdayMonth: parsedBirthday.month,
      birthdayDay: parsedBirthday.day,
      timezone,
      message
    }
  };
}

export function validatePhotoFile(file: File | null) {
  if (!file || file.size === 0) {
    return null;
  }

  if (!ALLOWED_PHOTO_TYPES.includes(file.type as (typeof ALLOWED_PHOTO_TYPES)[number])) {
    return "Upload a JPG, PNG, or WebP image.";
  }

  if (file.size > MAX_PHOTO_BYTES) {
    return "Keep the photo under 5 MB.";
  }

  return null;
}
