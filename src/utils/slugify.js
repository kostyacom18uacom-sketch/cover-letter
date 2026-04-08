/**
 * Converts a string to a URL-friendly slug.
 * Lowercases, replaces spaces with hyphens, strips non-alphanumeric chars except hyphens.
 * @param {string} str
 * @returns {string}
 */
export function slugify(str) {
  return str
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}
