import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { bootConfig } from '../data/boot'

const SESSION_STORAGE_KEY = 'survivor_net_boot_seen'

export default function BootSequence({ onComplete }) {
  // Check session storage & reduced motion safely
  const [shouldShow, setShouldShow] = useState(() => {
    try {
      if (typeof window === 'undefined') return false
      const alreadySeen = sessionStorage.getItem(SESSION_STORAGE_KEY) === 'true'
      if (alreadySeen) return false

      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (prefersReducedMotion) {
        sessionStorage.setItem(SESSION_STORAGE_KEY, 'true')
        return false
      }
      return true
    } catch {
      return false
    }
  })

  const [currentLineIndex, setCurrentLineIndex] = useState(0)
  const [progress, setProgress] = useState(15)

  // Complete and hide boot sequence
  const handleDismiss = useCallback(() => {
    try {
      sessionStorage.setItem(SESSION_STORAGE_KEY, 'true')
    } catch {
      // Safe fallback if sessionStorage is restricted
    }
    setShouldShow(false)
    if (onComplete) onComplete()
  }, [onComplete])

  // Lock body scroll while overlay is active
  useEffect(() => {
    if (shouldShow) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [shouldShow])

  // Listen for any key press or click to skip immediately
  useEffect(() => {
    if (!shouldShow) return

    const handleKeyDown = (e) => {
      e.preventDefault()
      handleDismiss()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [shouldShow, handleDismiss])

  // Hard safety timeout: guaranteed unblock after 4 seconds even if intervals stall
  useEffect(() => {
    if (!shouldShow) return
    const safetyTimer = setTimeout(() => {
      handleDismiss()
    }, 4000)
    return () => clearTimeout(safetyTimer)
  }, [shouldShow, handleDismiss])

  // Timed progression through boot lines
  useEffect(() => {
    if (!shouldShow) return

    const timeouts = [
      setTimeout(() => setCurrentLineIndex(1), 500),
      setTimeout(() => setCurrentLineIndex(2), 1000),
      setTimeout(() => setCurrentLineIndex(3), 1500),
      setTimeout(() => {
        setCurrentLineIndex(4)
        setProgress(45)
      }, 1900),
      setTimeout(() => setProgress(80), 2200),
      setTimeout(() => setProgress(100), 2500),
      setTimeout(() => setCurrentLineIndex(5), 2600),
      setTimeout(() => handleDismiss(), 3200),
    ]

    return () => {
      timeouts.forEach((t) => clearTimeout(t))
    }
  }, [shouldShow, handleDismiss])

  if (!shouldShow) return null

  // Render text-based progress bar: [####------]
  const renderProgressBar = (pct) => {
    const totalBlocks = 12
    const filled = Math.round((pct / 100) * totalBlocks)
    const empty = totalBlocks - filled
    return `[${'#'.repeat(filled)}${'-'.repeat(empty)}] ${pct}%`
  }

  return (
    <AnimatePresence>
      <motion.div
        key="boot-overlay"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
        onClick={handleDismiss}
        className="fixed inset-0 z-50 bg-[#0a0a0a] text-[#e5e5e5] flex flex-col justify-between p-6 sm:p-10 font-mono select-none cursor-pointer"
        role="dialog"
        aria-label="System Boot Sequence"
      >
        {/* Top Telemetry Header */}
        <div className="flex items-center justify-between border-b border-[#FFB000]/25 pb-4 text-xs text-[#8a8a8a]">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-[#FFB000] animate-ping" />
            <span className="text-[#FFB000] font-bold">{bootConfig.systemTitle}</span>
          </div>

          {/* Visible Skip Button (at least 44px tall) */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              handleDismiss()
            }}
            className="min-h-[44px] px-4 py-2 border border-[#FFB000]/40 text-[#FFB000] hover:text-[#0a0a0a] hover:bg-[#FFB000] rounded text-xs font-semibold tracking-wider transition-colors cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#FFB000]"
            aria-label="Skip Boot Sequence"
          >
            {bootConfig.skipPrompt}
          </button>
        </div>

        {/* Center Boot Terminal Log */}
        <div className="max-w-2xl w-full mx-auto my-auto space-y-3.5 text-xs sm:text-sm md:text-base">
          {bootConfig.bootLines.slice(0, currentLineIndex + 1).map((line, idx) => {
            const isLast = idx === currentLineIndex
            const isProgressLine = idx === 4

            return (
              <div
                key={idx}
                className={`flex items-center space-x-2 ${
                  idx === 3
                    ? 'text-[#FFB000] font-bold text-sm sm:text-lg'
                    : idx === 5
                    ? 'text-[#33cc33] font-bold text-sm sm:text-lg'
                    : 'text-[#e5e5e5]'
                }`}
              >
                <span>
                  {isProgressLine ? `${line} ${renderProgressBar(progress)}` : line}
                </span>
                {isLast && (
                  <span className="cursor-blink text-[#FFB000] font-bold ml-1">
                    █
                  </span>
                )}
              </div>
            )
          })}
        </div>

        {/* Bottom Helper Bar */}
        <div className="border-t border-[#FFB000]/20 pt-4 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#8a8a8a]">
          <span>INIT_SEQUENCE // BOOT_LOADER</span>
          <span className="text-[#FFB000]">PRESS ANY KEY TO BYPASS PROTOCOL</span>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
