import React, { useState, useCallback } from 'react'
import { encodeData } from '../utils/encoding'
import { slugify } from '../utils/slugify'
import { DEFAULT_CARDS } from '../constants/defaults'

const HEADLINE_MAX = 40
const BODY_MAX = 120

/**
 * Left panel of /create.
 * Company name input + 4 card editors (Cards 2-5).
 * Generates and copies a shareable URL on button click.
 */
export default function CreateForm({ onChange }) {
  const [company, setCompany] = useState('')
  const [cards, setCards] = useState(
    DEFAULT_CARDS.map((c) => ({ headline: c.headline, body: c.body }))
  )
  const [copyState, setCopyState] = useState('idle') // 'idle' | 'copied'

  const notify = useCallback(
    (newCompany, newCards) => {
      onChange && onChange({ company: newCompany, cards: newCards })
    },
    [onChange]
  )

  const handleCompanyChange = (e) => {
    const val = e.target.value
    setCompany(val)
    notify(val, cards)
  }

  const handleCardChange = (index, field, value) => {
    const updated = cards.map((card, i) =>
      i === index ? { ...card, [field]: value } : card
    )
    setCards(updated)
    notify(company, updated)
  }

  const handleGenerate = async () => {
    if (!company.trim()) return

    const slug = slugify(company) || 'company'
    const encoded = encodeData({ company: company.trim(), cards })
    // Явно беремо лише origin (protocol + host) без будь-якого pathname
    const origin = `${window.location.protocol}//${window.location.host}`
    const url = `${origin}/${slug}?d=${encoded}`

    try {
      await navigator.clipboard.writeText(url)
      setCopyState('copied')
      setTimeout(() => setCopyState('idle'), 2000)
    } catch {
      // Fallback: select from a temporary input
      const tmp = document.createElement('input')
      tmp.value = url
      document.body.appendChild(tmp)
      tmp.select()
      document.execCommand('copy')
      document.body.removeChild(tmp)
      setCopyState('copied')
      setTimeout(() => setCopyState('idle'), 2000)
    }
  }

  const slug = slugify(company)
  const previewUrl = company.trim()
    ? `yoursite.vercel.app/${slug}`
    : 'yoursite.vercel.app/company-name'

  const isGenerateDisabled = !company.trim()

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* Company Name */}
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-semibold text-gray-700">
          Company Name
        </label>
        <input
          type="text"
          value={company}
          onChange={handleCompanyChange}
          placeholder="e.g. Skelar"
          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition"
        />
        <p className="text-xs text-gray-400 mt-0.5">
          <span className="font-medium text-gray-500">{previewUrl}</span>
        </p>
      </div>

      {/* Card editors — Cards 2-5 */}
      {cards.map((card, index) => {
        const cardNumber = index + 2 // Cards 2 through 5
        return (
          <div
            key={index}
            className="flex flex-col gap-3 p-4 rounded-xl border border-gray-100 bg-gray-50"
          >
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Card {cardNumber}
            </p>

            {/* Headline */}
            <div className="flex flex-col gap-1">
              <div className="flex justify-between items-center">
                <label className="text-xs font-medium text-gray-600">
                  Headline
                </label>
                <span
                  className={`text-xs ${
                    card.headline.length >= HEADLINE_MAX
                      ? 'text-red-400'
                      : 'text-gray-400'
                  }`}
                >
                  {card.headline.length}/{HEADLINE_MAX}
                </span>
              </div>
              <input
                type="text"
                value={card.headline}
                onChange={(e) =>
                  handleCardChange(index, 'headline', e.target.value)
                }
                maxLength={HEADLINE_MAX}
                placeholder="Short, punchy headline"
                className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-white text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition"
              />
            </div>

            {/* Body */}
            <div className="flex flex-col gap-1">
              <div className="flex justify-between items-center">
                <label className="text-xs font-medium text-gray-600">
                  Body
                </label>
                <span
                  className={`text-xs ${
                    card.body.length >= BODY_MAX
                      ? 'text-red-400'
                      : 'text-gray-400'
                  }`}
                >
                  {card.body.length}/{BODY_MAX}
                </span>
              </div>
              <textarea
                value={card.body}
                onChange={(e) =>
                  handleCardChange(index, 'body', e.target.value)
                }
                maxLength={BODY_MAX}
                placeholder="Supporting detail or context"
                rows={2}
                className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-white text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition resize-none"
              />
            </div>
          </div>
        )
      })}

      {/* Generate Button */}
      <button
        onClick={handleGenerate}
        disabled={isGenerateDisabled}
        className={`w-full py-3 rounded-xl font-semibold text-sm transition-all duration-150 ${
          isGenerateDisabled
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
            : copyState === 'copied'
            ? 'bg-green-500 text-white shadow-sm'
            : 'bg-accent hover:bg-accent-hover text-white shadow-sm active:scale-[0.98]'
        }`}
      >
        {copyState === 'copied' ? 'Link copied!' : 'Generate link'}
      </button>
    </div>
  )
}
