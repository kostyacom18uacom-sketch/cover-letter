import React from 'react'

/**
 * Shows current card position in "1 / 6" format.
 * Always visible, centered.
 */
export default function CardIndicator({ current, total }) {
  return (
    <div className="flex items-center justify-center">
      <span
        className="select-none"
        style={{
          fontFamily: 'Mont, sans-serif',
          fontWeight: 400,
          fontSize: '13px',
          color: '#494B80',
          background: '#e0e3ff',
          padding: '2px 10px',
          boxShadow: 'inset 1px 1px 0 #d5c2f2, inset -1px -1px 0 #f5eeff',
          letterSpacing: '0.5px',
        }}
      >
        {current} / {total}
      </span>
    </div>
  )
}
