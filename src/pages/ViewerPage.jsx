import React, { useState, useCallback } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import useCardData from '../hooks/useCardData'
import CardStack from '../components/CardStack.jsx'
import { DotGrid } from '../components/DotGrid.jsx'
import ViewerBackground from '../components/ViewerBackground.jsx'

/**
 * /:company viewer page.
 * Extracts company from URL params and d from search params.
 * Decodes card data and renders CardStack, or a fallback if invalid.
 */
export default function ViewerPage() {
  const { company: companySlug } = useParams()
  const [searchParams] = useSearchParams()
  const d = searchParams.get('d')

  const { company, cards, isValid } = useCardData(d)

  // Use decoded company name, fallback to URL slug (formatted)
  const displayCompany = company || formatSlug(companySlug)

  // Swipe direction — передається у ViewerBackground для реакції mesh gradient
  const [swipeDirection, setSwipeDirection] = useState(null)

  const handleSwipe = useCallback((direction) => {
    setSwipeDirection(direction)
    // Скидаємо після того як spring animation завершиться
    setTimeout(() => setSwipeDirection(null), 700)
  }, [])

  if (!isValid) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="min-h-screen w-full flex items-center justify-center bg-[#e0e3ff] px-6"
      >
        <ViewerBackground swipeDirection={null} />
        <div className="relative z-10 text-center max-w-[600px] w-full" style={{ border: 'none', background: '#ECDFFF' }}>
          <div
            style={{
              background: '#d9d9d9',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              padding: '0 20px',
              userSelect: 'none',
            }}
          >
            <span style={{ fontFamily: 'Handjet, sans-serif', fontStyle: 'normal', fontWeight: 600, fontSize: '32px', lineHeight: '110%', color: '#2A2D65', letterSpacing: '0.96px' }}>
              Error
            </span>
          </div>
          <div style={{ position: 'relative', flexGrow: 1, minHeight: '220px' }}>
            <DotGrid />
            <div style={{ padding: '40px 32px 40px 40px', position: 'relative', zIndex: 1, textAlign: 'left' }}>
              <h2 style={{ fontFamily: 'Handjet, sans-serif', fontWeight: 600, fontSize: '24px', color: '#181655', marginBottom: '8px', letterSpacing: '1px' }}>
                This link seems incomplete.
              </h2>
              <p style={{ fontFamily: 'Mont, sans-serif', fontWeight: 400, fontSize: '16px', color: '#494B80', lineHeight: '145%' }}>
                The card data couldn't be loaded. Double-check the URL or ask for a new link.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <div className="min-h-screen w-full bg-[#e0e3ff] flex flex-col items-center justify-center">
      {/* Динамічний фон — fixed шар позаду */}
      <ViewerBackground swipeDirection={swipeDirection} />

      {/* Основний контент — відносний шар поверх фону */}
      <div className="relative z-10 w-full max-w-[600px] h-screen flex flex-col">
        <CardStack
          company={displayCompany}
          cards={cards}
          onSwipe={handleSwipe}
        />
      </div>
    </div>
  )
}

/**
 * Converts a slug like "my-company" into "My Company" for display.
 */
function formatSlug(slug) {
  if (!slug) return ''
  return slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}
