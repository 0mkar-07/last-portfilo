import { motion } from 'framer-motion'
import { skillCategories, arsenalHeader } from '../data/skills'
import { usePrefersReducedMotion } from '../utils/useReducedMotion'

export default function Arsenal() {
  const shouldReduceMotion = usePrefersReducedMotion()

  return (
    <section
      id="arsenal"
      className="min-h-screen w-full flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8 relative bg-[#0a0a0a] border-b border-[#FFB000]/15 scroll-mt-16 sm:scroll-mt-24"
    >
      <div className="max-w-6xl w-full">
        {/* Section Header */}
        <div className="mb-10 border-b border-[#FFB000]/25 pb-4">
          <div className="flex items-center space-x-2 font-mono text-xs text-[#a3a3a3] mb-2">
            <span className="text-[#FFB000]">MODULE://{arsenalHeader.moduleIndex}</span>
            <span>[{arsenalHeader.tag}]</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-mono font-bold text-[#FFB000] tracking-tight glitch-hover">
            {arsenalHeader.title}
          </h2>

          <p className="mt-2 text-sm sm:text-base text-[#a3a3a3] font-sans max-w-2xl">
            {arsenalHeader.subtitle}
          </p>
        </div>

        {/* 2-Column Responsive Inventory Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {skillCategories.map((category) => {
            const isLearning = category.isLearning

            return (
              <div
                key={category.id}
                className={`rounded-lg p-5 sm:p-6 relative overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.6)] ${
                  isLearning
                    ? 'bg-[#111111]/70 border-2 border-dashed border-[#FFB000]/40'
                    : 'bg-[#111111]/90 border border-[#FFB000]/30'
                }`}
              >
                {/* Decorative Inventory Corner Brackets */}
                <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-[#FFB000]/70" />
                <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-[#FFB000]/70" />
                <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-[#FFB000]/70" />
                <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-[#FFB000]/70" />

                {/* Panel Header */}
                <div className="flex items-center justify-between font-mono text-xs border-b border-[#FFB000]/15 pb-3 mb-5">
                  <div className="flex items-center space-x-2">
                    <span className="text-[#FFB000] font-bold tracking-wider">
                      SLOT://{category.name}
                    </span>
                  </div>
                  <span className="text-[#a3a3a3] text-[11px] font-semibold">
                    [{String(category.skills.length).padStart(2, '0')} UNITS]
                  </span>
                </div>

                {/* Skills List in this Category */}
                <div className="space-y-4">
                  {category.skills.map((skill) => (
                    <div
                      key={skill.name}
                      className={`p-3.5 rounded border transition-colors ${
                        isLearning
                          ? 'bg-[#0a0a0a]/80 border-dashed border-[#FFB000]/25 hover:border-[#FFB000]/60'
                          : 'bg-[#0a0a0a]/90 border-[#FFB000]/20 hover:border-[#FFB000]/50'
                      }`}
                    >
                      {/* Skill Name & Glyph */}
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2.5">
                          <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-[#161616] border border-[#FFB000]/30 text-[#FFB000]">
                            {skill.icon}
                          </span>
                          <span className="font-mono text-sm sm:text-base font-bold text-[#e5e5e5] glitch-hover">
                            {skill.name}
                          </span>
                        </div>

                        {/* Status / Level text */}
                        <span className="font-mono text-xs text-[#a3a3a3]">
                          {isLearning ? (
                            <span className="text-[#FFB000] font-semibold text-[11px] flex items-center space-x-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#FFB000] animate-pulse" />
                              <span>IN_TRAINING</span>
                            </span>
                          ) : (
                            <span>LVL {skill.level}/5</span>
                          )}
                        </span>
                      </div>

                      {/* Diagnostic Indicator */}
                      {isLearning ? (
                        /* LEARNING Category: Animated LOADING... Indicator */
                        <div className="space-y-1.5 pt-1">
                          <div className="flex items-center justify-between font-mono text-[11px] text-[#FFB000]">
                            <span className="tracking-widest flex items-center space-x-1.5">
                              <span className="cursor-blink">▶</span>
                              <span>LOADING MODEL WEIGHTS...</span>
                            </span>
                            <span className="text-[#a3a3a3] text-[10px] font-mono">
                              STANDBY
                            </span>
                          </div>
                          <div className="w-full bg-[#161616] h-2 rounded-xs overflow-hidden border border-[#FFB000]/30 relative">
                            <motion.div
                              initial={{ x: '-100%' }}
                              animate={{ x: '100%' }}
                              transition={
                                shouldReduceMotion
                                  ? { duration: 0 }
                                  : {
                                      repeat: Infinity,
                                      duration: 1.8,
                                      ease: 'linear',
                                    }
                              }
                              className="h-full w-1/3 bg-gradient-to-r from-transparent via-[#FFB000] to-transparent"
                            />
                          </div>
                        </div>
                      ) : (
                        /* Standard Skill: 5-Segment Block Bar */
                        <div
                          className="flex items-center space-x-1.5 pt-1"
                          role="meter"
                          aria-label={`${skill.name}: level ${skill.level} of 5`}
                          aria-valuenow={skill.level}
                          aria-valuemin={1}
                          aria-valuemax={5}
                        >
                          {[1, 2, 3, 4, 5].map((blockNum, i) => {
                            const isFilled = blockNum <= skill.level

                            return (
                              <motion.div
                                key={blockNum}
                                initial={
                                  shouldReduceMotion
                                    ? { opacity: 1, scaleY: 1 }
                                    : { opacity: 0.15, scaleY: 0.3 }
                                }
                                whileInView={
                                  shouldReduceMotion
                                    ? { opacity: 1, scaleY: 1 }
                                    : { opacity: 1, scaleY: 1 }
                                }
                                viewport={{ once: true }}
                                transition={{
                                  duration: shouldReduceMotion ? 0 : 0.25,
                                  delay: shouldReduceMotion ? 0 : i * 0.08,
                                }}
                                className={`h-2.5 flex-1 rounded-xs transition-colors ${
                                  isFilled
                                    ? 'bg-[#FFB000] shadow-[0_0_8px_rgba(255,176,0,0.4)] border border-[#FFB000]'
                                    : 'bg-[#181818] border border-[#2b2b2b]'
                                }`}
                              />
                            )
                          })}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
