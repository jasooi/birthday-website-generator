# Phase 3 Tasks: Countdown And Reveal Behavior

## Data Fetching

- Implement database lookup by slug.
- Handle missing records.
- Pass birthday page data into the public page UI.

## Page State

- Implement state calculation for missing, expired, countdown, and reveal.
- Add server-side expired check.
- Add client-side transition from countdown to reveal.

## Countdown UI

- Build a large countdown component.
- Format days, hours, minutes, and seconds.
- Update the countdown every second.
- Stop the interval when the page switches to reveal or unmounts.

## Reveal UI

- Show the birthday heading.
- Show image area centered on the page.
- Show the message below the image.
- Use fallback meme images until uploaded photos are available.

## Verification

- Test a page with a future birthday timestamp.
- Test a page with a birthday timestamp in the past but before expiry.
- Test a page with an expired timestamp.
- Test an unknown slug.
- Confirm countdown flips to reveal automatically.
- Verify the generated page on mobile viewport sizes.
- Check that countdown ticking does not cause layout shift.
- Run a mobile Lighthouse check for the generated birthday page.
