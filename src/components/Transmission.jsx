import { useState } from 'react'
import { motion } from 'framer-motion'
import { contactData, transmissionHeader } from '../data/links'

export default function Transmission() {
  const [copied, setCopied] = useState(false)

  const handleCopyEmail = () => {
    const text = contactData.email
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard
        .writeText(text)
        .then(() => {
          setCopied(true)
          setTimeout(() => setCopied(false), 2000)
        })
        .catch(() => fallbackCopy(text))
    } else {
      fallbackCopy(text)
    }
  }

  const fallbackCopy = (text) => {
    try {
      const textArea = document.createElement('textarea')
      textArea.value = text
      textArea.style.position = 'fixed'
      textArea.style.left = '-999999px'
      textArea.style.top = '-999999px'
      document.body.appendChild(textArea)
      textArea.focus()
      textArea.select()
      const successful = document.execCommand('copy')
      document.body.removeChild(textArea)
      if (successful) {
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      }
    } catch (err) {
      console.error('Fallback copy failed', err)
    }
  }

  return (
    <section
      id="transmission"
      className="min-h-screen w-full flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8 relative bg-[#0a0a0a] border-b border-[#FFB000]/15"
    >
      <div className="max-w-5xl w-full">
        {/* Section Header */}
        <div className="mb-10 border-b border-[#FFB000]/25 pb-4">
          <div className="flex items-center space-x-2 font-mono text-xs text-[#8a8a8a] mb-2">
            <span className="text-[#FFB000]">MODULE://{transmissionHeader.moduleIndex}</span>
            <span>[{transmissionHeader.tag}]</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-mono font-bold text-[#FFB000] tracking-tight glitch-hover">
            {transmissionHeader.title}
          </h2>

          {/* In-character atmospheric line */}
          <div className="mt-3 flex items-center space-x-2 font-mono text-xs sm:text-sm text-[#FFB000]/90 bg-[#111111]/80 px-3.5 py-2 rounded border border-[#FFB000]/20 max-w-xl">
            <span className="w-2 h-2 rounded-full bg-[#ff3333] animate-pulse" />
            <p>"{transmissionHeader.signalNotice}"</p>
          </div>
        </div>

        {/* Transmission Channels Panel */}
        <div className="bg-[#111111]/90 border border-[#FFB000]/30 rounded-lg p-5 sm:p-8 relative overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.6)] space-y-6">
          {/* Decorative Corner Brackets */}
          <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-[#FFB000]/70" />
          <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-[#FFB000]/70" />
          <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-[#FFB000]/70" />
          <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-[#FFB000]/70" />

          {/* Primary Channel: Email Uplink */}
          <div className="bg-[#0a0a0a] border border-[#FFB000]/25 rounded-md p-4 sm:p-5 relative">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#FFB000]/15 pb-2.5 mb-3 font-mono text-xs">
              <span className="text-[#FFB000] font-semibold">// PRIMARY_DISPATCH</span>
              <span className="text-[#8a8a8a] text-[11px]">ENC_PROTOCOL: DIRECT_MAIL</span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-[11px] font-mono text-[#8a8a8a] block">TRANSMISSION TARGET:</span>
                <a
                  href={`mailto:${contactData.email}`}
                  className="font-mono text-base sm:text-lg font-bold text-[#e5e5e5] hover:text-[#FFB000] transition-colors break-all"
                >
                  {contactData.email}
                </a>
              </div>

              {/* Action Buttons: Direct mail & Copy email */}
              <div className="flex flex-wrap items-center gap-2.5">
                <a
                  href={`mailto:${contactData.email}`}
                  className="min-h-[44px] px-4 py-2 font-mono text-xs font-semibold tracking-wider text-[#0a0a0a] bg-[#FFB000] hover:bg-[#FFB000]/90 rounded border border-[#FFB000] transition-all flex items-center space-x-2"
                >
                  <span>SEND SIGNAL</span>
                  <span>⚡</span>
                </a>

                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="min-h-[44px] px-4 py-2 font-mono text-xs font-semibold tracking-wider text-[#FFB000] hover:text-[#0a0a0a] bg-[#161616] hover:bg-[#FFB000] rounded border border-[#FFB000]/40 transition-all cursor-pointer flex items-center space-x-2 focus:outline-none focus:ring-1 focus:ring-[#FFB000]"
                >
                  {copied ? (
                    <span className="text-[#33cc33] font-bold">TRANSMITTED ✓</span>
                  ) : (
                    <span>COPY EMAIL</span>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Social Frequency Grid */}
          <div className="space-y-3">
            <span className="text-xs font-mono text-[#8a8a8a] uppercase block">
              // RECOVERED NETWORK CHANNELS:
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {contactData.links.map((link) => (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[64px] p-4 bg-[#0a0a0a] border border-[#FFB000]/25 hover:border-[#FFB000] rounded transition-all group flex flex-col justify-between hover:shadow-[0_0_15px_rgba(255,176,0,0.18)]"
                >
                  <div className="flex items-center justify-between font-mono text-xs mb-2">
                    <span className="text-[#8a8a8a] text-[10px]">{link.frequency}</span>
                    <span className="text-[#FFB000] text-[10px] flex items-center space-x-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FFB000] animate-pulse" />
                      <span>{link.status}</span>
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-mono text-sm sm:text-base font-bold text-[#e5e5e5] group-hover:text-[#FFB000] transition-colors glitch-hover">
                        {link.label}
                      </h4>
                      <span className="font-mono text-xs text-[#8a8a8a]">{link.handle}</span>
                    </div>

                    <span className="text-[#FFB000] font-mono text-lg group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">
                      ↗
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Closing Line with blinking cursor */}
          <div className="pt-6 border-t border-[#FFB000]/20 flex flex-col items-center justify-center text-center space-y-2">
            <div className="font-mono text-sm sm:text-base font-bold text-[#FFB000] tracking-widest flex items-center">
              <span>{contactData.closingLine}</span>
              <span className="cursor-blink ml-1">_</span>
            </div>
            <p className="font-mono text-[11px] text-[#8a8a8a]">
              TERMINAL UPLINK REMAINING IN PASSIVE LISTENING MODE
            </p>
          </div>

          {/* Minimal Terminal Footer */}
          <div className="border-t border-[#FFB000]/15 pt-4 flex flex-col sm:flex-row items-center justify-between gap-2 font-mono text-xs text-[#8a8a8a]">
            <div>{contactData.footer.name} // {contactData.footer.year}</div>
            <div className="text-[#FFB000]">{contactData.footer.system}</div>
          </div>
        </div>
      </div>
    </section>
  )
}
