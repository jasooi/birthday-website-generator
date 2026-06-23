# Phase 5 Design: Expiration Cleanup And Deployment

## Expiration Model

Each birthday page stores:

```txt
expires_at_utc
```

The public page checks this timestamp before showing any personal content. This makes expiry immediate even if the scheduled cleanup has not run yet.

## Cleanup Job

Create an API route:

```txt
/api/cron/delete-expired-pages
```

The route should:

1. Verify the request is authorized.
2. Find records where `expires_at_utc` is before the current time.
3. Delete uploaded photos for records with `photo_storage_path`.
4. Delete the matching database records.
5. Return a summary of deleted records and files.

## Vercel Cron

Run cleanup once per day.

Example schedule:

```txt
0 3 * * *
```

This runs daily at 03:00 UTC.

## Endpoint Protection

Use a secret header or bearer token, stored in an environment variable.

Example:

```txt
CRON_SECRET
```

The cleanup route should reject requests that do not include the expected secret.

## Deployment Configuration

Required environment variables:

```txt
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
CRON_SECRET
```

The service role key must only be used on the server.

## Production Performance Checks

Before considering deployment complete, check both `/` and a sample `/b/[slug]` page on mobile settings.

Focus on:

- Initial load speed.
- Image payload size.
- Layout stability.
- Accessibility of form controls.
- Countdown page hydration cost.
