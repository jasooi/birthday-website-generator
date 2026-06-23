import { DateTime } from "luxon";

export function parseBirthdayDate(value: string) {
  const parsed = DateTime.fromISO(value, { zone: "utc" });

  if (!parsed.isValid) {
    return null;
  }

  return {
    month: parsed.month,
    day: parsed.day
  };
}

export function isValidTimezone(timezone: string) {
  return DateTime.now().setZone(timezone).isValid;
}

export function calculateNextBirthdayUtc(month: number, day: number, timezone: string) {
  const nowInZone = DateTime.now().setZone(timezone);

  for (let offset = 0; offset < 8; offset += 1) {
    const candidate = DateTime.fromObject(
      {
        year: nowInZone.year + offset,
        month,
        day,
        hour: 0,
        minute: 0,
        second: 0,
        millisecond: 0
      },
      { zone: timezone }
    );

    if (candidate.isValid && candidate > nowInZone) {
      return candidate.toUTC();
    }
  }

  throw new Error("Could not calculate the next birthday date.");
}

export function calculateExpiryUtc(birthdayAtUtc: DateTime) {
  return birthdayAtUtc.plus({ days: 3 });
}
