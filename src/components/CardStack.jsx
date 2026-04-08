import React, { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import Loader from './Loader.jsx'
import Card from './Card.jsx'
import Card1 from './Card1.jsx'
import Card6 from './Card6.jsx'
import CardIndicator from './CardIndicator.jsx'
import NavigationArrows from './NavigationArrows.jsx'

/**
 * CardStack manages the full card sequence:
 * Loader → Card1 (intro) → Cards 2-5 (content) → Card6 (CTA)
 *
 * Total visible cards: 1 (intro) + 4 (content) + 1 (final) = 6
 */
export default function CardStack({ company, cards, onSwipe }) {
  const [loading, setLoading] = useState(true)
  const [activeIndex, setActiveIndex] = useState(0) // 0-indexed among the 6 cards
  const [direction, setDirection] = useState(0) // 0: loader-to-1, 1: next, -1: prev
  const [showNav, setShowNav] = useState(false)
  const [isNavigatingToFinal, setIsNavigatingToFinal] = useState(false)
  // ref для синхронного читання в момент exit-анімації
  const isNavigatingToFinalRef = useRef(false)

  const shouldReduceMotion = useReducedMotion()

  // Total = Card1 + 4 content cards + Card6
  const totalCards = 1 + (cards?.length || 0) + 1

  const goNext = useCallback(() => {
    setDirection(1)
    onSwipe && onSwipe('left')
    if (activeIndex === totalCards - 2) {
      // Синхронно ставимо ref ДО оновлення index
      isNavigatingToFinalRef.current = true
      setIsNavigatingToFinal(true)
      setShowNav(false)
      setActiveIndex((prev) => Math.min(prev + 1, totalCards - 1))
    } else {
      isNavigatingToFinalRef.current = false
      setIsNavigatingToFinal(false)
      setActiveIndex((prev) => Math.min(prev + 1, totalCards - 1))
    }
  }, [activeIndex, totalCards, onSwipe])

  const goPrev = useCallback(() => {
    setDirection(-1)
    isNavigatingToFinalRef.current = false
    setIsNavigatingToFinal(false)
    onSwipe && onSwipe('right')
    setActiveIndex((prev) => Math.max(prev - 1, 0))
  }, [onSwipe])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (loading) return
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        goNext()
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        goPrev()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [loading, goNext, goPrev])

  const handleLoaderComplete = useCallback(() => {
    setDirection(0)
    setLoading(false)
    // Delay navigation arrows appearance by 0.8 seconds after card appears
    setTimeout(() => {
      setShowNav(true)
    }, 800)
  }, [])

  const isFirst = activeIndex === 0
  const isLast = activeIndex === totalCards - 1
  const displayNumber = activeIndex + 1 // 1-indexed for display

  // Determine which card to render based on activeIndex
  const renderActiveCard = () => {
    // Shared transition config for Spring
    const springConfig = { type: 'spring', stiffness: 200, damping: 20 }
    // Shared transition config for Spring bounces (Loader -> Card 1)
    const bounceConfig = { type: 'spring', damping: 15, stiffness: 100 }
    
    // Default 3D flip animations
    const flipInitial = { opacity: 0, rotateY: direction > 0 ? 90 : -90, scale: 0.95 }
    const flipAnimate = { opacity: 1, rotateY: 0, scale: 1, y: 0 }
    const flipExit = { opacity: 0, rotateY: direction > 0 ? -90 : 90, scale: 0.95 }

    if (activeIndex === 0) {
      const isFromLoader = direction === 0;
      return (
        <Card1
          key="card-intro"
          company={company}
          cardNumber={1}
          totalCards={totalCards}
          onSwipeLeft={goNext}
          onSwipeRight={goPrev}
          isActive={true}
          initial={isFromLoader ? { opacity: 0, y: '100%', scale: 0.3 } : flipInitial}
          animate={isFromLoader ? { opacity: 1, y: 0, scale: 1 } : flipAnimate}
          exit={flipExit}
          transition={isFromLoader ? bounceConfig : springConfig}
        />
      )
    }

    if (activeIndex === totalCards - 1) {
      return (
        <Card6 
          key="card-cta" 
          initial={{ opacity: 0, scale: 0.8, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={flipExit} 
          transition={bounceConfig}
        />
      )
    }

    // Content cards (indices 1 through totalCards-2)
    const contentIndex = activeIndex - 1
    const cardData = cards[contentIndex]

    if (!cardData) return null
    
    // Читаємо ref синхронно — гарантовано актуальне значення в момент рендеру exit
    const goingToShredder = isNavigatingToFinalRef.current

    const matchTitles = ['1st match', '2nd match', '3rd match', '4th match']
    const windowTitle = matchTitles[activeIndex - 1] || 'Cover Letter'

    return (
      <Card
        key={`card-content-${activeIndex}`}
        headline={cardData.headline}
        body={cardData.body}
        cardNumber={activeIndex + 1}
        totalCards={totalCards}
        onSwipeLeft={goNext}
        onSwipeRight={goPrev}
        isActive={true}
        initial={flipInitial}
        animate={flipAnimate}
        windowTitle={windowTitle}
        exit={
          goingToShredder
            ? { y: '-150%', rotate: -5, opacity: 0, scale: 1.05 }
            : flipExit
        }
        transition={
          goingToShredder
            ? { duration: 1.0, ease: 'anticipate' }
            : springConfig
        }
      />
    )
  }

  return (
    <div className="flex flex-col items-center justify-center w-full h-full gap-[72px]">
      {/* Card area */}
      <div className="w-full max-w-[600px] px-4">
          <AnimatePresence mode="wait">
            {loading ? (
              <Loader key="loader" onComplete={handleLoaderComplete} />
            ) : (
              renderActiveCard()
            )}
          </AnimatePresence>
        </div>

      {/* Indicator + arrows row */}
      <AnimatePresence>
        {!loading && !isLast && showNav && (
          <motion.div 
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.9 }}
            transition={{ type: 'spring', damping: 20, stiffness: 100 }}
            className="w-full max-w-[600px] px-4 flex items-center"
          >
            <NavigationArrows
              onPrev={goPrev}
              onNext={goNext}
              isFirst={isFirst}
              isLast={isLast}
              indicator={<CardIndicator current={displayNumber} total={totalCards} />}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
