import React from 'react'
import { motion } from 'framer-motion'

/**
 * MeshGradient — 5 анімованих radial-gradient blob-ів у Win2K палітрі.
 *
 * Архітектура:
 *   - Кожен blob — окремий motion.div з незалежними drift keyframes у vw/vh
 *   - willChange: 'transform' для GPU-прискорення на iOS Safari
 *
 * Props:
 *   swipeDirection: 'left' | 'right' | null — напрямок останнього свайпу (резервне)
 */
export default function MeshGradient({ swipeDirection }) {
  const blobs = [
    {
      // Blob A — яскравий periwinkle/blue, верхній лівий
      color: 'rgba(145, 158, 255, 0.72)',
      size: 650,
      blur: 55,
      initial: { x: '-10vw', y: '-5vh' },
      animate: {
        x: ['-10vw', '5vw', '-5vw', '-10vw'],
        y: ['-5vh', '10vh', '20vh', '-5vh'],
      },
      duration: 55,
    },
    {
      // Blob B — насичений mint/teal, правий середній
      color: 'rgba(140, 235, 210, 0.65)',
      size: 560,
      blur: 50,
      initial: { x: '60vw', y: '30vh' },
      animate: {
        x: ['60vw', '75vw', '55vw', '60vw'],
        y: ['30vh', '50vh', '25vh', '30vh'],
      },
      duration: 45,
    },
    {
      // Blob C — насичений lavender, центр-низ
      color: 'rgba(210, 180, 255, 0.78)',
      size: 620,
      blur: 60,
      initial: { x: '20vw', y: '55vh' },
      animate: {
        x: ['20vw', '40vw', '15vw', '20vw'],
        y: ['55vh', '70vh', '60vh', '55vh'],
      },
      duration: 60,
    },
    {
      // Blob D — deep violet accent, правий верхній
      color: 'rgba(87, 97, 220, 0.45)',
      size: 500,
      blur: 45,
      initial: { x: '70vw', y: '-10vh' },
      animate: {
        x: ['70vw', '80vw', '65vw', '70vw'],
        y: ['-10vh', '5vh', '-15vh', '-10vh'],
      },
      duration: 50,
    },
    {
      // Blob E — warm rose, лівий низ
      color: 'rgba(255, 180, 210, 0.55)',
      size: 480,
      blur: 50,
      initial: { x: '-5vw', y: '65vh' },
      animate: {
        x: ['-5vw', '10vw', '0vw', '-5vw'],
        y: ['65vh', '80vh', '70vh', '65vh'],
      },
      duration: 48,
    },
  ]

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 0,
        overflow: 'hidden',
      }}
    >
      {blobs.map((blob, i) => (
        <motion.div
          key={i}
          style={{
            position: 'absolute',
            width: `${blob.size}px`,
            height: `${blob.size}px`,
            borderRadius: '50%',
            background: `radial-gradient(circle, ${blob.color} 0%, transparent 70%)`,
            filter: `blur(${blob.blur}px)`,
            willChange: 'transform',
          }}
          initial={blob.initial}
          animate={blob.animate}
          transition={{
            duration: blob.duration,
            repeat: Infinity,
            repeatType: 'loop',
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}
