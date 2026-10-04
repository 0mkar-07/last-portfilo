import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { identityData } from '../data/identity'
import { usePrefersReducedMotion } from '../utils/useReducedMotion'

export default function Identity() {
  const shouldReduceMotion = usePrefersReducedMotion()
  const [displayedName, setDisplayedName] = useState(() =>
    shouldReduceMotion ? identityData.name : ''
  )

  useEffect(() => {
    if (shouldReduceMotion) return

    let currentIndex = 0
    const fullName = identityData.name
    const interval = setInterval(() => {
      currentIndex++
      setDisplayedName(fullName.slice(0, currentIndex))
      if (currentIndex >= fullName.length) {
        clearInterval(interval)
      }
    }, 45)

    return () => clearInterval(interval)
  }, [shouldReduceMotion])

  const scrollToSection = (id) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: shouldReduceMotion
        ? { duration: 0 }
        : {
            staggerChildren: 0.12,
            delayChildren: 0.05,
          },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: shouldReduceMotion ? 0 : 0.4, ease: 'easeOut' },
    },
  }

  return (
    <section
      id="identity"
      className="min-h-screen w-full flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8 relative bg-[#0a0a0a] border-b border-[#FFB000]/15 scroll-mt-16 sm:scroll-mt-24"
    >
      <div className="max-w-5xl w-full">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          {/* Header Tag & Classification */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center justify-between gap-2 border-b border-[#FFB000]/20 pb-3 text-xs font-mono text-[#a3a3a3]"
          >
            <div className="flex items-center space-x-2">
              <span className="text-[#FFB000]">MODULE://01</span>
              <span>CLASSIFIED_RECORD</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-[#FFB000] animate-pulse" />
              <span className="text-[#e5e5e5]">DECRYPTED_NODE</span>
            </div>
          </motion.div>

          {/* Main Grid: Name & Bio on left, Record-card HUD on right */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Content (7 cols on lg) */}
            <div className="lg:col-span-7 space-y-6">
              {/* Typewriter Name */}
              <motion.div variants={itemVariants} className="space-y-2">
                <span className="text-xs font-mono tracking-widest text-[#FFB000] uppercase block">
                  // SURVIVOR DESIGNATION
                </span>
                <h1 className="text-2xl sm:text-4xl md:text-5xl font-mono font-bold text-[#e5e5e5] tracking-tight leading-tight min-h-[1.2em] flex items-center flex-wrap break-words">
                  <span>{displayedName}</span>
                  <span className="text-[#FFB000] cursor-blink ml-1">_</span>
                </h1>
                <p className="font-mono text-base sm:text-lg text-[#FFB000] font-medium tracking-wide">
                  {identityData.role}
                </p>
                <p className="font-mono text-xs sm:text-sm text-[#a3a3a3] italic">
                  "{identityData.tagline}"
                </p>
              </motion.div>

              {/* Intro paragraph in Inter */}
              <motion.div variants={itemVariants}>
                <p className="font-sans text-sm sm:text-base text-[#e5e5e5] leading-relaxed max-w-xl">
                  {identityData.intro}
                </p>
              </motion.div>

              {/* Interests as glitch tags */}
              <motion.div variants={itemVariants} className="space-y-2">
                <span className="text-xs font-mono text-[#a3a3a3] uppercase block">
                  // CORE DIRECTIVES & DOMAINS:
                </span>
                <div className="flex flex-wrap gap-2">
                  {identityData.interests.map((interest, idx) => (
                    <span
                      key={idx}
                      className="glitch-hover px-2.5 py-1 text-xs font-mono rounded bg-[#111111] text-[#e5e5e5] border border-[#FFB000]/25 hover:border-[#FFB000] hover:text-[#FFB000] cursor-default transition-colors"
                    >
                      +{interest}
                    </span>
                  ))}
                </div>
              </motion.div>

              {/* Action Buttons */}
              <motion.div variants={itemVariants} className="pt-2 flex flex-wrap gap-4">
                <button
                  type="button"
                  onClick={() => scrollToSection('archives')}
                  className="min-h-[44px] px-6 py-2.5 font-mono text-xs sm:text-sm font-semibold tracking-wider text-[#0a0a0a] bg-[#FFB000] hover:bg-[#FFB000]/90 rounded border border-[#FFB000] shadow-[0_0_12px_rgba(255,176,0,0.3)] hover:shadow-[0_0_20px_rgba(255,176,0,0.5)] transition-all cursor-pointer flex items-center space-x-2"
                >
                  <span>{identityData.actions.archiveButtonText}</span>
                  <span>→</span>
                </button>
                <button
                  type="button"
                  onClick={() => scrollToSection('transmission')}
                  className="min-h-[44px] px-6 py-2.5 font-mono text-xs sm:text-sm font-semibold tracking-wider text-[#FFB000] hover:text-[#0a0a0a] bg-[#111111] hover:bg-[#FFB000] rounded border border-[#FFB000]/50 hover:border-[#FFB000] shadow-[inset_0_0_10px_rgba(255,176,0,0.1)] transition-all cursor-pointer flex items-center space-x-2"
                >
                  <span>{identityData.actions.channelButtonText}</span>
                  <span>⚡</span>
                </button>
              </motion.div>
            </div>

            {/* Right: Record Card Panel (HUD dossier with corner brackets) */}
            <motion.div
              variants={itemVariants}
              className="lg:col-span-5 w-full bg-[#111111]/90 border border-[#FFB000]/30 rounded p-5 relative overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.5)]"
            >
              {/* Corner brackets */}
              <div className="absolute top-1.5 left-1.5 w-3 h-3 border-t-2 border-l-2 border-[#FFB000]" />
              <div className="absolute top-1.5 right-1.5 w-3 h-3 border-t-2 border-r-2 border-[#FFB000]" />
              <div className="absolute bottom-1.5 left-1.5 w-3 h-3 border-b-2 border-l-2 border-[#FFB000]" />
              <div className="absolute bottom-1.5 right-1.5 w-3 h-3 border-b-2 border-r-2 border-[#FFB000]" />

              <div className="border-b border-[#FFB000]/20 pb-3 mb-4 flex items-center justify-between font-mono text-xs">
                <span className="text-[#FFB000] font-bold tracking-wider">
                  DOSSIER // DATA_CARD
                </span>
                <span className="text-[#a3a3a3] text-[10px]">SEC_ID_VERIFIED</span>
              </div>

              {/* Status fields table */}
              <div className="space-y-3 font-mono text-xs">
                <div className="flex items-center justify-between p-2 rounded bg-[#0a0a0a]/60 border border-[#FFB000]/15">
                  <span className="text-[#a3a3a3]">ID:</span>
                  <span className="text-[#FFB000] font-semibold">{identityData.status.id}</span>
                </div>

                <div className="flex items-center justify-between p-2 rounded bg-[#0a0a0a]/60 border border-[#FFB000]/15">
                  <span className="text-[#a3a3a3]">STATUS:</span>
                  <span className="flex items-center space-x-1.5 text-[#e5e5e5] font-semibold">
                    <span className="w-2 h-2 rounded-full bg-[#FFB000] animate-pulse" />
                    <span>{identityData.status.status}</span>
                  </span>
                </div>

                <div className="flex items-center justify-between p-2 rounded bg-[#0a0a0a]/60 border border-[#FFB000]/15">
                  <span className="text-[#a3a3a3]">CLEARANCE:</span>
                  <span className="text-[#e5e5e5] font-semibold">{identityData.status.clearance}</span>
                </div>

                <div className="flex items-center justify-between p-2 rounded bg-[#0a0a0a]/60 border border-[#FFB000]/15">
                  <span className="text-[#a3a3a3]">LOCATION:</span>
                  <span className="text-[#FFB000] font-semibold text-right">{identityData.status.location}</span>
                </div>
              </div>

              {/* Dossier footer badge */}
              <div className="mt-5 pt-3 border-t border-[#FFB000]/15 flex items-center justify-between font-mono text-[10px] text-[#a3a3a3]">
                <span>BIOMETRIC_AUTH: VALID</span>
                <span className="text-[#FFB000]/80">ENC_SHA256</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
