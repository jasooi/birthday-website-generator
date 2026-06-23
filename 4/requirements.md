# Phase 4 Requirements: Photo Uploads And Meme Fallback

## Goal

Allow users to optionally upload a friend's photo and use it on the generated birthday reveal page. If no photo is uploaded, use one of the 9 bundled meme images.

## Acceptance Criteria

- The generator form accepts an optional image file.
- Accepted file types are limited to safe image formats such as JPG, PNG, and WebP.
- File size is limited.
- Uploaded photos are stored in Supabase Storage.
- The database stores the photo URL and storage path.
- If a user uploads a photo, the reveal page displays that photo.
- If no photo is uploaded, the reveal page displays the stored fallback meme.
- The same no-photo birthday page always displays the same fallback meme.
- Failed uploads show a clear error and do not create incomplete birthday records.
- Uploaded and fallback images are displayed with responsive sizing on mobile.
- Image handling avoids unnecessarily large downloads where possible.

## Out Of Scope

- Image editing or cropping.
- Multiple uploaded photos.
- User accounts.
