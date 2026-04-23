# Insighte Sanctuary Design Architecture

This document defines the unified design language for the Insighte Care Platform, focused on neuro-affirmative, premium, and weightless user interfaces.

## 1. Visual Foundation (The "Sanctuary" Aesthetic)
The "Sanctuary" style is characterized by deep space, subtle illumination, and "floating" elements. It avoids harsh boundaries and traditional "corporate" layouts.

### 1.1 Color Palette
- **Primary Background**: `#0a0b14` (Deep Space)
- **Secondary Background**: `#111224` (Midnight)
- **Primary Accent**: `#8b7ff0` (Lavender/Iris - used for trust, stability)
- **Secondary Accent**: `#5dcaa5` (Seafoam - used for growth, success, verification)
- **Highlight Accent**: `#f97316` (Orange - used for warmth, energy, attention)
- **Tertiary Accent**: `#c5b8f8` (Soft Lilac - used for emphasis, quotes)
- **Border/Utility**: `rgba(255, 255, 255, 0.06)` to `0.1`

### 1.2 Typography
- **Headings (Display)**: `DM Serif Display` (Italic by default for primary headers).
- **Body/System**: `DM Sans` (Clean, highly readable).
- **Special/UI**: Non-italic system fonts for maximum clarity in buttons and labels.

### 1.3 Glassmorphism Rules
- **Panels (Vessels)**: `background: rgba(255, 255, 255, 0.03)`, `backdrop-filter: blur(40px)`, `border: 1px solid rgba(255, 255, 255, 0.1)`.
- **Shadows**: Large, soft shadows with low opacity and high spread. Example: `shadow-[0_32px_64px_-12px_rgba(0,0,0,0.6)]`.

## 2. Interaction Design Principles
- **Weightless Navigation**: Smooth transitions using Framer Motion. 
- **Connect Before Correct**: Empathetic microcopy. No "Error" messages; instead "Let's try that again."
- **Touch Targets**: Minimum 44x44px.
- **Progressive Disclosure**: Only show complex details when the user interacts or scrolls.

## 3. Component Standards
- **Buttons**: Rounded-2xl (1rem) or rounded-[3rem] for main CTAs.
- **Badges**: High tracking (tracking-[0.2em]), bold uppercase micro-copy.
- **Sections**: Large vertical margins (`space-y-20` on desktop) for "breathing room".

## 4. Tone of Voice
- **Direct & Authentic**: No jargon.
- **Supportive**: Use "How we help" instead of "Our Clinical Services".
- **Neuro-Inclusive**: No flickering, no aggressive autoplay, high contrast options available.
