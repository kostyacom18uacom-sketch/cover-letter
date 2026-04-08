import React from 'react'
import { motion } from 'framer-motion'

/**
 * Navigation arrows — visible on both mobile and desktop.
 * Previous disabled on first card, next hidden on last card.
 */
export default function NavigationArrows({ onPrev, onNext, isFirst, isLast, indicator }) {
  return (
    <div className="flex items-center justify-between w-full px-2">
      {/* Previous button */}
      <motion.button
        onClick={onPrev}
        disabled={isFirst}
        aria-label="Previous card"
        className="flex items-center justify-center w-10 h-10 transition-opacity win2k-shimmer"
        whileHover={{ boxShadow: '0px 0px 8px rgba(213, 194, 242, 0.5)' }}
        whileTap={{ y: 2, x: 1 }}
        transition={{ type: 'spring', stiffness: 500, damping: 15 }}
        style={{
          border: '2px solid transparent',
          borderRadius: 0,
          opacity: isFirst ? 0.3 : 1,
          pointerEvents: isFirst ? 'none' : 'auto',
          cursor: isFirst ? 'default' : 'pointer',
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="16" viewBox="0 0 10 16" fill="none">
          <path d="M10 8.27225e-07C10 8.27225e-07 10 0.151652 10 0.454955V3.02703H6.81818C6.81818 3.02703 6.81818 2.87387 6.81818 2.56757V8.27225e-07C6.81818 8.27225e-07 6.97917 8.27225e-07 7.30114 8.27225e-07H10ZM7.72727 2.16216C7.72727 2.16216 7.72727 2.31382 7.72727 2.61712L7.72727 5.18919H4.54545C4.54545 5.18919 4.54545 5.03604 4.54545 4.72973V2.16216C4.54545 2.16216 4.70644 2.16216 5.02841 2.16216H7.72727ZM5.45455 4.32432C5.45455 4.32432 5.45455 4.47598 5.45455 4.77928V7.35135H2.27273C2.27273 7.35135 2.27273 7.1982 2.27273 6.89189V4.32432C2.27273 4.32432 2.43371 4.32432 2.75568 4.32432H5.45455ZM3.18182 6.48649C3.18182 6.48649 3.18182 6.63814 3.18182 6.94144L3.18182 9.51351H3.42169e-07C3.42169e-07 9.51351 3.42169e-07 9.36036 3.42169e-07 9.05405V6.48649C3.42169e-07 6.48649 0.160985 6.48649 0.482954 6.48649H3.18182ZM5.45455 8.64865C5.45455 8.64865 5.45455 8.8003 5.45455 9.1036V11.6757H2.27273C2.27273 11.6757 2.27273 11.5225 2.27273 11.2162V8.64865C2.27273 8.64865 2.43371 8.64865 2.75568 8.64865H5.45455ZM7.72727 10.8108C7.72727 10.8108 7.72727 10.9625 7.72727 11.2658V13.8378H4.54545C4.54545 13.8378 4.54545 13.6847 4.54545 13.3784V10.8108C4.54545 10.8108 4.70644 10.8108 5.02841 10.8108H7.72727ZM10 12.973C10 12.973 10 13.1246 10 13.4279V16H6.81818C6.81818 16 6.81818 15.8468 6.81818 15.5405V12.973C6.81818 12.973 6.97917 12.973 7.30114 12.973H10Z" fill="url(#paint0_linear_125_494)"/>
          <defs>
            <linearGradient id="paint0_linear_125_494" x1="8.33333" y1="15.6607" x2="-3.40006" y2="3.34193" gradientUnits="userSpaceOnUse">
              <stop offset="0.2" stop-color="#674A91"/>
              <stop offset="0.92" stop-color="#2A2D65"/>
            </linearGradient>
          </defs>
        </svg>
      </motion.button>

      {/* Center Indicator */}
      {indicator && (
        <div className="flex-1 flex justify-center">
          {indicator}
        </div>
      )}

      {/* Next button — hidden on last card */}
      {!isLast && (
        <motion.button
          onClick={onNext}
          aria-label="Next card"
          className="flex items-center justify-center w-10 h-10 win2k-shimmer"
          whileHover={{ boxShadow: '0px 0px 8px rgba(213, 194, 242, 0.5)' }}
          whileTap={{ y: 2, x: 1 }}
          transition={{ type: 'spring', stiffness: 500, damping: 15 }}
          style={{
            border: '2px solid transparent',
            borderRadius: 0,
            cursor: 'pointer',
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="10" height="16" viewBox="0 0 10 16" fill="none">
            <path d="M0 16C0 16 0 15.8483 0 15.545V12.973H3.18182C3.18182 12.973 3.18182 13.1261 3.18182 13.4324V16C3.18182 16 3.02083 16 2.69886 16H0ZM2.27273 13.8378C2.27273 13.8378 2.27273 13.6862 2.27273 13.3829V10.8108H5.45455C5.45455 10.8108 5.45455 10.964 5.45455 11.2703V13.8378C5.45455 13.8378 5.29356 13.8378 4.97159 13.8378H2.27273ZM4.54545 11.6757C4.54545 11.6757 4.54545 11.524 4.54545 11.2207V8.64865H7.72727C7.72727 8.64865 7.72727 8.8018 7.72727 9.10811V11.6757C7.72727 11.6757 7.56629 11.6757 7.24432 11.6757H4.54545ZM6.81818 9.51351C6.81818 9.51351 6.81818 9.36186 6.81818 9.05856V6.48649H10C10 6.48649 10 6.63964 10 6.94595V9.51351C10 9.51351 9.83901 9.51351 9.51705 9.51351H6.81818ZM4.54545 7.35135C4.54545 7.35135 4.54545 7.1997 4.54545 6.8964V4.32432H7.72727C7.72727 4.32432 7.72727 4.47748 7.72727 4.78378V7.35135C7.72727 7.35135 7.56629 7.35135 7.24432 7.35135H4.54545ZM2.27273 5.18919C2.27273 5.18919 2.27273 5.03754 2.27273 4.73423V2.16216H5.45455C5.45455 2.16216 5.45455 2.31531 5.45455 2.62162V5.18919C5.45455 5.18919 5.29356 5.18919 4.97159 5.18919H2.27273ZM0 3.02703C0 3.02703 0 2.87538 0 2.57207V0H3.18182C3.18182 0 3.18182 0.153153 3.18182 0.45946V3.02703C3.18182 3.02703 3.02083 3.02703 2.69886 3.02703H0Z" fill="url(#paint0_linear_125_493)"/>
            <defs>
              <linearGradient id="paint0_linear_125_493" x1="1.66667" y1="0.339338" x2="13.4001" y2="12.6581" gradientUnits="userSpaceOnUse">
                <stop offset="0.2" stop-color="#674A91"/>
                <stop offset="0.92" stop-color="#2A2D65"/>
              </linearGradient>
            </defs>
          </svg>
        </motion.button>
      )}

      {/* Spacer when last card to keep layout balanced */}
      {isLast && <div className="w-12 h-12" />}
    </div>
  )
}
