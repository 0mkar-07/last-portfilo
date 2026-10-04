import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { survivorLogs, logHeader } from '../data/log'

function usePrefersReducedMotion() {
  const [matches, setMatches] = useState(false)
  useEffect(() => {
    if (typeof window === 'undefined') return
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setMatches(mediaQuery.matches)
    const listener = (e) => setMatches(e.matches)
    mediaQuery.addEventListener('change', listener)
    return () => mediaQuery.removeEventListener('change', listener)
  }, [])
  return matches
}

export default function SurvivorLog() {
  const shouldReduceMotion = usePrefersReducedMotion()
  // Track open entries (multiple can be open)
  const [expandedIds, setExpandedIds] = useState(new Set(['LOG_001']))

  const toggleEntry = (id) => {
    setExpandedIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  return (
    <section
      id="survivor-log"
      className="min-h-screen w-full flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8 relative bg-[#0a0a0a] border-b border-[#FFB000]/15"
    >
      <div className="max-w-5xl w-full">
        {/* Section Header */}
        <div className="mb-8 border-b border-[#FFB000]/25 pb-4">
          <div className="flex items-center space-x-2 font-mono text-xs text-[#8a8a8a] mb-2">
            <span className="text-[#FFB000]">MODULE://{logHeader.moduleIndex}</span>
            <span>[{logHeader.tag}]</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-mono font-bold text-[#FFB000] tracking-tight glitch-hover">
            {logHeader.title}
          </h2>

          <p className="mt-2 text-sm sm:text-base text-[#8a8a8a] font-sans max-w-2xl">
            {logHeader.subtitle}
          </p>
        </div>

        {/* Terminal Prompt Strip */}
        <div className="mb-8 bg-[#111111] border border-[#FFB000]/25 rounded px-4 py-2.5 flex items-center justify-between font-mono text-xs text-[#e5e5e5] shadow-[0_2px_12px_rgba(0,0,0,0.4)]">
          <div className="flex items-center space-x-2">
            <span className="text-[#FFB000]">{logHeader.commandPrompt}</span>
            <span className="cursor-blink text-[#FFB000] font-bold">█</span>
          </div>
          <span className="text-[#8a8a8a] text-[10px] hidden sm:inline">
            TOTAL_ENTRIES: {survivorLogs.length} // READ_ONLY
          </span>
        </div>

        {/* Vertical Timeline */}
        <div className="relative pl-6 sm:pl-8 border-l-2 border-[#FFB000]/30 ml-2 sm:ml-4 space-y-6 sm:space-y-8">
          {survivorLogs.map((log, index) => {
            const isExpanded = expandedIds.has(log.id)

            return (
              <motion.div
                key={log.id}
                initial={
                  shouldReduceMotion
                    ? { opacity: 1, x: 0 }
                    : { opacity: 0, x: -16 }
                }
                whileInView={
                  shouldReduceMotion
                    ? { opacity: 1, x: 0 }
                    : { opacity: 1, x: 0 }
                }
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: shouldReduceMotion ? 0 : 0.4,
                  delay: shouldReduceMotion ? 0 : index * 0.08,
                }}
                className="relative group"
              >
                {/* Timeline Node / Pip */}
                <div
                  className="absolute -left-[31px] sm:-left-[39px] top-4 w-3.5 h-3.5 rounded-full bg-[#0a0a0a] border-2 border-[#FFB000] shadow-[0_0_8px_rgba(255,176,0,0.5)] flex items-center justify-center transition-transform group-hover:scale-125"
                  aria-hidden="true"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-[#FFB000]" />
                </div>

                {/* Log Entry Panel (Button element for keyboard accessibility) */}
                <article
                  className="bg-[#111111]/90 border border-[#FFB000]/25 rounded-lg p-4 sm:p-5 relative overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.5)] transition-colors hover:border-[#FFB000]/60"
                >
                  {/* Subtle Corner Brackets */}
                  <div className="absolute top-1.5 left-1.5 w-2.5 h-2.5 border-t border-l border-[#FFB000]/60" />
                  <div className="absolute top-1.5 right-1.5 w-2.5 h-2.5 border-t border-r border-[#FFB000]/60" />

                  {/* Header / Meta Bar */}
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#FFB000]/15 pb-2.5 mb-3 font-mono text-xs">
                    <div className="flex items-center space-x-2">
                      <span className="text-[#FFB000] font-bold">{log.id}</span>
                      <span className="text-[#8a8a8a]">::{log.timestamp}</span>
                    </div>

                    <span className="px-2 py-0.5 text-[10px] font-semibold rounded bg-[#0a0a0a] text-[#FFB000] border border-[#FFB000]/30 tracking-wider">
                      [{log.category}]
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-mono text-base sm:text-lg font-bold text-[#e5e5e5] mb-2 tracking-tight">
                    {log.title}
                  </h3>

                  {/* Summary */}
                  <p className="font-sans text-xs sm:text-sm text-[#e5e5e5]/85 leading-relaxed mb-3">
                    {log.summary}
                  </p>

                  {/* Expand / Collapse Control */}
                  <button
                    type="button"
                    onClick={() => toggleEntry(log.id)}
                    aria-expanded={isExpanded}
                    className="min-h-[44px] w-full py-2 px-3 mt-1 font-mono text-xs text-[#FFB000] hover:text-[#0a0a0a] bg-[#0a0a0a] hover:bg-[#FFB000] rounded border border-[#FFB000]/30 hover:border-[#FFB000] transition-all cursor-pointer flex items-center justify-between focus:outline-none focus:ring-1 focus:ring-[#FFB000]"
                  >
                    <span>
                      {isExpanded ? '[-] CLOSE DECRYPTED ENTRY' : '[+] DECRYPT LOG DETAILS'}
                    </span>
                    <span className="text-xs">
                      {isExpanded ? '▲' : '▼'}
                    </span>
                  </button>

                  {/* Expandable Details Container */}
                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        key="details"
                        initial={
                          shouldReduceMotion
                            ? { opacity: 0 }
                            : { opacity: 0, height: 0 }
                        }
                        animate={
                          shouldReduceMotion
                            ? { opacity: 1 }
                            : { opacity: 1, height: 'auto' }
                        }
                        exit={
                          shouldReduceMotion
                            ? { opacity: 0 }
                            : { opacity: 0, height: 0 }
                        }
                        transition={{
                          duration: shouldReduceMotion ? 0 : 0.3,
                          ease: 'easeInOut',
                        }}
                        className="overflow-hidden"
                      >
                        <div className="pt-4 border-t border-[#FFB000]/20 mt-3 font-mono text-xs">
                          <span className="text-[10px] text-[#8a8a8a] tracking-wider uppercase block mb-1">
                            // DECRYPTED PAYLOAD:
                          </span>
                          <p className="font-sans text-xs sm:text-sm text-[#e5e5e5]/90 leading-relaxed bg-[#0a0a0a]/80 p-3 rounded border border-[#FFB000]/15">
                            {log.details}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </article>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
