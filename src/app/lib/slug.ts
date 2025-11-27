// src/lib/slug.ts
export function projectSlug(name: string) {
  return name
    .toLowerCase()
    .replace(/[()]/g, "")      // شيل الأقواس
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}
