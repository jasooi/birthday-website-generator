# Phase 3 Design: Countdown And Reveal Behavior

## Rendering Approach

The server page at `/b/[slug]` should fetch the birthday page record first. It can then pass the record into a client component responsible for live countdown updates.

Suggested split:

```txt
app/b/[slug]/page.tsx
components/BirthdayPageClient.tsx
components/CountdownDisplay.tsx
components/BirthdayReveal.tsx
```

## State Rules

Use these states:

```txt
missing
expired
countdown
reveal
```

State calculation:

- `missing`: no record exists for the slug.
- `expired`: current UTC time is after `expires_at_utc`.
- `countdown`: current UTC time is before `birthday_at_utc`.
- `reveal`: current UTC time is on or after `birthday_at_utc` and before expiry.

## Countdown Logic

The client component receives ISO timestamp strings:

```txt
birthday_at_utc
expires_at_utc
```

It calculates the remaining milliseconds using the browser's current time. This is acceptable because the target timestamp is already absolute UTC time.

The display should include days, hours, minutes, and seconds.

Keep this component small. The generated birthday page should fetch data on the server and hydrate only the part of the page that needs live ticking.

## Expired Page

Expired pages should not display:

- Friend name
- Message
- Uploaded photo
- Meme choice

The expired state can simply say:

```txt
This birthday page has expired.
```

## Image Placeholder

Until Phase 4 is complete, the reveal state can display the selected fallback meme path based on `fallback_meme_id`.

## Mobile And Performance Notes

- Use a single-column centered layout for the generated page.
- Reserve stable space for countdown numbers and reveal images to avoid layout shift.
- Avoid animation-heavy effects on the public page.
- Keep custom fonts optional or use system fonts for faster first render.
