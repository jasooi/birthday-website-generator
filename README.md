# Birthday Website Generator

A Next.js app for creating personalized birthday countdown and reveal pages.

## Local Setup

1. Install dependencies:

```bash
npm install
```

2. Create `.env.local` from `.env.example` and fill in:

```txt
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
CRON_SECRET
```

3. Start the app:

```bash
npm run dev
```

Visit `http://localhost:3000` for the generator and `http://localhost:3000/b/test` for a mocked countdown page.

## Supabase

The remote Supabase project has a `birthday_pages` table and a public `birthday-photos` storage bucket. The app uses `SUPABASE_SERVICE_ROLE_KEY` only on the server for page creation, public page lookup, uploads, and cleanup.

## Cleanup

Expired pages are hidden immediately by the public route. Vercel Cron calls:

```txt
/api/cron/delete-expired-pages
```

The endpoint requires either:

```txt
Authorization: Bearer $CRON_SECRET
```

or:

```txt
x-cron-secret: $CRON_SECRET
```

## Deployment

Deploy to Vercel with the environment variables from `.env.example`. `vercel.json` schedules cleanup daily at 03:00 UTC.
