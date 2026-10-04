import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { projects, archivesHeader } from '../data/projects'
import { usePrefersReducedMotion } from '../utils/useReducedMotion'

export default function Archives() {
  const shouldReduceMotion = usePrefersReducedMotion()
  const [expandedId, setExpandedId] = useState(null)

  const toggleExpand = (id) => {
    setExpandedId((prev) => (prev === id ? null : id))
  }

  return (
    <section
      id="archives"
      className="min-h-screen w-full flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8 relative bg-[#0a0a0a] border-b border-[#FFB000]/15 scroll-mt-16 sm:scroll-mt-24"
    >
      <div className="max-w-6xl w-full">
        {/* Section Header */}
        <div className="mb-10 border-b border-[#FFB000]/25 pb-4">
          <div className="flex items-center space-x-2 font-mono text-xs text-[#a3a3a3] mb-2">
            <span className="text-[#FFB000]">MODULE://{archivesHeader.moduleIndex}</span>
            <span>[{archivesHeader.tag}]</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-mono font-bold text-[#FFB000] tracking-tight glitch-hover">
            {archivesHeader.title}
          </h2>

          <p className="mt-2 text-sm sm:text-base text-[#a3a3a3] font-sans max-w-2xl">
            {archivesHeader.subtitle}
          </p>
        </div>

        {/* 2-Column Grid on Desktop, 1 Column on Mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {projects.map((project) => {
            const isExpanded = expandedId === project.id

            return (
              <article
                key={project.id}
                className="bg-[#111111]/90 border border-[#FFB000]/30 rounded-lg p-5 sm:p-6 relative overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.6)] flex flex-col justify-between transition-colors hover:border-[#FFB000]/60"
              >
                {/* Decorative Corner Brackets on Card */}
                <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-[#FFB000]/70" />
                <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-[#FFB000]/70" />
                <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-[#FFB000]/70" />
                <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-[#FFB000]/70" />

                <div>
                  {/* Top Card Telemetry Header */}
                  <div className="flex items-center justify-between font-mono text-xs border-b border-[#FFB000]/15 pb-3 mb-4">
                    <span className="text-[#a3a3a3]">{project.recordNumber}</span>
                    <span className="flex items-center space-x-1.5 px-2 py-0.5 rounded bg-[#0a0a0a] border border-[#FFB000]/25 text-[#FFB000] text-[11px] font-semibold">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FFB000] animate-pulse" />
                      <span>{project.status}</span>
                    </span>
                  </div>

                  {/* Project Name */}
                  <h3 className="text-xl sm:text-2xl font-mono font-bold text-[#e5e5e5] mb-2 tracking-tight break-words">
                    {project.name}
                  </h3>

                  {/* Project Summary */}
                  <p className="font-sans text-sm text-[#e5e5e5] leading-relaxed mb-5 break-words">
                    {project.summary}
                  </p>

                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map((item, idx) => (
                      <span
                        key={idx}
                        className="glitch-hover px-2.5 py-1 text-xs font-mono rounded bg-[#0a0a0a] text-[#e5e5e5] border border-[#FFB000]/25 hover:border-[#FFB000] hover:text-[#FFB000] cursor-default transition-colors"
                      >
                        #{item}
                      </span>
                    ))}
                  </div>

                  {/* CRT-style Screenshot Container */}
                  <div className="relative rounded overflow-hidden border border-[#FFB000]/30 bg-[#0a0a0a] mb-5 group">
                    {/* Inner corner brackets */}
                    <div className="absolute top-1.5 left-1.5 w-2.5 h-2.5 border-t-2 border-l-2 border-[#FFB000] z-20 pointer-events-none" />
                    <div className="absolute top-1.5 right-1.5 w-2.5 h-2.5 border-t-2 border-r-2 border-[#FFB000] z-20 pointer-events-none" />
                    <div className="absolute bottom-1.5 left-1.5 w-2.5 h-2.5 border-b-2 border-l-2 border-[#FFB000] z-20 pointer-events-none" />
                    <div className="absolute bottom-1.5 right-1.5 w-2.5 h-2.5 border-b-2 border-r-2 border-[#FFB000] z-20 pointer-events-none" />

                    {/* Scanline tint overlay over image */}
                    <div
                      className="absolute inset-0 bg-gradient-to-b from-transparent via-[#FFB000]/5 to-black/40 pointer-events-none z-10"
                      aria-hidden="true"
                    />

                    <img
                      src={project.image}
                      alt={`Terminal screen capture of ${project.name}`}
                      loading="lazy"
                      className="w-full h-auto aspect-[16/10] object-cover object-top transition-transform duration-300 group-hover:scale-[1.02]"
                    />
                  </div>
                </div>

                {/* Expansion Trigger Button (keyboard accessible) */}
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => toggleExpand(project.id)}
                    aria-expanded={isExpanded}
                    className="w-full min-h-[44px] py-2.5 px-4 font-mono text-xs sm:text-sm font-semibold tracking-wider text-[#FFB000] hover:text-[#0a0a0a] bg-[#0a0a0a] hover:bg-[#FFB000] rounded border border-[#FFB000]/40 hover:border-[#FFB000] transition-all cursor-pointer flex items-center justify-between focus:outline-none focus:ring-1 focus:ring-[#FFB000]"
                  >
                    <span>
                      {isExpanded ? '[-] COLLAPSE RECORD' : '[+] DECRYPT ARCHIVE DETAILS'}
                    </span>
                    <span className="text-xs">
                      {isExpanded ? '▲' : '▼'}
                    </span>
                  </button>

                  {/* Expandable Details Container */}
                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        key="content"
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
                          duration: shouldReduceMotion ? 0 : 0.35,
                          ease: [0.04, 0.62, 0.23, 0.98],
                        }}
                        className="overflow-hidden"
                      >
                        <div className="pt-5 border-t border-[#FFB000]/20 mt-4 space-y-4">
                          <div>
                            <span className="text-[11px] font-mono text-[#a3a3a3] uppercase tracking-wider block mb-1">
                              // ARCHIVE DOSSIER SPECIFICATION:
                            </span>
                            <p className="font-sans text-xs sm:text-sm text-[#e5e5e5] leading-relaxed break-words">
                              {project.description}
                            </p>
                          </div>

                          {/* Action Links */}
                          <div className="flex flex-wrap gap-3 pt-2">
                            {project.repoUrl && (
                              <a
                                href={project.repoUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="min-h-[44px] px-4 py-2 font-mono text-xs font-semibold tracking-wider text-[#0a0a0a] bg-[#FFB000] hover:bg-[#FFB000]/90 rounded border border-[#FFB000] shadow-[0_0_10px_rgba(255,176,0,0.25)] transition-all flex items-center space-x-2"
                              >
                                <span>GITHUB SOURCE</span>
                                <span>↗</span>
                              </a>
                            )}

                            {project.liveUrl && (
                              <a
                                href={project.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="min-h-[44px] px-4 py-2 font-mono text-xs font-semibold tracking-wider text-[#FFB000] hover:text-[#0a0a0a] bg-[#0a0a0a] hover:bg-[#FFB000] rounded border border-[#FFB000]/50 transition-all flex items-center space-x-2"
                              >
                                <span>LIVE TERMINAL</span>
                                <span>⚡</span>
                              </a>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
