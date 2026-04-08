import React, { useState } from 'react'
import { motion } from 'framer-motion'
import CreateForm from '../components/CreateForm.jsx'
import LivePreview from '../components/LivePreview.jsx'
import { DEFAULT_CARDS } from '../constants/defaults'

/**
 * /create page — two-column layout on desktop, single column on mobile.
 * Left: CreateForm, Right: LivePreview (updates live)
 */
export default function CreatePage() {
  const [formData, setFormData] = useState({
    company: '',
    cards: DEFAULT_CARDS.map((c) => ({ headline: c.headline, body: c.body })),
  })

  const handleFormChange = ({ company, cards }) => {
    setFormData({ company, cards })
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className="min-h-screen w-full bg-[#B5F2E6]"
    >
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">
            Match Card Set
          </h1>
          <p className="text-sm text-gray-500">
            Personalise your cards, generate a link, share it.
          </p>
        </div>

        {/* Two-column layout */}
        <div className="flex flex-col md:flex-row gap-8 items-start">
          {/* Left: Form */}
          <div className="w-full md:w-[420px] shrink-0">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <CreateForm onChange={handleFormChange} />
            </div>
          </div>

          {/* Right: Live Preview */}
          <div className="w-full md:flex-1 flex justify-center">
            <div className="w-full">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4 text-center">
                Live Preview
              </p>
              {/* Constrain height so preview doesn't overflow */}
              <div
                style={{ height: Math.round(600 * 0.65 + 32) }}
                className="overflow-hidden"
              >
                <LivePreview
                  company={formData.company}
                  cards={formData.cards}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
