import {
  ALLOWED_PHOTO_TYPES,
  MAX_FRIEND_NAME_LENGTH,
  MAX_MESSAGE_LENGTH,
  MAX_PHOTO_BYTES
} from "./constants";
import { DateTime } from "luxon";
import { isValidTimezone, parseSurpriseTime } from "./time";

export type ValidatedBirthdayInput = {
  friendName: string;
  birthdayMonth: number;
  birthdayDay: number;
  surpriseTime: string;
  timezone: string;
  message: string;
};

export function normalizeText(value: FormDataEntryValue | null) {
  return typeof value === "string" ? value.replace(/\s+/g, " ").trim() : "";
}

function parseInteger(value: FormDataEntryValue | null) {
  const normalized = normalizeText(value);
  const parsed = Number(normalized);

  return Number.isInteger(parsed) ? parsed : null;
}

function isPossibleMonthDay(month: number, day: number) {
  for (let year = 2024; year < 2032; year += 1) {
    if (DateTime.fromObject({ year, month, day }).isValid) {
      return true;
    }
  }

  return false;
}

export function validateBirthdayForm(formData: FormData) {
  const fieldErrors: Record<string, string> = {};
  const friendName = normalizeText(formData.get("friendName"));
  const birthdayMonth = parseInteger(formData.get("birthdayMonth"));
  const birthdayDay = parseInteger(formData.get("birthdayDay"));
  const surpriseTime = normalizeText(formData.get("surpriseTime"));
  const timezone = normalizeText(formData.get("timezone"));
  const message = normalizeText(formData.get("message"));

  if (!friendName) {
    fieldErrors.friendName = "Add your friend's name.";
  } else if (friendName.length > MAX_FRIEND_NAME_LENGTH) {
    fieldErrors.friendName = `Use ${MAX_FRIEND_NAME_LENGTH} characters or fewer.`;
  }

  if (
    !birthdayMonth ||
    !birthdayDay ||
    birthdayMonth < 1 ||
    birthdayMonth > 12 ||
    birthdayDay < 1 ||
    birthdayDay > 31 ||
    !isPossibleMonthDay(birthdayMonth, birthdayDay)
  ) {
    fieldErrors.birthday = "Choose a valid birthday day and month.";
  }

  if (!surpriseTime || !parseSurpriseTime(surpriseTime)) {
    fieldErrors.surpriseTime = "Choose a valid surprise time.";
  }

  if (!timezone || !isValidTimezone(timezone)) {
    fieldErrors.timezone = "Choose a valid timezone.";
  }

  if (!message) {
    fieldErrors.message = "Add a short birthday message.";
  } else if (message.length > MAX_MESSAGE_LENGTH) {
    fieldErrors.message = `Use ${MAX_MESSAGE_LENGTH} characters or fewer.`;
  }

  if (Object.keys(fieldErrors).length > 0 || !birthdayMonth || !birthdayDay) {
    return {
      ok: false as const,
      fieldErrors
    };
  }

  return {
    ok: true as const,
    data: {
      friendName,
      birthdayMonth,
      birthdayDay,
      surpriseTime,
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
