import { DateTime } from "luxon";

export function isValidTimezone(timezone: string) {
  return DateTime.now().setZone(timezone).isValid;
}

export function parseSurpriseTime(value: string) {
  const match = /^([01]\d|2[0-3]):([0-5]\d)$/.exec(value);

  if (!match) {
    return null;
  }

  return {
    hour: Number(match[1]),
    minute: Number(match[2])
  };
}

export function calculateNextBirthdayUtc(
  month: number,
  day: number,
  timezone: string,
  surpriseTime: string
) {
  const nowInZone = DateTime.now().setZone(timezone);
  const parsedTime = parseSurpriseTime(surpriseTime);

  if (!parsedTime) {
    throw new Error("Could not calculate the surprise time.");
  }

  for (let offset = 0; offset < 8; offset += 1) {
    const candidate = DateTime.fromObject(
      {
        year: nowInZone.year + offset,
        month,
        day,
        hour: parsedTime.hour,
        minute: parsedTime.minute,
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
