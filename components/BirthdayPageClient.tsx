"use client";

import { useEffect, useMemo, useState } from "react";
import type { BirthdayPageViewModel } from "@/lib/types";
import { BirthdayReveal } from "./BirthdayReveal";
import { CountdownDisplay } from "./CountdownDisplay";

function getRemainingParts(targetMs: number, nowMs: number) {
  const totalSeconds = Math.max(0, Math.floor((targetMs - nowMs) / 1000));
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return { days, hours, minutes, seconds };
}

function getState(nowMs: number, birthdayMs: number, expiresMs: number) {
  if (nowMs >= expiresMs) {
    return "expired";
  }

  if (nowMs >= birthdayMs) {
    return "reveal";
  }

  return "countdown";
}

export function BirthdayPageClient({ page }: { page: BirthdayPageViewModel }) {
  const [nowMs, setNowMs] = useState(() => Date.now());
  const birthdayMs = useMemo(() => new Date(page.birthdayAtUtc).getTime(), [page.birthdayAtUtc]);
  const expiresMs = useMemo(() => new Date(page.expiresAtUtc).getTime(), [page.expiresAtUtc]);
  const state = getState(nowMs, birthdayMs, expiresMs);

  useEffect(() => {
    if (state !== "countdown") {
      return;
    }

    const interval = window.setInterval(() => {
      setNowMs(Date.now());
    }, 1000);

    return () => window.clearInterval(interval);
  }, [state]);

  if (state === "expired") {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f7f3ec] px-4 text-center">
        <p className="text-2xl font-bold text-slate-900">This birthday page has expired.</p>
      </main>
    );
  }

  if (state === "reveal") {
    return (
      <BirthdayReveal
        friendName={page.friendName}
        message={page.message}
        photoUrl={page.photoUrl}
        fallbackMemeId={page.fallbackMemeId}
      />
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f7f3ec] px-4 py-10">
      <section className="w-full text-center">
        <p className="mb-8 text-2xl font-bold text-slate-900 sm:text-3xl">
          {page.friendName}&apos;s birth anniversary
        </p>
        <div className="mx-auto flex justify-center">
          <CountdownDisplay parts={getRemainingParts(birthdayMs, nowMs)} />
        </div>
      </section>
    </main>
  );
}
