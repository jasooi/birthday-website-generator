type CountdownParts = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

const labels: Array<keyof CountdownParts> = ["days", "hours", "minutes", "seconds"];

export function CountdownDisplay({ parts }: { parts: CountdownParts }) {
  return (
    <div className="grid w-full max-w-3xl grid-cols-2 gap-3 sm:grid-cols-4">
      {labels.map((label) => (
        <div
          key={label}
          className="rounded-lg border border-slate-200 bg-white px-3 py-5 text-center shadow-soft"
        >
          <div className="font-mono text-4xl font-bold tabular-nums text-slate-950 sm:text-5xl">
            {String(parts[label]).padStart(2, "0")}
          </div>
          <div className="mt-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
            {label}
          </div>
        </div>
      ))}
    </div>
  );
}
