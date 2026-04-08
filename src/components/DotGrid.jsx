import React from 'react'

/**
 * DotGrid — Win2K dot pattern background.
 * Pure CSS radial-gradient approach — no SVG filters.
 * SVG feGaussianBlur distorts inside perspective/3D contexts on iOS/Android Safari.
 */
export const DotGrid = () => (
  <div
    style={{
      position: 'absolute',
      inset: 0,
      pointerEvents: 'none',
      zIndex: 0,
      backgroundImage: `radial-gradient(circle 2.5px, rgba(180, 148, 216, 0.35) 0%, rgba(180, 148, 216, 0.1) 70%, transparent 100%)`,
      backgroundSize: '14px 18px',
      backgroundPosition: '0 0',
    }}
  />
)
