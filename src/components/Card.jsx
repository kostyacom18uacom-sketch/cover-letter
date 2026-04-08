import React, { useRef, forwardRef } from 'react'
import { motion } from 'framer-motion'
import { MinimizeIcon, MaximizeIcon, CloseIcon } from './win2k-icons/Icons.jsx'
import { DotGrid } from './DotGrid.jsx'

/**
 * Base card component with drag-to-swipe navigation.
 * forwardRef is required for AnimatePresence mode="popLayout" compatibility.
 */
const Card = forwardRef(function Card(
  {
    headline,
    body,
    cardNumber,
    totalCards,
    onSwipeLeft,
    onSwipeRight,
    isActive,
    initial,
    animate,
    exit,
    transition,
    children,
    windowTitle,
  },
  ref
) {
  const SWIPE_THRESHOLD = 80

  const handleDragEnd = (event, info) => {
    const offsetX = info.offset.x

    if (offsetX < -SWIPE_THRESHOLD) {
      onSwipeLeft && onSwipeLeft()
    } else if (offsetX > SWIPE_THRESHOLD) {
      onSwipeRight && onSwipeRight()
    }
  }

  return (
    <motion.div
      ref={ref}
      key={cardNumber}
      initial={initial || { opacity: 0, scale: 0.95, y: 12 }}
      animate={animate || { opacity: 1, scale: 1, y: 0 }}
      exit={exit || { opacity: 0, x: '-120%' }}
      transition={transition || { duration: 0.3, ease: 'easeOut' }}
      drag={isActive ? 'x' : false}
      dragElastic={0.1}
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={handleDragEnd}
      whileDrag={{ cursor: 'grabbing' }}
      className="w-full cursor-grab active:cursor-grabbing select-none"
      style={{
        touchAction: 'pan-y',
        background: '#ECDFFF',
        border: 'none',
        borderRadius: 0,
        overflow: 'hidden',
      }}
    >
      {/* Win2K Titlebar */}
      <div
        style={{
          background: 'linear-gradient(90deg, #CFD4FF 0%, #D6DAFF 14%, #E1E4FF 32%, #E7E9FF 40.05%, #DBFFF8 50%, #D3FFF7 57.88%, #C7FFF4 65.59%, #B9FFF1 100%), #D9D9D9',
          height: '40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 20px',
          userSelect: 'none',
          flexShrink: 0,
        }}
      >
        <span
          style={{
            fontFamily: 'Handjet, sans-serif',
            fontStyle: 'normal',
            fontWeight: 500,
            fontSize: '30px',
            lineHeight: '110%',
            color: '#2A2D65',
            letterSpacing: '0.96px',
            opacity: 0.8,
          }}
        >
          {windowTitle || 'Cover Letter'}
        </span>
        <div style={{ display: 'flex', gap: '4px', opacity: 0.8 }}>
          <MinimizeIcon style={{ cursor: 'default', flexShrink: 0 }} />
          <MaximizeIcon style={{ cursor: 'default', flexShrink: 0 }} />
          <CloseIcon style={{ cursor: 'default', flexShrink: 0 }} />
        </div>
      </div>

      {/* Card Content */}
      <div style={{ position: 'relative', flexGrow: 1, minHeight: '220px' }}>
        <DotGrid />
        <div style={{ padding: '40px 32px 40px 40px', position: 'relative', zIndex: 1 }}>
          {children ? (
            children
          ) : (
            <>
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
                {headline}
              </h2>
              <p style={{ fontFamily: 'Mont, sans-serif', fontWeight: 400, fontSize: '20px', letterSpacing: 0, lineHeight: '145%', color: '#494B80' }}>
                {body}
              </p>
            </>
          )}
        </div>
      </div>
    </motion.div>
  )
})

export default Card
