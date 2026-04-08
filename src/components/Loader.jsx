import React, { useEffect, useState, useRef, forwardRef } from 'react'
import { motion } from 'framer-motion'
import { MinimizeIcon, MaximizeIcon, CloseIcon } from './win2k-icons/Icons.jsx'
import { DotGrid } from './DotGrid.jsx'

/**
 * Loader shown on viewer page entry for 1.5-2s.
 * Displays animated dots and a progress bar, then calls onComplete.
 * forwardRef is required for AnimatePresence mode="popLayout" compatibility.
 */
const Loader = forwardRef(function Loader({ onComplete }, ref) {
  const [dotCount, setDotCount] = useState(1)
  const [progress, setProgress] = useState(0)
  const completedRef = useRef(false)

  // Cycle dots: "." ".." "..."
  useEffect(() => {
    const interval = setInterval(() => {
      setDotCount((prev) => (prev % 3) + 1)
    }, 400)
    return () => clearInterval(interval)
  }, [])

  // Animate progress from 0 to 100 over 2.8s
  useEffect(() => {
    const duration = 2800
    const startTime = performance.now()

    const animate = (now) => {
      const elapsed = now - startTime
      const pct = Math.min((elapsed / duration) * 100, 100)
      setProgress(pct)

      if (pct < 100) {
        requestAnimationFrame(animate)
      } else if (!completedRef.current) {
        completedRef.current = true
        setTimeout(() => {
          onComplete && onComplete()
        }, 800)
      }
    }

    const raf = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(raf)
  }, [onComplete])

  const dots = '.'.repeat(dotCount)
  
  // Progress bar blocks logic
  const totalBlocks = 22
  const activeBlocks = Math.floor((progress / 100) * totalBlocks)

  return (
    <motion.div
      ref={ref}
      key="loader"
      initial={{ opacity: 1, scale: 1, y: 0, originY: 1 }}
      exit={{ opacity: 0, scale: 0.05, y: '50vh' }}
      transition={{ duration: 0.5, ease: 'backIn' }}
      className="w-full"
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
          Loading...
        </span>
        <div style={{ display: 'flex', gap: '4px', opacity: 0.8 }}>
          <MinimizeIcon style={{ cursor: 'default', flexShrink: 0 }} />
          <MaximizeIcon style={{ cursor: 'default', flexShrink: 0 }} />
          <CloseIcon style={{ cursor: 'default', flexShrink: 0 }} />
        </div>
      </div>

      {/* Loader Content */}
      <div style={{ position: 'relative', flexGrow: 1 }}>
        <DotGrid />
        <div
          style={{
            position: 'relative',
            zIndex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '50px 40px',
            minHeight: '260px',
          }}
        >
          {/* Main Groupbox Container */}
          <div
            style={{
              width: '100%',
              maxWidth: '380px',
              border: '2px solid #494B8050',
              padding: '36px 16px 32px 16px',
              position: 'relative',
              background: 'rgba(236, 223, 255, 0.4)',
            }}
          >
            {/* Label cut into border */}
            <span
              style={{
                position: 'absolute',
                top: '-12px',
                left: '12px',
                background: '#F1E9FF',
                padding: '0 8px',
                fontFamily: 'Handjet, sans-serif',
                fontWeight: 500,
                fontSize: '18px',
                color: '#494B80',
                letterSpacing: '1px',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              checking the information
              <span style={{ display: 'inline-block', width: '20px', marginLeft: '2px' }}>{dots}</span>
            </span>

            {/* Inset Progress Track */}
            <div
              style={{
                width: '100%',
                height: '28px',
                background: '#EAEAEA',
                padding: '3px',
                boxShadow: 'inset 2px 2px 4px rgba(0,0,0,0.15)',
                display: 'flex',
                gap: '2px',
              }}
            >
              {Array.from({ length: totalBlocks }).map((_, i) => (
                <div
                  key={i}
                  style={{
                    flex: 1,
                    height: '100%',
                    background: i < activeBlocks 
                      ? 'linear-gradient(180deg, #674A91 0%, #2A2D65 100%)' 
                      : 'transparent',
                    transition: 'background 0.1s ease',
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
})

export default Loader
