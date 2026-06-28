# Phase 3 Requirements: Countdown And Reveal Behavior

## Goal

Make the generated birthday page load real data, show a live countdown before the birthday, and reveal the birthday message when the countdown reaches zero.

## Acceptance Criteria

- `/b/[slug]` fetches the matching birthday page from the database.
- Unknown slugs show a not-found or expired-style page.
- Expired pages do not reveal personal content.
- Before `birthday_at_utc`, the page shows:
  - "[friend's name]'s birth anniversary"
  - A large live countdown clock
- At or after `birthday_at_utc`, before expiry, the page shows:
  - "Happy birthday [friend's name]!"
  - The selected image area
  - The short message
- The countdown updates at least once per second.
- The page automatically switches from countdown state to reveal state without requiring a refresh.
- Countdown behavior is based on stored UTC timestamps, which were calculated from the selected timezone.
- The birthday page is optimized for mobile visitors opening shared links.
- The birthday page uses minimal client-side JavaScript beyond the live countdown.

## Out Of Scope

- Photo upload implementation.
- Cron deletion of expired records.
