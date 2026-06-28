# Phase 4 Tasks: Photo Uploads And Meme Fallback

## Storage Setup

- Create the Supabase Storage bucket.
- Configure access rules for uploaded birthday photos.
- Add server helper functions for upload and delete.

## Form Enhancements

- Add client-side file type validation.
- Add client-side file size validation.
- Add selected image preview.
- Add upload progress or loading state during submission.

## Server Upload Logic

- Validate uploaded file type.
- Validate uploaded file size.
- Upload file to storage.
- Retrieve or construct the public image URL.
- Store the photo URL and storage path in the database.
- Clean up uploaded file if record creation fails.

## Reveal Logic

- Display uploaded photo when `photo_url` exists.
- Display fallback meme when `photo_url` is empty.
- Add image loading and error fallback behavior.
- Use responsive image rendering.
- Reserve image space to prevent layout shift on mobile.

## Verification

- Create a page with an uploaded JPG.
- Create a page with an uploaded PNG.
- Create a page with an uploaded WebP.
- Confirm oversized files are rejected.
- Confirm unsupported files are rejected.
- Confirm no-photo pages use a stable meme fallback.
- Test uploaded-photo reveal pages on mobile.
- Check image loading speed and layout stability.
