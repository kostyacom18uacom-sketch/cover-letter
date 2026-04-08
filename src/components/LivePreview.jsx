import React from 'react'
import CardStack from './CardStack.jsx'
import { DEFAULT_CARDS } from '../constants/defaults'

/**
 * Right panel on /create.
 * Renders a scaled-down CardStack with current form data.
 * Updates live on every keystroke via props.
 */
export default function LivePreview({ company, cards }) {
  const previewCompany = company || 'Your Company'
  const previewCards =
    cards && cards.length > 0 ? cards : DEFAULT_CARDS

  return (
    <div className="relative w-full flex items-center justify-center">
      {/* Scale wrapper */}
      <div
        className="relative"
        style={{
          width: 480,
          height: 600,
          transform: 'scale(0.65)',
          transformOrigin: 'top center',
        }}
      >
        {/* Phone frame */}
        <div className="absolute inset-0 bg-[#F5F5F7] rounded-3xl border border-gray-200 shadow-xl overflow-hidden flex flex-col">
          {/* Status bar mockup */}
          <div className="flex justify-between items-center px-6 pt-4 pb-2 shrink-0">
            <span className="text-xs font-semibold text-gray-400">9:41</span>
            <div className="flex gap-1.5 items-center">
              <span className="text-xs text-gray-400">●●●</span>
            </div>
          </div>

          {/* Card stack fills remaining space */}
          <div className="flex-1 overflow-hidden">
            <CardStack company={previewCompany} cards={previewCards} />
          </div>
        </div>
      </div>
    </div>
  )
}
