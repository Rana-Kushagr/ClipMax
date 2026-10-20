# ClipMax

> **The Category-Defining Two-Sided AI Video Clipping Studio, Autonomous Channel Autopilot & Pay-Per-View Bounty Marketplace.**

Live Studio: [https://rana-kushagr.github.io/ClipMax/](https://rana-kushagr.github.io/ClipMax/)  
SonarQube Quality Gate: [SonarCloud Dashboard](https://sonarcloud.io/dashboard?id=Rana-Kushagr_ClipMax&branch=main)

[![React 19](https://img.shields.io/badge/React-19.0-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Vite 6](https://img.shields.io/badge/Vite-6.0-646CFF?style=for-the-badge&logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![GSAP 3](https://img.shields.io/badge/GSAP-3.15-88CE02?style=for-the-badge&logo=greensock)](https://greensock.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.4-black?style=for-the-badge&logo=framer)](https://motion.dev/)
[![Quality Gate](https://sonarcloud.io/api/project_badges/measure?project=Rana-Kushagr_ClipMax&metric=alert_status)](https://sonarcloud.io/dashboard?id=Rana-Kushagr_ClipMax&branch=main)
[![Accessibility](https://img.shields.io/badge/WCAG_2.2_AA-Compliant-10B981?style=for-the-badge)](https://www.w3.org/WAI/standards-guidelines/wcag/)

---

## Overview

**ClipMax** transforms long-form videos and livestreams into viral, reframed vertical shorts in one click. Features autonomous virality scoring (0–100), multi-speaker active face detection, kinetic subtitle styling, multi-platform scheduling with 1-click mobile Telegram approval, and an escrow-backed creator bounty marketplace.

Built in strict compliance with the **Product Quality Constitution for AI Coding Agents** (`anti_vibecoded_agent_rulebook.pdf`), ClipMax is designed with tactile, cinema-grade studio clarity:

- **Zero Template Slop & Zero Emojis**: 100% purged of raw emoji icons, cheap confetti badges, and neon sine-wave squiggles. Every visual component uses crisp 1.5px stroke Lucide SVG icons and architectural hairline borders.
- **Strict Typographic Scale**:
  - **Display Headings**: `Plus Jakarta Sans` (700/800, tight tracking `-0.035em`)
  - **Selective Headline Emphasis**: `Instrument Serif` (italic editorial serif contrast)
  - **UI & Body**: `Inter` (500/600, optimal legibility)
  - **Technical Metadata**: `JetBrains Mono` with `tabular-nums` for SMPTE timecodes, virality ratings, and financial metrics
- **Four-Layer Cinema Stage Architecture**:
  1. High-resolution ARRI Alexa 65 cinema photograph (`public/hero-bg.webp`) with parallax depth
  2. Multi-stop radial vignette and studio scrim
  3. Scoped Hero Viewfinder HUD with GSAP `ScrollTrigger` dissolve (scales outward and fades out to prevent scroll collisions)
  4. Exposed hairline grid (`1px solid rgba(255, 255, 255, 0.08)`) with inline SVG `<feTurbulence>` film grain overlay
- **Output-Only Metering**:
  - **0 credits burned on upload or preview**: uploading and analyzing a 2-hour video burns zero credits. You only spend credits when downloading the finished 1080p vertical video.
  - Includes **3 free monthly exports** (tracked with React 19 `useOptimistic`) and **100% lifetime credit rollover**.
- **1-Click Mobile Bot Approval Queue**:
  - Auto-clipped shorts deliver a mobile push preview to Telegram (`@ClipMaxStudioBot`) with interactive `Approve & Queue` or `Regenerate Hook` actions.
- **Two-Sided Brand Bounty Marketplace**:
  - Verified per-view cash bounties ($3.25–$4.25 per 1,000 views) with 0% fee credit reinvestment bonus and real-time Profit Simulator.

---

## Tech Stack

| Layer | Technology |
|---|---|
| **Core Framework** | React 19 (`useOptimistic`, `useTransition`, `useActionState`, ref-as-prop) |
| **Language & Typing** | TypeScript 5.7 (`strict: true`) |
| **Bundler & Tooling** | Vite 6 |
| **Styling** | Tailwind CSS 3.4 (Dark Studio Obsidian `#08090B` / `#0E1014`, Electric Mint `#10B981`, Warm Amber `#E06D3B`) |
| **Motion Engines** | GSAP 3 (`gsap`, `ScrollTrigger`, `@gsap/react`) + Framer Motion 12 (`framer-motion`) |
| **React Bits UI** | `<BlurText />`, `<DecryptedText />`, `<SpotlightCard />`, `<TiltedCard />`, `<Magnet />`, `<CountUp />`, `<NoiseOverlay />` |
| **Icons** | Lucide React (`lucide-react`) |
| **Deployment** | GitHub Actions static export to GitHub Pages |

---

## Getting Started

### Prerequisites
- Node.js 20 or higher
- npm 10 or higher

### Installation
```bash
# Clone the repository
git clone https://github.com/Rana-Kushagr/ClipMax.git
cd ClipMax

# Install dependencies
npm install

# Start development server
npm run dev
```

### Production Build
```bash
# Typecheck and build static export to ./out
npm run build

# Preview build locally
npm run preview
```

---

## License
MIT License. Crafted with precision for high-velocity video creators.
