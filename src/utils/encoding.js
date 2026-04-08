/**
 * Encodes a data object to a base64 string.
 * Uses encodeURIComponent + escape to handle full Unicode (including em-dashes, etc.)
 * @param {Object} obj
 * @returns {string} base64-encoded JSON string
 */
export function encodeData(obj) {
  const json = JSON.stringify(obj)
  // Convert to base64 safely via percent-encoding to handle Unicode
  return btoa(encodeURIComponent(json).replace(/%([0-9A-F]{2})/g, (_, p1) =>
    String.fromCharCode(parseInt(p1, 16))
  ))
}

/**
 * Decodes a base64 string back to a data object.
 * @param {string} str
 * @returns {Object|null} parsed object, or null on error
 */
export function decodeData(str) {
  try {
    const json = decodeURIComponent(
      atob(str)
        .split('')
        .map((c) => '%' + c.charCodeAt(0).toString(16).padStart(2, '0'))
        .join('')
    )
    return JSON.parse(json)
  } catch {
    return null
  }
}
