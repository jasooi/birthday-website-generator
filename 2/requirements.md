# Phase 2 Requirements: Birthday Page Creation

## Goal

Allow users to submit the generator form and create real birthday page records with unique shareable links.

## Acceptance Criteria

- Supabase database configuration is added.
- A `birthday_pages` table exists.
- The form validates required fields before submission.
- The app creates a unique slug for each birthday page.
- The app stores the submitted name, birthday, timezone, message, and fallback meme choice.
- The app calculates and stores:
  - `birthday_at_utc`
  - `expires_at_utc`
- The app returns a shareable link after successful creation.
- The shareable link points to `/b/[slug]`.
- If creation fails, the user sees a clear error state.
- Form submission works smoothly on mobile without layout jumps or hidden controls.
- Photo upload does not need to work yet.

## Out Of Scope

- Supabase Storage photo uploads.
- Cron cleanup.
- Advanced spam protection.
