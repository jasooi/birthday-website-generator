# Phase 1 Design: Foundation And Static Experience

## Architecture

Use a standard Next.js App Router structure:

```txt
app/
  page.tsx
  b/
    [slug]/
      page.tsx
components/
lib/
public/
  memes/
```

The first phase focuses on visible structure and reusable UI components. Data can be mocked locally inside page components.

## UI Approach

The home page should be the actual generator experience, not a marketing landing page. The first screen should show the form and make it obvious that the user can create a birthday page.

The public birthday page should have two clean visual states:

- Countdown state: minimal layout with large countdown numbers and the friend's birth anniversary text.
- Reveal state: centered bold birthday heading, centered image, and short message below.

## Meme Assets

Create the directory:

```txt
public/memes/
```

The workspace already has the source images in:

```txt
meme-images/
```

During Next.js setup, copy or move those files into `public/memes/`.

Expected public asset files:

```txt
meme-1.jpg
meme-2.jpg
meme-3.jpg
meme-4.jpg
meme-5.jpg
meme-6.jpg
meme-7.jpg
meme-8.jpg
meme-9.jpg
```

These filenames already match the existing collection, so the app can refer to fallback images with `/memes/meme-{id}.jpg`.

## Component Candidates

- `BirthdayForm`
- `TimezoneSelect`
- `CountdownDisplay`
- `BirthdayReveal`
- `ImagePreview`
- `CopyLinkResult`

## Styling Notes

- Use responsive layouts from the start.
- Keep the birthday page visually simple and focused.
- Avoid clutter on the generated birthday page because the product requirement says the screen should only show the countdown or reveal content.
- Design mobile first, then expand the layout for larger screens.
- Use native input types where possible so mobile keyboards and date pickers work naturally.
- Keep the public birthday page especially lean because many visitors will open it from a shared mobile link.

## Performance Notes

- Avoid large background images on the generator page.
- Do not load uploaded photos or meme images until the reveal state needs them.
- Use responsive image dimensions to prevent layout shift.
- Keep countdown client JavaScript small and isolated to the countdown component.
