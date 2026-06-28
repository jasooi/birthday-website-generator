# Birthday Website Generator
A Next.js app that allows you to create temporary birthday websites for your friends who love memes. You upload a birthday meme, set the time and date you want the meme to be revealed and then generate a website containing a countdown, which you can send to your friend. When the countdown is over, the website transforms into a card with your meme and your message.

Try here: https://birthday-website-generator-beta.vercel.app/



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
