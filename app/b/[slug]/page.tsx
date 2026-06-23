import { DateTime } from "luxon";
import { BirthdayPageClient } from "@/components/BirthdayPageClient";
import { getBirthdayPageBySlug, toViewModel } from "@/lib/birthday-pages";
import { getSupabaseAdminClient, MissingEnvironmentError } from "@/lib/supabase";
import type { BirthdayPageViewModel } from "@/lib/types";

type PageProps = {
  params: Promise<{ slug: string }>;
};

function ExpiredOrMissingPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f7f3ec] px-4 text-center">
      <p className="text-2xl font-bold text-slate-900">This birthday page is not available.</p>
    </main>
  );
}

function ConfigPage({ message }: { message: string }) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f7f3ec] px-4">
      <div className="max-w-xl rounded-lg border border-amber-200 bg-amber-50 p-5 text-slate-900">
        <h1 className="text-xl font-bold">Configuration needed</h1>
        <p className="mt-2 text-sm leading-6 text-slate-700">{message}</p>
      </div>
    </main>
  );
}

function getTestPage(slug: string): BirthdayPageViewModel {
  const birthdayAtUtc = DateTime.utc().plus({ minutes: 10 }).toISO() ?? "";
  const expiresAtUtc = DateTime.utc().plus({ days: 3 }).toISO() ?? "";

  return {
    slug,
    friendName: "Alex",
    message: "Hope your day is ridiculous in the best possible way.",
    photoUrl: null,
    fallbackMemeId: 1,
    birthdayAtUtc,
    expiresAtUtc
  };
}

async function resolveBirthdayPage(slug: string) {
  const supabase = getSupabaseAdminClient();
  const record = await getBirthdayPageBySlug(supabase, slug);

  if (!record) {
    return { state: "missing" as const };
  }

  if (Date.now() >= new Date(record.expires_at_utc).getTime()) {
    return { state: "expired" as const };
  }

  return { state: "ready" as const, page: toViewModel(record) };
}

export default async function BirthdayPage({ params }: PageProps) {
  const { slug } = await params;

  if (slug === "test") {
    return <BirthdayPageClient page={getTestPage(slug)} />;
  }

  let resolved: Awaited<ReturnType<typeof resolveBirthdayPage>>;

  try {
    resolved = await resolveBirthdayPage(slug);
  } catch (error) {
    if (error instanceof MissingEnvironmentError) {
      return <ConfigPage message={error.message} />;
    }

    throw error;
  }

  if (resolved.state === "missing") {
    return <ExpiredOrMissingPage />;
  }

  if (resolved.state === "expired") {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f7f3ec] px-4 text-center">
        <p className="text-2xl font-bold text-slate-900">This birthday page has expired.</p>
      </main>
    );
  }

  return <BirthdayPageClient page={resolved.page} />;
}
