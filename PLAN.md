# THE LAST PORTFOLIO // SURVIVAL ARCHIVE
> **Terminal Network Interface & Portfolio Archive**  
> Theme: Doomsday / Last Survivor / Digital Archive. Functional terminal aesthetic balanced with modern professional polish.

---

## 1. PROJECT SPECIFICATION & CONSTRAINTS

### 1.1 Core Concept
A digital fallout terminal archive preserving identity, logs, capabilities, and past artifacts. It balances a post-apocalyptic narrative/terminal vibe with high readability and professional recruiter/evaluator usability.

### 1.2 Tech Stack
- **Framework & Bundler:** React 19 (or 18) + Vite
- **Styling:** Tailwind CSS v4 (`@tailwindcss/vite`)
- **Animation & Motion:** Framer Motion
- **Fonts:**
  - System / Terminal / Header Text: `JetBrains Mono`
  - Body / Reading Text: `Inter`
- **Deployment Target:** Vercel

### 1.3 Strict Design & Architecture Rules
1. **Palette:**
   - Dominant dark background (`#0a0a0a` / deep CRT phosphor darks).
   - **Exactly ONE accent color:** Amber (`#FFB000`).
   - Muted/amber-tinted shades for borders, scanlines, and dim text (`rgba(255, 176, 0, 0.1 - 0.7)`).
2. **Typography Hierarchy:**
   - Headers, status telemetry, labels, timestamps, badges: `JetBrains Mono`.
   - Long-form descriptions, logs, bios: `Inter` for clean legibility.
3. **Atmospheric FX:**
   - Global CRT scanline overlay (subtle, non-intrusive, pointer-events none).
   - Subtle hover glitches / signal chromatic aberrations.
   - Blinking cursor (`_` or block `█`) on active prompts and telemetry heads.
4. **Responsiveness:**
   - Mobile-first, fully responsive across 375px (mobile), 768px (tablet), and desktop wide screens.
   - Zero horizontal overflow (`overflow-x-hidden`).
5. **Data Architecture:**
   - **All portfolio data must live inside `src/data/*.js`** (e.g., `identity.js`, `logs.js`, `arsenal.js`, `archives.js`, `transmission.js`).
   - Never hardcode user details, copy, links, or lists directly inside React UI components.
6. **Code Simplicity:**
   - Minimal dependencies: no heavy icon packs or extraneous UI libraries.
   - Readable, lightweight, modular React components.

---

## 2. MODULE ARCHITECTURE (SECTIONS)

The portfolio is structured as standalone terminal sub-systems ("Modules"):

### 🛰️ Module 01: `IDENTITY`
- **Terminal Status:** `SYS_ONLINE`, Ping, Coordinates, Power level, Radiation/Signal status.
- **Survivor Profile:** Call sign / Name, role, survival directive / mission statement.
- **Quick Actions:** Terminal command prompt / CTAs (Download Archive Dossier/Resume, Jump to Archives, Transmit Signal).

### 📜 Module 02: `SURVIVOR_LOG`
- **Chronological Stardate Log:** Experience, education, milestones, career history formatted as encrypted transmission logs or survival entries.
- **Structure:** Stardate/Year, outpost/company, role/designation, situational reports (achievements, responsibilities).

### ⚡ Module 03: `ARSENAL`
- **Operational Stack & Tools:** Technical skills, frameworks, runtime tools, hardware/tactical capabilities.
- **Grouping:** Languages, Frontend Systems, Backend/Databases, Protocols & DevOps, Specialized Tools.
- **Telemetry UI:** Proficiency indicators, system diagnostic bars or battery/signal levels.

### 💾 Module 04: `ARCHIVES`
- **Project Repositories & Salvaged Artifacts:** Featured work, key projects, experiments, open-source repositories.
- **Card Schema:** System ID, Title, Threat/Classification tag, Salvage summary, Stack chips, Live Link / Beacon URL, Source code / Data tape.

### 📡 Module 05: `TRANSMISSION`
- **Contact & Frequency Channels:** Terminal communication uplink.
- **Channels:** Social links (GitHub, LinkedIn, X, Email) formatted as communication frequencies (`FREQ: 142.8 MHz`, etc.).
- **Transmission Form:** Direct terminal message dispatch (Name, Frequency/Email, Encrypted Payload/Message).

---

## 3. FILE & FOLDER STRUCTURE PLAN

```
/
├── PLAN.md                     # Source of truth and architectural guide
├── package.json
├── vite.config.js              # Vite configuration with Tailwind CSS v4 plugin
├── index.html                  # JetBrains Mono & Inter Google Fonts injection
├── src/
│   ├── assets/                 # Ambient sounds or scanline SVG masks (if needed)
│   ├── data/                   # ALL DATA LIVES HERE
│   │   ├── identity.js         # Survivor profile, status, telemetry
│   │   ├── logs.js             # Career and education survival timeline
│   │   ├── arsenal.js          # Skills, toolsets, proficiencies
│   │   ├── archives.js         # Projects, case studies, links
│   │   └── transmission.js     # Contact info, social frequencies
│   ├── components/
│   │   ├── common/
│   │   │   ├── ScanlineOverlay.jsx  # Atmospheric CRT scanlines & vignette
│   │   │   ├── TerminalHeader.jsx   # Top status bar, clock, battery/signal
│   │   │   ├── BlinkingCursor.jsx   # Terminal blinking prompt cursor
│   │   │   ├── GlitchText.jsx       # Subtle hover glitch effect
│   │   │   └── TerminalFrame.jsx    # Monolithic module container with amber borders
│   │   └── modules/
│   │       ├── IdentityModule.jsx
│   │       ├── SurvivorLogModule.jsx
│   │       ├── ArsenalModule.jsx
│   │       ├── ArchivesModule.jsx
│   │       └── TransmissionModule.jsx
│   ├── styles/
│   │   └── index.css           # Tailwind v4 import & custom CRT / scanline styles
│   ├── App.jsx                 # Main terminal interface shell
│   └── main.jsx                # Application root entry
└── vercel.json                 # Optional Vercel routing / headers config
```

---

## 4. STEP-BY-STEP IMPLEMENTATION ROADMAP

1. **Phase 1: Project Scaffolding & Config**
   - Initialize Vite + React project.
   - Configure Tailwind CSS v4 via `@tailwindcss/vite`.
   - Setup font loading for `JetBrains Mono` and `Inter`.
   - Configure amber color palette tokens (`#FFB000`) and custom utilities (scanlines, CRT glow).

2. **Phase 2: Data Schema Definition (`src/data/*.js`)**
   - Create mock/default survivor datasets for all 5 modules with modular exports.

3. **Phase 3: Atmosphere & Shell UI Components**
   - Implement `ScanlineOverlay`, `TerminalHeader`, `BlinkingCursor`, `GlitchText`.
   - Build responsive layout frame with navigation/module switching or vertical HUD view.

4. **Phase 4: Module Implementation**
   - Build `IdentityModule` with real-time clock and status indicators.
   - Build `SurvivorLogModule` with collapsible/interactive log entries.
   - Build `ArsenalModule` with diagnostic capability bars.
   - Build `ArchivesModule` with artifact cards and interactive preview modals/links.
   - Build `TransmissionModule` with functional contact transmitter interface.

5. **Phase 5: Responsive Verification & Polish**
   - Verify layout on 375px, 768px, and 1440px+.
   - Validate performance, zero horizontal scroll, and Vercel build readiness.
