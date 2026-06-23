import { customAlphabet } from "nanoid";

const randomId = customAlphabet("23456789abcdefghijkmnopqrstuvwxyz", 8);

export function createSlug(friendName: string) {
  const prefix = friendName
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 24);

  return prefix ? `${prefix}-${randomId()}` : randomId();
}
