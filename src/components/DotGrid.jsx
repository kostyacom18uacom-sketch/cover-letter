import React, { useId } from 'react'

/**
 * DotGrid — Win2K dot pattern background.
 * useId() генерує унікальні id для SVG filter/pattern,
 * щоб уникнути конфліктів коли кілька DotGrid одночасно в DOM.
 */
export const DotGrid = () => {
  const uid = useId().replace(/:/g, '-')
  const filterId = `dot-filter-${uid}`
  const patternId = `dot-pattern-${uid}`

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        pointerEvents: 'none',
        zIndex: 0,
        overflow: 'hidden',
      }}
    >
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id={filterId} colorInterpolationFilters="sRGB">
            <feFlood floodOpacity="0" result="BackgroundImageFix"/>
            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
            <feOffset dy="1"/>
            <feGaussianBlur stdDeviation="0.5"/>
            <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
            <feColorMatrix type="matrix" values="0 0 0 0 0.725 0 0 0 0 0.611 0 0 0 0 0.894 0 0 0 0.25 0"/>
            <feBlend mode="normal" in2="shape" result="effect1_innerShadow"/>
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
            <feOffset dy="-1"/>
            <feGaussianBlur stdDeviation="0.5"/>
            <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
            <feColorMatrix type="matrix" values="0 0 0 0 0.725 0 0 0 0 0.611 0 0 0 0 0.894 0 0 0 0.25 0"/>
            <feBlend mode="normal" in2="effect1_innerShadow" result="effect2_innerShadow"/>
          </filter>
          <pattern id={patternId} x="0" y="0" width="14" height="18" patternUnits="userSpaceOnUse">
            <path
              d="M6 3C6 4.65685 4.65685 6 3 6C1.34315 6 0 4.65685 0 3C0 1.34315 1.34315 0 3 0C4.65685 0 6 1.34315 6 3Z"
              fill="#ECDFFF"
              filter={`url(#${filterId})`}
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${patternId})`} />
      </svg>
    </div>
  )
}
