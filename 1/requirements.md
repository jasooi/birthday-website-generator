# Phase 1 Requirements: Foundation And Static Experience

## Goal

Create the base application structure and static user experience for the birthday website generator.

## Acceptance Criteria

- A Next.js app is initialized with TypeScript.
- Tailwind CSS is configured and usable across the app.
- The home page contains a generator form with fields for:
  - Friend's name
  - Birthday date
  - Timezone
  - Short message
  - Optional photo upload control
- The form has clear validation-ready UI states, even if validation is not fully wired yet.
- A static birthday page layout exists for the countdown state.
- A static birthday page layout exists for the birthday reveal state.
- The project contains a public meme image directory for 9 fallback images.
- The page layouts work on mobile and desktop widths.
- The generator form is comfortable to use on mobile, with no horizontal scrolling.
- Form fields and buttons have mobile-friendly tap targets.
- Static birthday page layouts are lightweight and avoid unnecessary decorative assets.
- No database, upload, or live countdown behavior is required in this phase.

## Out Of Scope

- Persisting generated pages.
- Creating real shareable links.
- Uploading photos.
- Running a real countdown.
- Deleting expired pages.
