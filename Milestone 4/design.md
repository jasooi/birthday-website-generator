# Phase 4 Design: Photo Uploads And Meme Fallback

## Upload Flow

The simplest implementation is:

1. User submits form with optional photo.
2. Server validates text fields and file metadata.
3. If a photo exists, server uploads it to Supabase Storage.
4. Server stores `photo_url` and `photo_storage_path` with the birthday page record.
5. If no photo exists, server stores only `fallback_meme_id`.

## Storage Bucket

Create a Supabase Storage bucket for uploaded birthday photos.

Suggested bucket:

```txt
birthday-photos
```

Suggested object path:

```txt
birthday-pages/{slug}/{generated-file-name}
```

## File Validation

Recommended limits:

- Max file size: 5 MB
- Allowed MIME types:
  - `image/jpeg`
  - `image/png`
  - `image/webp`

Validation should happen on the server even if the client also validates.

## Image Performance

- Use Next.js image optimization for uploaded photos and meme fallbacks where practical.
- Store display dimensions or use predictable aspect-ratio containers to reduce layout shift.
- Consider compressing uploaded photos during or before upload if the first version needs stronger performance.
- Keep the 5 MB upload limit as a safety cap, but aim to serve much smaller optimized display images.

## Meme Fallback

If no photo is uploaded, choose a number from 1 to 9 during creation and store it as `fallback_meme_id`.

Reveal path:

```txt
/memes/meme-{fallback_meme_id}.jpg
```

## Failure Handling

If upload succeeds but database insert fails, the server should attempt to delete the uploaded file so unused photos are not left behind.
