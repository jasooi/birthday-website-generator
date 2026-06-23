# Phase 5 Tasks: Expiration Cleanup And Deployment

## Cleanup Endpoint

- Create the cleanup API route.
- Add authorization using `CRON_SECRET`.
- Query expired records.
- Delete uploaded photos from storage.
- Delete expired database rows.
- Return a cleanup summary.

## Vercel Cron

- Add `vercel.json`.
- Configure the cleanup schedule.
- Confirm the cron path points to the cleanup endpoint.

## Production Configuration

- Document required environment variables.
- Add `.env.example`.
- Confirm server-only secrets are not exposed to the client.
- Confirm Supabase policies are suitable for production.

## Deployment

- Deploy to Vercel.
- Add production environment variables.
- Confirm the home page works in production.
- Create a test birthday page.
- Confirm the generated production link works.
- Confirm expired pages are hidden.

## Verification

- Manually trigger cleanup with the correct secret.
- Confirm cleanup rejects missing or invalid secrets.
- Confirm uploaded photos for expired pages are deleted.
- Confirm meme assets remain available.
- Confirm database rows for expired pages are deleted.
- Run mobile Lighthouse checks for the generator page.
- Run mobile Lighthouse checks for a generated birthday page.
- Fix any major mobile performance or layout issues before launch.
