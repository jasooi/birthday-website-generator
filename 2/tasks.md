# Phase 2 Tasks: Birthday Page Creation

## Database

- Create a Supabase project.
- Add the `birthday_pages` table.
- Add a unique index on `slug`.
- Configure environment variables for Supabase.
- Add a Supabase server client helper.

## Form Validation

- Add required validation for friend name, birthday, timezone, and message.
- Add length limits for friend name and message.
- Add invalid date handling.
- Add user-facing error messages.

## Creation Logic

- Install timezone and slug libraries.
- Implement next birthday calculation.
- Implement expiry calculation.
- Implement fallback meme ID selection.
- Implement slug generation.
- Add retry handling if a generated slug collides.

## Result UI

- Show the generated birthday page link after successful creation.
- Add a copy-link button.
- Add a direct link to preview the generated page.

## Verification

- Submit valid form data and confirm a database row is created.
- Confirm the generated URL contains the stored slug.
- Confirm invalid form submissions do not create records.
- Confirm birthday and expiry timestamps are correct for multiple timezones.
- Test form submission on a narrow mobile viewport.
- Confirm the generated link result remains visible and usable on mobile.
