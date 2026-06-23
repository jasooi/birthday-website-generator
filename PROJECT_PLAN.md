# Birthday Website Generator Project Plan

## Product Overview

The finished product is a web app that lets a user generate a personalized birthday countdown page for a friend.

The creator enters the friend's name, birthday date, timezone, a short message, and optionally uploads a photo. The app creates a unique shareable URL under the main hosted domain, for example:

```txt
https://example.com/b/alex-8f4k2p
```

Before the birthday arrives in the selected timezone, the generated page shows only:

- A large countdown clock.
- The text "[friend's name]'s birth anniversary".

When the countdown reaches zero in the selected timezone, the generated page switches to the birthday reveal state:

- Big bold text: "Happy birthday [friend's name]!"
- The uploaded photo centered on the page.
- If no photo was uploaded, one of 9 bundled meme images is shown instead.
- The creator's short message appears below the image.

Generated birthday pages expire 3 days after the birthday moment. Expired pages should no longer be publicly viewable, and their database record and uploaded photo should be deleted by a scheduled cleanup job.

## URL And Page Model

The app does not create physical page files for each birthday page. It uses one dynamic route:

```txt
/b/[slug]
```

Each generated page is represented by a database record. The slug in the URL is used to fetch the matching record and render the correct birthday page.

## Suggested Tech Stack

- **Framework:** Next.js with the App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Database:** Supabase Postgres
- **File Storage:** Supabase Storage
- **Hosting:** Vercel
- **Timezone Handling:** Luxon
- **Scheduled Cleanup:** Vercel Cron
- **ID/Slug Generation:** Nano ID or a similar collision-resistant ID library

## Data Model

Primary table: `birthday_pages`

Suggested fields:

```txt
id
slug
friend_name
birthday_month
birthday_day
timezone
message
photo_url
photo_storage_path
fallback_meme_id
birthday_at_utc
expires_at_utc
created_at
updated_at
```

Important behavior:

- `slug` is unique and used in public URLs.
- `birthday_at_utc` stores the next birthday moment converted from the selected timezone.
- `expires_at_utc` is 3 days after `birthday_at_utc`.
- `fallback_meme_id` is chosen at creation time if no photo is uploaded, so the same generated page keeps the same meme.
- `photo_storage_path` is stored so cleanup jobs can delete uploaded photos.
- The existing `meme-images/` folder contains the 9 source meme images. During the Next.js setup, these should be placed under `public/memes/` so generated pages can reference them as static assets.

## Phase Summary

### Phase 1: Foundation And Static Experience

Set up the Next.js application, styling system, basic page structure, and bundled meme assets. Build the first version of the generator form UI and public birthday page UI with mocked data.

### Phase 2: Birthday Page Creation

Add database persistence, slug generation, form submission, timezone-aware birthday calculation, and the generated link result. The app should create real birthday pages without photo uploads yet.

### Phase 3: Countdown And Reveal Behavior

Implement the public `/b/[slug]` route with live countdown behavior and automatic switching to the birthday reveal state. Add expiration checks so expired pages are hidden.

### Phase 4: Photo Uploads And Meme Fallback

Add optional photo upload support, validation, Supabase Storage integration, and fallback meme selection. Make sure reveal pages display either the uploaded photo or the stored fallback meme.

### Phase 5: Expiration Cleanup And Deployment

Add Vercel Cron cleanup for expired pages, delete uploaded files from storage, finalize environment configuration, and prepare the app for production deployment on Vercel.

## Cross-Cutting Requirements

- The public birthday page must be mobile-friendly.
- The generator page must be mobile-friendly and easy to complete on a phone.
- Both the generator page and generated birthday page must load quickly on mobile networks.
- Countdown logic must use the selected timezone, not the visitor's local timezone.
- The app must validate user input before creating a page.
- Uploaded photos must have file type and size limits.
- Uploaded and fallback images should be optimized for fast loading.
- The generated birthday page should keep JavaScript and layout complexity minimal.
- Expired pages must not show personal content.
- Cleanup should delete uploaded user photos but never delete bundled meme assets.
- The project should keep secrets in environment variables.
- The generated page should be safe to share publicly.

## Mobile And Performance Targets

- The generator form should fit comfortably on narrow screens without horizontal scrolling.
- Form controls should use mobile-friendly input types and large tap targets.
- The generated birthday page should render the main countdown or reveal content immediately.
- Images should use responsive sizing and optimized delivery.
- Avoid loading heavy client-side libraries on the public birthday page unless they are required.
- Use server-rendered data where possible and reserve client-side code for the live countdown.
- Target good Lighthouse scores for mobile performance, accessibility, and best practices before deployment.
