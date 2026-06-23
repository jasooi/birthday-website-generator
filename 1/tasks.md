# Phase 1 Tasks: Foundation And Static Experience

## Setup

- Initialize the Next.js app with TypeScript.
- Install and configure Tailwind CSS.
- Add basic project scripts for development, linting, and building.
- Create the initial App Router structure.

## Static Generator Page

- Build the home page at `/`.
- Add the birthday generator form.
- Add fields for name, birthday, timezone, message, and optional photo.
- Add basic client-side form state.
- Add placeholder submit handling.

## Static Birthday Page

- Create the dynamic route at `/b/[slug]`.
- Add mocked page data for local rendering.
- Build the countdown layout.
- Build the birthday reveal layout.
- Add a temporary toggle or mocked condition to preview both states.

## Assets

- Create `public/memes/`.
- Move or copy the existing `meme-images/meme-1.jpg` through `meme-images/meme-9.jpg` files into `public/memes/` during app setup.
- Confirm each fallback meme is available at `/memes/meme-{id}.jpg`.

## Verification

- Run the local dev server.
- Confirm the home page renders.
- Confirm the `/b/test` page renders.
- Check mobile and desktop layout widths.
- Check that neither page has horizontal scrolling on common mobile widths.
- Check that tap targets are comfortable on mobile.
- Run an initial Lighthouse or browser performance check.
