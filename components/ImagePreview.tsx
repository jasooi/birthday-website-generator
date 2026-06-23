"use client";

import { X } from "lucide-react";
import Image from "next/image";

export function ImagePreview({
  url,
  fileName,
  onClear
}: {
  url: string;
  fileName: string;
  onClear: () => void;
}) {
  return (
    <div className="mt-3 flex items-center gap-3 rounded-md border border-slate-200 bg-slate-50 p-3">
      <Image
        src={url}
        alt=""
        width={64}
        height={64}
        unoptimized
        className="h-16 w-16 flex-none rounded-md object-cover"
      />
      <p className="min-w-0 flex-1 truncate text-sm font-medium text-slate-700">
        {fileName}
      </p>
      <button
        type="button"
        onClick={onClear}
        className="inline-flex h-10 w-10 flex-none items-center justify-center rounded-md border border-slate-300 bg-white text-slate-700 transition hover:bg-slate-100 focus:outline-none focus:ring-4 focus:ring-teal-100"
        aria-label="Remove selected photo"
      >
        <X className="h-5 w-5" aria-hidden="true" />
      </button>
    </div>
  );
}
