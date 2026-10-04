import { identityData } from './identity'

export const bootConfig = {
  systemTitle: 'SURVIVOR_NET v1.0',
  skipPrompt: 'SKIP [PRESS ANY KEY]',
  bootLines: [
    '> INITIALIZING SURVIVOR_NET v1.0...',
    '> NETWORK STATUS: DEGRADED',
    '> SCANNING FOR SURVIVORS...',
    `> SURVIVOR DETECTED: ${identityData.name.toUpperCase()}`,
    '> LOADING ARCHIVE...',
    '> ACCESS GRANTED',
  ],
  totalDurationMs: 3000,
}
