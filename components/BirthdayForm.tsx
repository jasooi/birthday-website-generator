"use client";

import { Cake, Loader2, X, Upload } from "lucide-react";
import { ChangeEvent, FormEvent, useRef, useState } from "react";
import {
  ALLOWED_PHOTO_TYPES,
  MAX_FRIEND_NAME_LENGTH,
  MAX_MESSAGE_LENGTH,
  MAX_PHOTO_BYTES
} from "@/lib/constants";
import type { CreateBirthdayPageResponse } from "@/lib/types";
import { CopyLinkResult } from "./CopyLinkResult";
import { FieldError } from "./FieldError";
import { ImagePreview } from "./ImagePreview";
import { TimezoneSelect } from "./TimezoneSelect";

type FieldErrors = Record<string, string>;

export function BirthdayForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState("");
  const [resultUrl, setResultUrl] = useState("");
  const [isResultModalOpen, setIsResultModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [preview, setPreview] = useState<{ url: string; name: string } | null>(null);

  function validatePhoto(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0] ?? null;

    if (preview) {
      URL.revokeObjectURL(preview.url);
    }

    if (!file) {
      setPreview(null);
      setFieldErrors((current) => ({ ...current, photo: "" }));
      return;
    }

    if (!ALLOWED_PHOTO_TYPES.includes(file.type as (typeof ALLOWED_PHOTO_TYPES)[number])) {
      event.target.value = "";
      setPreview(null);
      setFieldErrors((current) => ({
        ...current,
        photo: "Upload a JPG, PNG, or WebP image."
      }));
      return;
    }

    if (file.size > MAX_PHOTO_BYTES) {
      event.target.value = "";
      setPreview(null);
      setFieldErrors((current) => ({
        ...current,
        photo: "Keep the photo under 5 MB."
      }));
      return;
    }

    setFieldErrors((current) => ({ ...current, photo: "" }));
    setPreview({ url: URL.createObjectURL(file), name: file.name });
  }

  function clearPhoto() {
    if (preview) {
      URL.revokeObjectURL(preview.url);
    }

    setPreview(null);

    if (fileRef.current) {
      fileRef.current.value = "";
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setFormError("");
    setFieldErrors({});
    setResultUrl("");

    try {
      const response = await fetch("/api/birthday-pages", {
        method: "POST",
        body: new FormData(event.currentTarget)
      });
      const payload = (await response.json()) as CreateBirthdayPageResponse;

      if (!payload.ok) {
        setFormError(payload.error);
        setFieldErrors(payload.fieldErrors ?? {});
        return;
      }

      setResultUrl(payload.url);
      setIsResultModalOpen(true);
      formRef.current?.reset();
      clearPhoto();
    } catch {
      setFormError("Could not create the birthday page. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <form ref={formRef} onSubmit={handleSubmit} className="space-y-4" noValidate>
        <div>
          {resultUrl ? <CopyLinkResult url={resultUrl} variant="compact" /> : null}
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="friendName" className="block text-sm font-black text-slate-800">
              Friend&apos;s name
            </label>
            <input
              id="friendName"
              name="friendName"
              type="text"
              maxLength={MAX_FRIEND_NAME_LENGTH}
              autoComplete="given-name"
              aria-invalid={Boolean(fieldErrors.friendName)}
              aria-describedby={fieldErrors.friendName ? "friend-name-error" : undefined}
              className="mt-1.5 min-h-11 w-full rounded border border-slate-400 bg-white px-3 py-2 text-base text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-[#3d6fa8] focus:ring-4 focus:ring-blue-100"
              placeholder="Alex"
              required
            />
            <FieldError id="friend-name-error" message={fieldErrors.friendName} />
          </div>

          <div>
            <label htmlFor="birthday" className="block text-sm font-black text-slate-800">
              Birthday
            </label>
            <input
              id="birthday"
              name="birthday"
              type="date"
              aria-invalid={Boolean(fieldErrors.birthday)}
              aria-describedby={fieldErrors.birthday ? "birthday-error" : undefined}
              className="mt-1.5 min-h-11 w-full rounded border border-slate-400 bg-white px-3 py-2 text-base text-slate-950 outline-none transition focus:border-[#3d6fa8] focus:ring-4 focus:ring-blue-100"
              required
            />
            <FieldError id="birthday-error" message={fieldErrors.birthday} />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="surpriseTime" className="block text-sm font-black text-slate-800">
              Surprise time
            </label>
            <input
              id="surpriseTime"
              name="surpriseTime"
              type="time"
              defaultValue="00:00"
              aria-invalid={Boolean(fieldErrors.surpriseTime)}
              aria-describedby={fieldErrors.surpriseTime ? "surprise-time-error" : undefined}
              className="mt-1.5 min-h-11 w-full rounded border border-slate-400 bg-white px-3 py-2 text-base text-slate-950 outline-none transition focus:border-[#3d6fa8] focus:ring-4 focus:ring-blue-100"
              required
            />
            <FieldError id="surprise-time-error" message={fieldErrors.surpriseTime} />
          </div>

          <div>
            <label htmlFor="timezone" className="block text-sm font-black text-slate-800">
              Surprise timezone
            </label>
            <div className="mt-1.5">
              <TimezoneSelect error={fieldErrors.timezone} />
            </div>
            <FieldError id="timezone-error" message={fieldErrors.timezone} />
          </div>
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-black text-slate-800">
            Short message
          </label>
          <textarea
            id="message"
            name="message"
            maxLength={MAX_MESSAGE_LENGTH}
            rows={3}
            aria-invalid={Boolean(fieldErrors.message)}
            aria-describedby={fieldErrors.message ? "message-error" : undefined}
            className="mt-1.5 w-full resize-y rounded border border-slate-400 bg-white px-3 py-2 text-base text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-[#3d6fa8] focus:ring-4 focus:ring-blue-100"
            placeholder="Hope your day is ridiculous in the best possible way."
            required
          />
          <FieldError id="message-error" message={fieldErrors.message} />
        </div>

        <div>
          <label htmlFor="photo" className="block text-sm font-black text-slate-800">
            Photo
          </label>
          <label className="mt-1.5 flex min-h-12 cursor-pointer items-center gap-3 rounded border border-dashed border-[#e1528a] bg-white px-3 py-2 text-slate-700 transition hover:bg-pink-50">
            <Upload className="h-5 w-5 flex-none text-[#e1528a]" aria-hidden="true" />
            <span className="min-w-0 text-sm leading-5">
              Optional JPG, PNG, or WebP under 5 MB. A meme is used if you skip this.
            </span>
            <input
              ref={fileRef}
              id="photo"
              name="photo"
              type="file"
              accept={ALLOWED_PHOTO_TYPES.join(",")}
              onChange={validatePhoto}
              className="sr-only"
            />
          </label>
          <FieldError id="photo-error" message={fieldErrors.photo} />
          {preview ? (
            <ImagePreview url={preview.url} fileName={preview.name} onClear={clearPhoto} />
          ) : null}
        </div>

        {formError ? (
          <p className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-800">
            {formError}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={isSubmitting}
          className="mx-auto flex min-h-12 w-full max-w-xs items-center justify-center gap-2 rounded bg-[#3d6fa8] px-5 py-3 text-base font-black text-white shadow-[0_4px_0_#24476d] transition hover:-translate-y-0.5 hover:bg-[#315f9f] focus:outline-none focus:ring-4 focus:ring-blue-200 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isSubmitting ? (
            <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
          ) : (
            <Cake className="h-5 w-5" aria-hidden="true" />
          )}
          {isSubmitting ? "Creating page" : "Create birthday page"}
        </button>
      </form>

      {resultUrl && isResultModalOpen ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/55 px-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="birthday-page-created-title"
        >
          <div className="w-full max-w-lg rounded-lg border-2 border-[#3d6fa8] bg-white p-5 shadow-soft">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p
                  id="birthday-page-created-title"
                  className="text-2xl font-black text-slate-950"
                >
                  Birthday page created!
                </p>
                <p className="mt-1 text-sm leading-6 text-slate-600">
                  Copy this link and send it to your friend.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsResultModalOpen(false)}
                className="inline-flex h-10 w-10 flex-none items-center justify-center rounded border border-slate-300 text-slate-700 transition hover:bg-slate-100 focus:outline-none focus:ring-4 focus:ring-blue-100"
                aria-label="Close result modal"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
            <CopyLinkResult url={resultUrl} />
          </div>
        </div>
      ) : null}
    </>
  );
}
