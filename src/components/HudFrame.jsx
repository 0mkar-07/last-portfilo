import { useState, useEffect } from 'react'

const MODULES = [
  { id: 'identity', label: 'IDENTITY', index: '01' },
  { id: 'survivor-log', label: 'SURVIVOR_LOG', index: '02' },
  { id: 'arsenal', label: 'ARSENAL', index: '03' },
  { id: 'archives', label: 'ARCHIVES', index: '04' },
  { id: 'transmission', label: 'TRANSMISSION', index: '05' },
]

export default function HudFrame({ children }) {
  const [activeSection, setActiveSection] = useState('identity')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [uptimeSeconds, setUptimeSeconds] = useState(1230492) // Initial survival epoch ticks

  // Live ticking uptime counter
  useEffect(() => {
    const timer = setInterval(() => {
      setUptimeSeconds(prev => prev + 1)
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  // Format uptime into DDd HHh MMm SSs
  const formatUptime = (totalSeconds) => {
    const days = Math.floor(totalSeconds / 86400)
    const hours = Math.floor((totalSeconds % 86400) / 3600)
    const minutes = Math.floor((totalSeconds % 3600) / 60)
    const seconds = totalSeconds % 60
    return `${days}d ${String(hours).padStart(2, '0')}h ${String(minutes).padStart(2, '0')}m ${String(seconds).padStart(2, '0')}s`
  }

  // IntersectionObserver for active section highlighting
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -50% 0px',
      threshold: 0,
    }

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id)
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)
    MODULES.forEach((mod) => {
      const el = document.getElementById(mod.id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  const handleNavClick = (id) => {
    setMobileMenuOpen(false)
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
      setActiveSection(id)
    }
  }

  return (
    <div className="relative min-h-screen bg-[#0a0a0a] text-[#e5e5e5] font-sans selection:bg-[#FFB000] selection:text-[#0a0a0a]">
      {/* Corner Bracket Decorations (HUD Frame) */}
      <div className="fixed inset-0 pointer-events-none z-40 p-2 sm:p-4 md:p-6" aria-hidden="true">
        {/* Top-Left */}
        <div className="absolute top-2 left-2 sm:top-4 sm:left-4 md:top-6 md:left-6 w-5 h-5 sm:w-8 sm:h-8 border-t-2 border-l-2 border-[#FFB000]/60" />
        {/* Top-Right */}
        <div className="absolute top-2 right-2 sm:top-4 sm:right-4 md:top-6 md:right-6 w-5 h-5 sm:w-8 sm:h-8 border-t-2 border-r-2 border-[#FFB000]/60" />
        {/* Bottom-Left */}
        <div className="absolute bottom-2 left-2 sm:bottom-4 sm:left-4 md:bottom-6 md:left-6 w-5 h-5 sm:w-8 sm:h-8 border-b-2 border-l-2 border-[#FFB000]/60" />
        {/* Bottom-Right */}
        <div className="absolute bottom-2 right-2 sm:bottom-4 sm:right-4 md:bottom-6 md:right-6 w-5 h-5 sm:w-8 sm:h-8 border-b-2 border-r-2 border-[#FFB000]/60" />
      </div>

      {/* Top HUD Status Bar */}
      <header className="sticky top-0 z-30 w-full bg-[#111111]/90 backdrop-blur-md border-b border-[#FFB000]/25">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between font-mono text-xs sm:text-sm">
          {/* Brand & Terminal ID */}
          <div className="flex items-center space-x-3">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FFB000] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#FFB000]"></span>
            </span>
            <div className="flex items-center space-x-2">
              <span className="text-[#FFB000] font-bold tracking-wider">SURVIVOR_NET</span>
              <span className="text-[#8a8a8a] text-[10px] sm:text-xs">v1.0</span>
            </div>
          </div>

          {/* Telemetry (Uptime & Degraded Network status) */}
          <div className="flex items-center space-x-3 sm:space-x-6">
            {/* Live Uptime (hidden on narrow screens to prevent overflow) */}
            <div className="hidden md:flex items-center space-x-1.5 text-[#8a8a8a]">
              <span className="text-[#FFB000]/80">UPTIME:</span>
              <span className="text-[#e5e5e5] font-mono">{formatUptime(uptimeSeconds)}</span>
            </div>

            {/* Signal & Network Status */}
            <div className="flex items-center space-x-2 border border-[#FFB000]/25 px-2 py-1 rounded bg-[#0a0a0a]/60">
              {/* Signal Bars SVG */}
              <svg
                className="w-4 h-3 text-[#FFB000]"
                viewBox="0 0 16 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-label="Signal Indicator"
              >
                <rect x="0" y="9" width="2.5" height="3" fill="#FFB000" />
                <rect x="4.5" y="6" width="2.5" height="6" fill="#FFB000" />
                <rect x="9" y="3" width="2.5" height="9" fill="#FFB000" />
                <rect x="13.5" y="0" width="2.5" height="12" fill="#FFB000" fillOpacity="0.25" />
              </svg>
              <div className="flex items-center space-x-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#ff3333] animate-pulse" />
                <span className="text-[11px] sm:text-xs text-[#FFB000] font-semibold tracking-tight">
                  <span className="hidden sm:inline">NETWORK: </span>DEGRADING
                </span>
              </div>
            </div>

            {/* Mobile Hamburger Toggle Button (min 44px tap target) */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden min-w-[44px] min-h-[44px] flex items-center justify-center p-2 text-[#FFB000] hover:text-white border border-[#FFB000]/30 hover:border-[#FFB000] rounded bg-[#0a0a0a] transition-colors focus:outline-none focus:ring-1 focus:ring-[#FFB000]"
              aria-label={mobileMenuOpen ? 'Close terminal navigation' : 'Open terminal navigation'}
              aria-expanded={mobileMenuOpen}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Desktop Navigation Bar */}
        <nav
          aria-label="Terminal Modules"
          className="hidden lg:block border-t border-[#FFB000]/15 bg-[#0e0e0e]/95"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ul className="flex items-center space-x-1 font-mono text-xs py-1.5">
              {MODULES.map((mod) => {
                const isActive = activeSection === mod.id
                return (
                  <li key={mod.id}>
                    <button
                      onClick={() => handleNavClick(mod.id)}
                      className={`min-h-[40px] px-3.5 py-1.5 rounded flex items-center space-x-2 transition-all cursor-pointer ${
                        isActive
                          ? 'bg-[#FFB000]/15 text-[#FFB000] border border-[#FFB000]/50 shadow-[0_0_10px_rgba(255,176,0,0.2)]'
                          : 'text-[#8a8a8a] hover:text-[#e5e5e5] hover:bg-[#1a1a1a] border border-transparent'
                      }`}
                    >
                      <span className={isActive ? 'text-[#FFB000]' : 'text-[#8a8a8a]/70'}>
                        [{mod.index}]
                      </span>
                      <span className="font-semibold tracking-wider">{mod.label}</span>
                      {isActive && <span className="text-[#FFB000] font-bold cursor-blink">_</span>}
                    </button>
                  </li>
                )
              })}
            </ul>
          </div>
        </nav>
      </header>

      {/* Full-Screen Mobile Navigation Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-50 bg-[#0a0a0a]/98 backdrop-blur-xl flex flex-col justify-between p-6 lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation Menu"
        >
          <div className="flex items-center justify-between border-b border-[#FFB000]/25 pb-4">
            <div className="flex items-center space-x-2 font-mono">
              <span className="text-[#FFB000] font-bold">TERMINAL_NAV</span>
              <span className="text-[#8a8a8a] text-xs">[INDEX_MAP]</span>
            </div>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="min-w-[44px] min-h-[44px] flex items-center justify-center text-[#FFB000] hover:text-white border border-[#FFB000]/40 rounded p-2"
              aria-label="Close menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Module Links with min 44px tap target height */}
          <nav className="my-auto py-6">
            <ul className="space-y-3 font-mono">
              {MODULES.map((mod) => {
                const isActive = activeSection === mod.id
                return (
                  <li key={mod.id}>
                    <button
                      onClick={() => handleNavClick(mod.id)}
                      className={`w-full min-h-[52px] px-4 py-3 rounded text-left flex items-center justify-between border transition-all ${
                        isActive
                          ? 'bg-[#FFB000]/20 text-[#FFB000] border-[#FFB000] shadow-[0_0_12px_rgba(255,176,0,0.3)]'
                          : 'text-[#e5e5e5] bg-[#111111]/80 border-[#FFB000]/20 hover:border-[#FFB000]/50'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-[#FFB000] text-sm">[{mod.index}]</span>
                        <span className="text-base font-semibold tracking-wider">{mod.label}</span>
                      </div>
                      {isActive && <span className="text-[#FFB000] font-mono text-sm">[ACTIVE]</span>}
                    </button>
                  </li>
                )
              })}
            </ul>
          </nav>

          {/* Mobile Telemetry Footer */}
          <div className="border-t border-[#FFB000]/20 pt-4 font-mono text-xs text-[#8a8a8a] space-y-1">
            <div className="flex justify-between">
              <span>SYS_UPTIME:</span>
              <span className="text-[#e5e5e5]">{formatUptime(uptimeSeconds)}</span>
            </div>
            <div className="flex justify-between">
              <span>NETWORK_STATE:</span>
              <span className="text-[#FFB000]">DEGRADING // PACKET_LOSS</span>
            </div>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="relative z-10 w-full">
        {children}
      </main>

      {/* Terminal Footer Status Bar */}
      <footer className="relative z-10 border-t border-[#FFB000]/20 bg-[#0c0c0c] text-[#8a8a8a] font-mono text-xs py-4 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
          <div>
            <span className="text-[#FFB000]">TERMINAL://</span> DOOMSDAY_SURVIVOR_NET // NODE_404
          </div>
          <div className="flex items-center space-x-2">
            <span>STATUS: READY</span>
            <span className="text-[#FFB000] cursor-blink">█</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
