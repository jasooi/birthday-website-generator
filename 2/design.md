# Phase 2 Design: Birthday Page Creation

## Database

Create a Supabase table named `birthday_pages`.

Suggested schema:

```sql
create table birthday_pages (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  friend_name text not null,
  birthday_month integer not null,
  birthday_day integer not null,
  timezone text not null,
  message text not null,
  photo_url text,
  photo_storage_path text,
  fallback_meme_id integer not null,
  birthday_at_utc timestamptz not null,
  expires_at_utc timestamptz not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
```

## Creation Flow

1. User submits the form.
2. Client validates required fields.
3. Server action or API route validates input again.
4. Server generates a unique slug.
5. Server calculates the next birthday moment in the selected timezone.
6. Server calculates the expiry moment 3 days later.
7. Server chooses a fallback meme ID from 1 to 9.
8. Server inserts the record.
9. Client receives and displays the generated URL.

## Timezone Calculation

Use Luxon to interpret the selected date in the selected timezone.

Rules:

- Birthday unlock time is midnight at the start of the birthday date in the selected timezone.
- If this year's birthday has already passed in that timezone, target next year's birthday.
- Store the final moment in UTC.
- Store expiry as birthday moment plus 3 days.

## Slug Strategy

Use a short random slug with enough entropy to avoid collisions.

Example:

```txt
alex-k9x2p7
```

The name prefix is optional. A pure random ID is also acceptable:

```txt
k9x2p7va
```

The database unique constraint on `slug` is the source of truth.

## Server Boundaries

All sensitive Supabase writes should happen on the server. The client should not directly insert birthday page rows with privileged keys.

## Mobile And Performance Notes

- Keep the creation response small and return only the data needed to show the generated link.
- Show submission loading states without replacing the whole page layout.
- Avoid blocking the initial generator page render on nonessential data.
