import HudFrame from './components/HudFrame'
import Identity from './components/Identity'

const REMAINING_SECTIONS = [
  { id: 'survivor-log', name: 'SURVIVOR_LOG', index: '02', desc: 'Chronological Career & Mission Timeline' },
  { id: 'arsenal', name: 'ARSENAL', index: '03', desc: 'Technical Weaponry & Capabilities' },
  { id: 'archives', name: 'ARCHIVES', index: '04', desc: 'Salvaged Repositories & Artifacts' },
  { id: 'transmission', name: 'TRANSMISSION', index: '05', desc: 'Encrypted Frequencies & Uplink Channel' },
]

export default function App() {
  return (
    <>
      {/* Subtle CRT Scanlines & Vignette Overlays */}
      <div className="crt-scanlines" aria-hidden="true" />
      <div className="crt-vignette" aria-hidden="true" />

      {/* Main HUD Frame Shell */}
      <HudFrame>
        {/* Module 01: IDENTITY */}
        <Identity />

        {/* Modules 02 - 05 Placeholders */}
        {REMAINING_SECTIONS.map((section) => (
          <section
            key={section.id}
            id={section.id}
            className="min-h-screen w-full flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 border-b border-[#FFB000]/15 relative bg-[#0a0a0a]"
          >
            <div className="max-w-4xl w-full p-6 sm:p-10 border border-[#FFB000]/25 rounded bg-[#111111]/80 backdrop-blur-sm relative overflow-hidden">
              {/* Subtle top indicator bar */}
              <div className="flex items-center justify-between font-mono text-xs text-[#8a8a8a] pb-4 mb-6 border-b border-[#FFB000]/20">
                <span className="text-[#FFB000]">MODULE://{section.index}</span>
                <span>SYS_READY // ID_{section.id.toUpperCase()}</span>
              </div>

              {/* Module Title with glitch-on-hover effect and blinking cursor */}
              <div className="space-y-3">
                <div className="inline-block">
                  <span className="text-xs font-mono text-[#FFB000] tracking-widest uppercase">
                    [SEC_CLEARANCE_LVL_4]
                  </span>
                  <h2 className="text-2xl sm:text-4xl md:text-5xl font-mono font-bold text-[#FFB000] tracking-tight glitch-hover mt-1">
                    {section.name}
                    <span className="cursor-blink ml-1">_</span>
                  </h2>
                </div>

                <p className="text-sm sm:text-base text-[#8a8a8a] font-sans max-w-xl">
                  {section.desc}
                </p>
              </div>

              {/* Terminal Placeholder Diagnostics */}
              <div className="mt-8 pt-4 border-t border-[#FFB000]/15 flex items-center justify-between font-mono text-xs text-[#8a8a8a]">
                <span className="flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-[#FFB000]/60 animate-pulse"></span>
                  <span>STANDBY FOR DATA INGESTION</span>
                </span>
                <span className="text-[#FFB000]/80">0x00{section.index}FF</span>
              </div>
            </div>
          </section>
        ))}
      </HudFrame>
    </>
  )
}
