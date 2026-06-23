import { TIMEZONE_OPTIONS } from "@/lib/constants";

export function TimezoneSelect({
  error,
  defaultValue = "Asia/Tokyo"
}: {
  error?: string;
  defaultValue?: string;
}) {
  return (
    <select
      id="timezone"
      name="timezone"
      defaultValue={defaultValue}
      aria-invalid={Boolean(error)}
      aria-describedby={error ? "timezone-error" : undefined}
      className="min-h-11 w-full rounded border border-slate-400 bg-white px-3 py-2 text-base text-slate-950 outline-none transition focus:border-[#3d6fa8] focus:ring-4 focus:ring-blue-100"
      required
    >
      {TIMEZONE_OPTIONS.map((timezone) => (
        <option key={timezone} value={timezone}>
          {timezone.replace("_", " ")}
        </option>
      ))}
    </select>
  );
}
