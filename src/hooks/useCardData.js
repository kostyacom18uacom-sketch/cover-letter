import { useMemo } from 'react'
import { decodeData } from '../utils/encoding'

/**
 * Decodes card data from the `d` query param string.
 * @param {string|null} d - base64-encoded data string from URL
 * @returns {{ company: string, cards: Array, isValid: boolean }}
 */
export default function useCardData(d) {
  return useMemo(() => {
    if (!d) return { company: '', cards: [], isValid: false }

    const decoded = decodeData(d)

    if (
      !decoded ||
      typeof decoded !== 'object' ||
      typeof decoded.company !== 'string' ||
      !Array.isArray(decoded.cards) ||
      decoded.cards.length === 0
    ) {
      return { company: '', cards: [], isValid: false }
    }

    return {
      company: decoded.company,
      cards: decoded.cards,
      isValid: true,
    }
  }, [d])
}
