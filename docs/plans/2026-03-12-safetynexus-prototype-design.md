# SafetyNexus Prototype — Design Document

## Overview

Frontend-only Next.js prototype for SafetyNexus — an AI-powered domestic violence practice support platform built on the Safe & Together model. This prototype is marketing-ready with animations, transitions, and modern design. No backend, no database — all state in React, all data mocked.

## Tech Stack

- Next.js 14 (App Router) + TypeScript
- Tailwind CSS + Framer Motion (animations/transitions)
- Recharts (dashboard charts)
- Lucide React (icons)

## Color Palette (Light Theme)

- Primary: Soft blue `#3B82F6` to `#2563EB`
- Accent: Teal `#14B8A6` for positive/success states
- Warning/Crisis: Amber `#F59E0B`, Red `#EF4444`
- Backgrounds: White `#FFFFFF`, Light gray `#F8FAFC`
- Text: Slate `#1E293B` (primary), `#64748B` (secondary)
- Subtle gradients on cards and hero sections

## Modules (5 of 8)

1. The Coach — AI chat with simulated streaming responses
2. Role-Play Simulator — Scenario selection + persona chat + debrief
3. Case Mapping Tool — 12-step wizard with progress bar
4. Well-Being Companion — Check-in + crisis protocol demo
5. Analytics Dashboard — KPI cards + 3 charts

## Pages

### 1. Marketing Landing Page (`/`)
- Hero section with headline, subtitle, animated mockup, CTA
- "How It Works" 3-step animated flow
- Feature cards per module with hover animations
- Social proof (placeholder testimonials, org logos)
- Final CTA
- Scroll animations (fade-up, stagger)

### 2. Login Screen (`/login`)
- Centered card, email/password fields
- "Sign in" navigates to dashboard (no auth)
- Background gradient

### 3. Dashboard Home (`/dashboard`)
- Welcome banner, quick-start cards per module
- Recent sessions list (mocked)
- Sidebar navigation with module icons

### 4. The Coach (`/dashboard/coach`)
- Full-screen chat with message bubbles
- Context hot-buttons: Case Consultation, Practice Guidance, S&T Principles
- Simulated streaming from pre-written S&T-aligned responses
- Typing indicator, message fade-in
- Fidelity drift detection demo (trigger phrases → gentle redirect)
- Session history sidebar

### 5. Role-Play Simulator (`/dashboard/role-play`)
- Scenario selection with persona cards (Survivor, Judge, Police, Supervisor)
- Avatar, description, difficulty tag per card
- Role-play chat with persona-specific styling
- Split view: conversation left, coach observation right
- Post-session debrief with scores + feedback

### 6. Case Mapping Tool (`/dashboard/case-mapping`)
- 12-step wizard with animated progress bar
- Each step: title, guidance, form fields
- Slide transitions between steps
- Document upload area (UI only)
- Final step: PDF-style summary preview + Download button

### 7. Well-Being Companion (`/dashboard/well-being`)
- Softer UI (teal/green shift, rounded elements)
- "How are you feeling?" check-in with emoji selectors
- Reflective chat interface
- Crisis protocol: trigger → red accent bar, jurisdiction resources (Scotland/NZ/AU toggle), emergency contacts, "I'm Safe" button
- Privacy badge: "This session is private"

### 8. Analytics Dashboard (`/dashboard/analytics`)
- 4 KPI cards with animated count-up: Active Users, Sessions, Avg Duration, Fidelity Score
- Line chart: Sessions over 30 days
- Donut chart: Module usage breakdown
- Bar chart: Team activity (anonymized)
- Date range filter + Export buttons (UI only)

## Animations & Transitions

- Page transitions: Framer Motion layout animations
- Scroll: Fade/slide up on viewport entry
- Chat: Message slide-in, streaming text character-by-character
- Dashboard: Count-up numbers, chart draw-in
- Wizard: Slide transitions, progress bar fill
- Hover: Scale + shadow lift on cards/buttons
- Loading: Skeleton screens with shimmer

## Navigation

- Landing: Fixed transparent navbar → solid on scroll
- App: Left sidebar (collapsible) + top bar (avatar, notifications, org name)
- Mobile: Bottom tab nav, hamburger menu

## Demo Flow

1. Landing page → "Try Demo"
2. Login screen → "Sign In"
3. Dashboard → explore modules
4. Coach chat → AI streaming responses
5. Role-Play → scenario + debrief
6. Case Mapping wizard → PDF preview
7. Well-Being → crisis protocol trigger
8. Analytics → animated charts
