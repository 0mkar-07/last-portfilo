import BootSequence from './components/BootSequence'
import HudFrame from './components/HudFrame'
import Identity from './components/Identity'
import SurvivorLog from './components/SurvivorLog'
import Arsenal from './components/Arsenal'
import Archives from './components/Archives'
import Transmission from './components/Transmission'

export default function App() {
  return (
    <>
      {/* First-load Interactive Boot Sequence */}
      <BootSequence />

      {/* Subtle CRT Scanlines & Vignette Overlays */}
      <div className="crt-scanlines" aria-hidden="true" />
      <div className="crt-vignette" aria-hidden="true" />

      {/* Main HUD Frame Shell */}
      <HudFrame>
        {/* Module 01: IDENTITY */}
        <Identity />

        {/* Module 02: SURVIVOR_LOG */}
        <SurvivorLog />

        {/* Module 03: ARSENAL */}
        <Arsenal />

        {/* Module 04: ARCHIVES */}
        <Archives />

        {/* Module 05: TRANSMISSION */}
        <Transmission />
      </HudFrame>
    </>
  )
}
