import React, { forwardRef } from 'react'
import Card from './Card.jsx'

/**
 * Card 1 — intro card with company name highlighted in accent color.
 * forwardRef passes ref through to the underlying Card / motion.div.
 */
const Card1 = forwardRef(function Card1(
  {
    company,
    cardNumber,
    totalCards,
    onSwipeLeft,
    onSwipeRight,
    isActive,
    initial,
    animate,
    exit,
    transition,
  },
  ref
) {
  return (
    <Card
      ref={ref}
      cardNumber={cardNumber}
      totalCards={totalCards}
      onSwipeLeft={onSwipeLeft}
      onSwipeRight={onSwipeRight}
      isActive={isActive}
      initial={initial}
      animate={animate}
      exit={exit}
      transition={transition}
    >
      <h2
        className="mb-[22px]"
        style={{
          fontFamily: 'Handjet, sans-serif',
          fontWeight: 600,
          fontSize: '40px',
          letterSpacing: '2px',
          lineHeight: 1,
          background: 'linear-gradient(149deg, #674A91 25.96%, #2A2D65 92.23%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}
      >
        Kostya and{' '}
        <span>{company || 'You'}</span>
        {' '}— let's check the match.
      </h2>
      <p style={{ fontFamily: 'Mont, sans-serif', fontWeight: 400, fontSize: '20px', letterSpacing: 0, lineHeight: '145%', color: '#494B80' }}>
        The answer is in the next four cards.
      </p>
    </Card>
  )
})

export default Card1
