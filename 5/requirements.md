# Phase 5 Requirements: Expiration Cleanup And Deployment

## Goal

Prepare the app for production by hiding expired pages, deleting expired data, and deploying the finished app to Vercel.

## Acceptance Criteria

- Expired pages are hidden from public view.
- A scheduled cleanup endpoint deletes expired birthday page records.
- Cleanup deletes uploaded photos from Supabase Storage.
- Cleanup never deletes bundled meme images.
- The cleanup endpoint is protected so random visitors cannot trigger it freely.
- Vercel Cron is configured to run cleanup regularly.
- Production environment variables are documented.
- The app is deployable on Vercel.
- Basic production verification is completed after deployment.
- Production mobile performance is checked for both the generator page and generated birthday page.

## Out Of Scope

- User account dashboards.
- Manual page deletion by creators.
- Analytics.
