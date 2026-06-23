"use client";

import { Check, Clipboard, ExternalLink } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export function CopyLinkResult({ url }: { url: string }) {
  const [copied, setCopied] = useState(false);
  const path = new URL(url).pathname;

  async function copyLink() {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  return (
    <div className="mt-6 rounded-lg border border-teal-200 bg-teal-50 p-4">
      <p className="text-sm font-semibold text-teal-950">Your birthday page is ready</p>
      <p className="mt-2 break-all rounded-md bg-white px-3 py-3 text-sm text-slate-700">
        {url}
      </p>
      <div className="mt-4 flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={copyLink}
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-teal-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-teal-800 focus:outline-none focus:ring-4 focus:ring-teal-200"
        >
          {copied ? <Check className="h-4 w-4" /> : <Clipboard className="h-4 w-4" />}
          {copied ? "Copied" : "Copy link"}
        </button>
        <Link
          href={path}
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-800 transition hover:bg-slate-50 focus:outline-none focus:ring-4 focus:ring-teal-100"
        >
          <ExternalLink className="h-4 w-4" />
          Open page
        </Link>
      </div>
    </div>
  );
}
