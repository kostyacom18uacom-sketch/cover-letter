import React, { useEffect, useState, useRef, forwardRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { TELEGRAM_URL } from '../constants/defaults'
import { MinimizeIcon, MaximizeIcon, CloseIcon } from './win2k-icons/Icons.jsx'
import { DotGrid } from './DotGrid.jsx'

const TARGET_PERCENT = 97.77

/**
 * Card 6 — final card with animated progress bar and CTA button.
 * No drag/swipe. Shows "97.77%" with animated fill, then button appears.
 * forwardRef is required for AnimatePresence mode="popLayout" compatibility.
 */
const Card6 = forwardRef(function Card6({ initial, animate, exit, transition }, ref) {
  const [count, setCount] = useState(0)
  const [showButton, setShowButton] = useState(false)
  const animationRef = useRef(null)
  const startTimeRef = useRef(null)

  useEffect(() => {
    const duration = 2000 // 2s for a nice counter feel

    const animateCount = (timestamp) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp
      const elapsed = timestamp - startTimeRef.current
      const progress = Math.min(elapsed / duration, 1)

      // Ease-out cubic for smooth slowing down
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(eased * TARGET_PERCENT)

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animateCount)
      } else {
        setTimeout(() => setShowButton(true), 200)
      }
    }

    animationRef.current = requestAnimationFrame(animateCount)

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
    }
  }, [])

  return (
    <motion.div
      ref={ref}
      key="card6"
      initial={initial || { opacity: 0, scale: 0.95, y: 12 }}
      animate={animate || { opacity: 1, scale: 1, y: 0 }}
      exit={exit || { opacity: 0 }}
      transition={transition || { duration: 0.3, ease: 'easeOut' }}
      className="w-full select-none"
      style={{
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
          Match Result
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
          {/* Big percentage */}
          <div className="mb-[14px]">
            <span style={{
              fontFamily: 'Handjet, sans-serif',
              fontWeight: 600,
              fontSize: '40px',
              letterSpacing: '2px',
              lineHeight: 1,
              background: 'linear-gradient(149deg, #674A91 25.96%, #2A2D65 92.23%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              {count.toFixed(2)}%
            </span>
          </div>

          <p className="mb-8" style={{ fontFamily: 'Mont, sans-serif', fontWeight: 400, fontSize: '20px', letterSpacing: 0, lineHeight: '145%', color: '#494B80' }}>
            Coincidence? Probably not.
          </p>

          {/* CTA Button — Win2K taskbar button style with Scanline Reveal */}
          <div 
            style={{ 
              marginTop: '44px',
              position: 'relative', 
              display: 'flex', 
              justifyContent: 'flex-start',
              alignItems: 'center',
              width: '100%',
              minHeight: '60px', // Reserve space for button + glow
            }}
          >
            <AnimatePresence>
              {showButton && (
                <div style={{ position: 'relative', display: 'flex', justifyContent: 'flex-start' }}>
                  {/* Reveal Container */}
                  <motion.div
                    initial={{ clipPath: 'inset(0% 0% 100% 0%)', opacity: 0 }}
                    animate={{ clipPath: 'inset(0% 0% 0% 0%)', opacity: 1 }}
                    transition={{ duration: 0.8, ease: "linear" }}
                    style={{ 
                      position: 'relative', 
                      display: 'flex', 
                      justifyContent: 'flex-start' 
                    }}
                  >
                    <motion.a
                      href={TELEGRAM_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="win2k-shimmer"
                      whileHover={{ boxShadow: '0px 0px 10px rgba(213, 194, 242, 0.4)' }}
                      whileTap={{ y: 2, x: 1 }}
                      transition={{ type: 'spring', stiffness: 500, damping: 15 }}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '10px 24px',
                        border: '2px solid transparent',
                        borderRadius: 0,
                        fontFamily: 'Handjet, sans-serif',
                        fontWeight: 500,
                        fontSize: '22px',
                        letterSpacing: '2px',
                        lineHeight: '100%',
                        color: '#211f68',
                        textDecoration: 'none',
                        cursor: 'pointer',
                        pointerEvents: 'auto',
                        whiteSpace: 'nowrap'
                      }}
                    >
                      Write to Kostya
                    </motion.a>
                  </motion.div>

                  {/* Scanline Line Effect */}
                  <motion.div
                    initial={{ top: '0%', opacity: 0 }}
                    animate={{ 
                      top: ['0%', '100%'],
                      opacity: [0, 1, 1, 0]
                    }}
                    transition={{ duration: 0.8, ease: "linear" }}
                    style={{
                      position: 'absolute',
                      left: 0,
                      width: '180px',
                      height: '2px',
                      background: '#FBF8FF',
                      boxShadow: '0 0 15px #9171BF, 0 0 5px #FBF8FF',
                      zIndex: 20,
                      pointerEvents: 'none'
                    }}
                  />
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.div>
  )
})

export default Card6
