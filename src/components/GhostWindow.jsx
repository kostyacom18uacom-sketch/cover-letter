import React from 'react'
import { motion } from 'framer-motion'

/**
 * GhostWindow — декоративне напівпрозоре Win2K вікно для фону.
 * Не інтерактивне. Рендериться як fixed елемент.
 *
 * Два шари:
 *   - Outer motion.div: дрейф (x/y keyframes) + opacity fade
 *   - Inner div: mouse parallax через CSS transform (без re-animation)
 */
export default function GhostWindow({
  title,
  width,
  height,
  driftKeyframes,
  driftDuration,
  fadeDuration,
  mouseOffsetX = 0,
  mouseOffsetY = 0,
  parallaxFactor = 0.05,
}) {
  // mouseOffsetX/Y ∈ [-1, 1] → displacement: mouseOffset * parallaxFactor * 100
  // parallaxFactor 0.04 → ±4px max, 0.06 → ±6px max
  const px = mouseOffsetX * parallaxFactor * 100
  const py = mouseOffsetY * parallaxFactor * 100

  return (
    <motion.div
      initial={{
        x: driftKeyframes.x[0],
        y: driftKeyframes.y[0],
        opacity: 0,
      }}
      animate={{
        x: driftKeyframes.x,
        y: driftKeyframes.y,
        opacity: [0.0, 0.55, 0.55, 0.35, 0.55, 0.55, 0.0],
      }}
      transition={{
        x: {
          duration: driftDuration,
          repeat: Infinity,
          repeatType: 'mirror',
          ease: 'easeInOut',
        },
        y: {
          duration: driftDuration * 1.15,
          repeat: Infinity,
          repeatType: 'mirror',
          ease: 'easeInOut',
        },
        opacity: {
          duration: fadeDuration,
          repeat: Infinity,
          repeatType: 'loop',
          ease: 'easeInOut',
          times: [0, 0.15, 0.45, 0.55, 0.7, 0.85, 1],
        },
      }}
      style={{
        position: 'fixed',
        pointerEvents: 'none',
        zIndex: 1,
        top: 0,
        left: 0,
      }}
    >
      {/* Mouse parallax — CSS transform, no re-animation */}
      <div
        style={{
          width: `${width}px`,
          height: `${height}px`,
          transform: `translate(${px}px, ${py}px)`,
          transition: 'transform 0.12s ease-out',
        }}
      >
        {/* Рамка вікна */}
        <div
          style={{
            width: '100%',
            height: '100%',
            border: '1.5px solid rgba(170, 179, 255, 0.35)',
            background: 'rgba(236, 223, 255, 0.12)',
            borderRadius: 0,
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* Titlebar */}
          <div
            style={{
              background: 'rgba(217, 217, 217, 0.30)',
              height: '22px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0 6px',
              flexShrink: 0,
            }}
          >
            <span
              style={{
                fontFamily: 'Handjet, sans-serif',
                fontWeight: 600,
                fontSize: '13px',
                color: 'rgba(42, 45, 101, 0.45)',
                letterSpacing: '0.3px',
                whiteSpace: 'nowrap',
              }}
            >
              {title}
            </span>

            {/* Декоративні кнопки */}
            <div style={{ display: 'flex', gap: '2px' }}>
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  style={{
                    width: '12px',
                    height: '12px',
                    background: 'rgba(189, 196, 255, 0.35)',
                    boxShadow:
                      'inset -1px -1px 0 rgba(87, 97, 188, 0.30), inset 1px 1px 0 rgba(255,255,255,0.4)',
                    flexShrink: 0,
                  }}
                />
              ))}
            </div>
          </div>

          {/* Порожнє тіло вікна */}
          <div style={{ flex: 1 }} />
        </div>
      </div>
    </motion.div>
  )
}
