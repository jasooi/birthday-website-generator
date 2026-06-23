import { BirthdayForm } from "@/components/BirthdayForm";
import { Gift, Sparkles } from "lucide-react";

export default function HomePage() {
  return (
    <main className="min-h-screen overflow-x-hidden px-4 py-8 text-slate-950 sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-5">
        <section className="w-full overflow-hidden rounded-lg border border-[#315f9f] bg-[#f3f4f6] shadow-soft">
          <div className="flex items-center gap-3 bg-[#3d6fa8] px-4 py-3 text-white sm:px-6">
            <Gift className="h-6 w-6 flex-none" aria-hidden="true" />
            <div className="min-w-0">
              <p className="text-lg font-black leading-tight sm:text-2xl">
                Birthday Page Generator
              </p>
            </div>
          </div>

          <div className="px-4 py-5 sm:px-6 sm:py-6">
            <div className="mb-5">
              <h1 className="text-2xl font-black leading-tight text-slate-950 sm:text-3xl">
                Did you forget to wish your friend happy birthday? Make a surprise birthday meme page for your friend!
              </h1>
            </div>
            <BirthdayForm />
          </div>
        </section>

        <aside className="rounded-lg border-2 border-dashed border-[#e1528a] bg-white/92 p-5 text-slate-900 shadow-soft sm:p-6">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 flex-none text-[#e1528a]" aria-hidden="true" />
            <h2 className="text-xl font-black">How this works</h2>
          </div>
          <p className="mt-3 text-sm leading-7 text-slate-700 sm:text-base">
            We&apos;ll countdown to your friend&apos;s birthday for you. At midnight,
            the birthday fairy changes your birthday page link to a birthday card
            with your image and message. Don&apos;t worry if you don&apos;t have an
            image though. We&apos;ll include a meme for free. Anyway, this page is
            only live for 3 days including the birthday.
          </p>
        </aside>
      </div>
    </main>
  );
}
