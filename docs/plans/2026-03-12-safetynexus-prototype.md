# SafetyNexus Prototype Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a marketing-ready frontend-only Next.js prototype demonstrating 5 core modules of the SafetyNexus platform — an AI-powered domestic violence practice support tool built on the Safe & Together model.

**Architecture:** Next.js 14 App Router with TypeScript. All data is mocked in local JSON/TS files. Chat responses are pre-written and streamed character-by-character. State managed with React useState/useContext. No backend, no database, no API calls.

**Tech Stack:** Next.js 14, TypeScript, Tailwind CSS, Framer Motion, Recharts, Lucide React

---

## Phase 1: Project Setup & Foundation

### Task 1: Initialize Next.js Project

**Files:**
- Create: `package.json`, `tsconfig.json`, `tailwind.config.ts`, `next.config.mjs`, `postcss.config.mjs`
- Create: `src/app/layout.tsx`, `src/app/page.tsx`, `src/app/globals.css`

**Step 1: Create Next.js app**

```bash
cd "/Users/shayanabbasi/Development/SAFETYNEXUS - PROTOTYPE"
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm
```

Select defaults when prompted.

**Step 2: Install dependencies**

```bash
npm install framer-motion recharts lucide-react clsx
```

**Step 3: Verify dev server starts**

```bash
npm run dev
```

Expected: Server runs on localhost:3000

**Step 4: Commit**

```bash
git init
git add -A
git commit -m "chore: initialize Next.js project with dependencies"
```

---

### Task 2: Configure Design System & Global Styles

**Files:**
- Modify: `tailwind.config.ts`
- Modify: `src/app/globals.css`
- Create: `src/lib/constants.ts`

**Step 1: Update Tailwind config with SafetyNexus theme**

In `tailwind.config.ts`, extend the theme with:

```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        accent: {
          50: '#f0fdfa',
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#14b8a6',
          600: '#0d9488',
          700: '#0f766e',
        },
        slate: {
          50: '#f8fafc',
          750: '#293548',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-in-right': 'slideInRight 0.3s ease-out',
        'count-up': 'countUp 1s ease-out',
        'shimmer': 'shimmer 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
```

**Step 2: Update globals.css**

Replace contents of `src/app/globals.css` with:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');

@layer base {
  html {
    scroll-behavior: smooth;
  }
  body {
    @apply font-sans text-slate-800 antialiased;
  }
}

@layer components {
  .btn-primary {
    @apply bg-primary-600 hover:bg-primary-700 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-primary-600/25 active:scale-[0.98];
  }
  .btn-secondary {
    @apply bg-white hover:bg-slate-50 text-primary-600 font-semibold px-6 py-3 rounded-xl border-2 border-primary-200 transition-all duration-200 hover:border-primary-400;
  }
  .card {
    @apply bg-white rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-all duration-300;
  }
  .gradient-text {
    @apply bg-gradient-to-r from-primary-600 to-accent-500 bg-clip-text text-transparent;
  }
}

@layer utilities {
  .glass {
    @apply bg-white/80 backdrop-blur-md;
  }
}
```

**Step 3: Create constants file**

Create `src/lib/constants.ts`:

```typescript
export const APP_NAME = "SafetyNexus";
export const APP_TAGLINE = "AI-Powered Domestic Violence Practice Support";
export const APP_DESCRIPTION =
  "An intelligent coaching platform built on the Safe & Together model, supporting caseworkers with real-time guidance, role-play practice, and case mapping tools.";

export const MODULES = [
  {
    id: "coach",
    name: "The Coach",
    description: "AI chat coach grounded exclusively in the S&T model with fidelity drift detection",
    icon: "MessageCircle",
    color: "primary",
    href: "/dashboard/coach",
  },
  {
    id: "role-play",
    name: "Role-Play Simulator",
    description: "Practice conversations with AI personas and receive S&T-aligned debrief feedback",
    icon: "Users",
    color: "violet",
    href: "/dashboard/role-play",
  },
  {
    id: "case-mapping",
    name: "Case Mapping Tool",
    description: "12-step guided perpetrator pattern documentation with PDF export",
    icon: "ClipboardList",
    color: "amber",
    href: "/dashboard/case-mapping",
  },
  {
    id: "well-being",
    name: "Well-Being Companion",
    description: "Emotional support, distress detection, and hardcoded crisis protocol",
    icon: "Heart",
    color: "teal",
    href: "/dashboard/well-being",
  },
  {
    id: "analytics",
    name: "Analytics Dashboard",
    description: "Usage metrics, NLP theme detection, and practice fidelity signals",
    icon: "BarChart3",
    color: "blue",
    href: "/dashboard/analytics",
  },
] as const;

export const DEMO_USER = {
  name: "Sarah Mitchell",
  email: "sarah.mitchell@safetynexus.demo",
  role: "Senior Caseworker",
  organization: "Scottish DV Services",
  avatar: "/avatar-placeholder.png",
};
```

**Step 4: Commit**

```bash
git add -A
git commit -m "feat: configure design system, theme, and global constants"
```

---

### Task 3: Create Shared UI Components

**Files:**
- Create: `src/components/ui/Button.tsx`
- Create: `src/components/ui/Card.tsx`
- Create: `src/components/ui/Badge.tsx`
- Create: `src/components/ui/AnimatedSection.tsx`
- Create: `src/components/ui/TypingIndicator.tsx`
- Create: `src/components/ui/CountUpNumber.tsx`
- Create: `src/components/ui/ProgressBar.tsx`
- Create: `src/components/ui/index.ts`

**Step 1: Create all UI components**

`src/components/ui/Button.tsx`:
```tsx
"use client";

import { forwardRef } from "react";
import { clsx } from "clsx";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={clsx(
          "font-semibold rounded-xl transition-all duration-200 active:scale-[0.98] inline-flex items-center justify-center gap-2",
          {
            "bg-primary-600 hover:bg-primary-700 text-white hover:shadow-lg hover:shadow-primary-600/25":
              variant === "primary",
            "bg-white hover:bg-slate-50 text-primary-600 border-2 border-primary-200 hover:border-primary-400":
              variant === "secondary",
            "bg-transparent hover:bg-slate-100 text-slate-600": variant === "ghost",
            "bg-red-500 hover:bg-red-600 text-white": variant === "danger",
          },
          {
            "px-3 py-1.5 text-sm": size === "sm",
            "px-6 py-3 text-base": size === "md",
            "px-8 py-4 text-lg": size === "lg",
          },
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
```

`src/components/ui/Card.tsx`:
```tsx
"use client";

import { motion } from "framer-motion";
import { clsx } from "clsx";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

export function Card({ children, className, hover = true, onClick }: CardProps) {
  return (
    <motion.div
      whileHover={hover ? { y: -4, boxShadow: "0 12px 40px rgba(0,0,0,0.08)" } : undefined}
      transition={{ duration: 0.2 }}
      onClick={onClick}
      className={clsx(
        "bg-white rounded-2xl shadow-sm border border-slate-100 p-6",
        onClick && "cursor-pointer",
        className
      )}
    >
      {children}
    </motion.div>
  );
}
```

`src/components/ui/Badge.tsx`:
```tsx
import { clsx } from "clsx";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "success" | "warning" | "danger" | "info";
  className?: string;
}

export function Badge({ children, variant = "default", className }: BadgeProps) {
  return (
    <span
      className={clsx(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
        {
          "bg-slate-100 text-slate-700": variant === "default",
          "bg-green-100 text-green-700": variant === "success",
          "bg-amber-100 text-amber-700": variant === "warning",
          "bg-red-100 text-red-700": variant === "danger",
          "bg-blue-100 text-blue-700": variant === "info",
        },
        className
      )}
    >
      {children}
    </span>
  );
}
```

`src/components/ui/AnimatedSection.tsx`:
```tsx
"use client";

import { motion } from "framer-motion";

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
}

export function AnimatedSection({
  children,
  className,
  delay = 0,
  direction = "up",
}: AnimatedSectionProps) {
  const directionMap = {
    up: { y: 40 },
    down: { y: -40 },
    left: { x: 40 },
    right: { x: -40 },
  };

  return (
    <motion.div
      initial={{ opacity: 0, ...directionMap[direction] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
```

`src/components/ui/TypingIndicator.tsx`:
```tsx
"use client";

import { motion } from "framer-motion";

export function TypingIndicator() {
  return (
    <div className="flex items-center gap-1 px-4 py-3">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="w-2 h-2 bg-slate-300 rounded-full"
          animate={{ y: [0, -6, 0] }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            delay: i * 0.15,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
```

`src/components/ui/CountUpNumber.tsx`:
```tsx
"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

interface CountUpNumberProps {
  end: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
}

export function CountUpNumber({
  end,
  duration = 1.5,
  suffix = "",
  prefix = "",
  decimals = 0,
}: CountUpNumberProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const startTime = Date.now();
    const timer = setInterval(() => {
      const elapsed = (Date.now() - startTime) / 1000;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end * Math.pow(10, decimals)) / Math.pow(10, decimals));
      if (progress >= 1) clearInterval(timer);
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, end, duration, decimals]);

  return (
    <motion.span ref={ref} className="tabular-nums">
      {prefix}{decimals > 0 ? count.toFixed(decimals) : count}{suffix}
    </motion.span>
  );
}
```

`src/components/ui/ProgressBar.tsx`:
```tsx
"use client";

import { motion } from "framer-motion";
import { clsx } from "clsx";

interface ProgressBarProps {
  progress: number;
  className?: string;
  showLabel?: boolean;
}

export function ProgressBar({ progress, className, showLabel = true }: ProgressBarProps) {
  return (
    <div className={clsx("w-full", className)}>
      {showLabel && (
        <div className="flex justify-between mb-1">
          <span className="text-sm text-slate-500">Progress</span>
          <span className="text-sm font-medium text-primary-600">{Math.round(progress)}%</span>
        </div>
      )}
      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-primary-500 to-accent-500 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}
```

`src/components/ui/index.ts`:
```typescript
export { Button } from "./Button";
export { Card } from "./Card";
export { Badge } from "./Badge";
export { AnimatedSection } from "./AnimatedSection";
export { TypingIndicator } from "./TypingIndicator";
export { CountUpNumber } from "./CountUpNumber";
export { ProgressBar } from "./ProgressBar";
```

**Step 2: Commit**

```bash
git add -A
git commit -m "feat: add shared UI component library"
```

---

## Phase 2: Marketing Landing Page

### Task 4: Build Landing Page

**Files:**
- Create: `src/components/landing/Navbar.tsx`
- Create: `src/components/landing/HeroSection.tsx`
- Create: `src/components/landing/HowItWorks.tsx`
- Create: `src/components/landing/FeaturesSection.tsx`
- Create: `src/components/landing/TestimonialsSection.tsx`
- Create: `src/components/landing/CTASection.tsx`
- Create: `src/components/landing/Footer.tsx`
- Modify: `src/app/page.tsx`
- Modify: `src/app/layout.tsx`

**Step 1: Build Navbar**

`src/components/landing/Navbar.tsx` — Fixed transparent navbar that solidifies on scroll. Logo text "SafetyNexus", nav links (Features, How It Works, Testimonials), CTA button "Request Demo", and a "Try Demo" link to `/login`. Use `useEffect` + scroll listener to toggle glass background.

**Step 2: Build HeroSection**

`src/components/landing/HeroSection.tsx` — Full viewport height. Left side: badge "Built on Safe & Together", H1 headline "Empowering Caseworkers with AI-Guided Practice Support", subtitle paragraph, two CTAs (primary "Request a Demo", secondary "Try the Demo" → `/login`). Right side: animated mockup of the chat interface (a styled div with fake chat bubbles that animate in staggered). Background: subtle gradient mesh from primary-50 to white.

**Step 3: Build HowItWorks**

`src/components/landing/HowItWorks.tsx` — 3 steps in a row: (1) "Sign In" with shield icon, (2) "Choose Your Module" with layout icon, (3) "Get Expert Guidance" with sparkles icon. Connected by animated dashed lines. Each step fades up on scroll with stagger delay.

**Step 4: Build FeaturesSection**

`src/components/landing/FeaturesSection.tsx` — Section header "Everything Caseworkers Need". Grid of 5 feature cards (one per module from `MODULES` constant). Each card: icon in colored circle, module name, description. Cards animate in on scroll with stagger. Hover: lift + shadow.

**Step 5: Build TestimonialsSection**

`src/components/landing/TestimonialsSection.tsx` — 3 testimonial cards with placeholder quotes from fictional caseworkers/supervisors. Each with name, role, org. Soft gradient background on the section.

**Step 6: Build CTASection**

`src/components/landing/CTASection.tsx` — Full-width gradient banner (primary-600 to primary-800). H2 "Ready to Transform Your Practice?", subtitle, large CTA button. Animated background shapes (floating circles with low opacity).

**Step 7: Build Footer**

`src/components/landing/Footer.tsx` — Simple footer with SafetyNexus logo, copyright, links (Privacy, Terms, Contact). Muted colors.

**Step 8: Assemble landing page**

Update `src/app/page.tsx` to compose all sections. Update `src/app/layout.tsx` with Inter font, metadata (title, description).

**Step 9: Test in browser**

Run `npm run dev`, navigate to localhost:3000. Verify:
- Navbar is transparent and solidifies on scroll
- Hero animates in with staggered elements
- Scroll animations trigger on each section
- All hover effects work
- "Try Demo" links to `/login`
- Mobile responsive (check at 375px width)

**Step 10: Commit**

```bash
git add -A
git commit -m "feat: build marketing landing page with animations"
```

---

## Phase 3: Login & App Shell

### Task 5: Build Login Page

**Files:**
- Create: `src/app/login/page.tsx`

**Step 1: Build login page**

Clean centered login card on subtle gradient background. SafetyNexus logo/text at top. Email + password fields (pre-filled with demo user data). "Sign In" button that navigates to `/dashboard` via `useRouter().push()`. Link below: "Back to home". No actual auth — just navigation.

Add a subtle floating shapes animation in background using Framer Motion.

**Step 2: Commit**

```bash
git add -A
git commit -m "feat: add login page"
```

---

### Task 6: Build App Shell (Sidebar + Layout)

**Files:**
- Create: `src/app/dashboard/layout.tsx`
- Create: `src/components/app/Sidebar.tsx`
- Create: `src/components/app/TopBar.tsx`
- Create: `src/components/app/MobileNav.tsx`
- Create: `src/app/dashboard/page.tsx`

**Step 1: Build Sidebar**

`src/components/app/Sidebar.tsx` — Collapsible left sidebar. SafetyNexus logo at top. Navigation items from `MODULES` constant with Lucide icons. Active state highlight (primary-50 bg, primary-600 text). Collapse button at bottom (chevron). When collapsed, show only icons. Smooth width transition with Framer Motion.

**Step 2: Build TopBar**

`src/components/app/TopBar.tsx` — Top bar with: hamburger menu (mobile), breadcrumb/page title, right side: notification bell icon (with red dot), user avatar + name dropdown. Organization name "Scottish DV Services" as subtle text.

**Step 3: Build MobileNav**

`src/components/app/MobileNav.tsx` — Bottom tab navigation for mobile. 5 tabs matching the modules. Active state indicator. Only visible below `md` breakpoint.

**Step 4: Build Dashboard Layout**

`src/app/dashboard/layout.tsx` — Flex layout: Sidebar (left, hidden on mobile) + main content area. TopBar at top of main area. MobileNav at bottom (mobile only). Content area has `overflow-y-auto` with padding. Page transitions using Framer Motion `AnimatePresence`.

**Step 5: Build Dashboard Home**

`src/app/dashboard/page.tsx` — Welcome banner: "Good morning, Sarah" with date. Grid of 5 module quick-start cards (from MODULES). Each card: colored icon, module name, description, "Start" button → navigates to module. Below: "Recent Sessions" list with 4 mocked items (date, module, duration, preview text). Cards animate in with stagger.

**Step 6: Test in browser**

Verify:
- Sidebar renders with all module links
- Sidebar collapses/expands smoothly
- TopBar shows user info
- Dashboard cards link to correct routes
- Mobile responsive: sidebar hidden, bottom nav appears
- Page transitions are smooth

**Step 7: Commit**

```bash
git add -A
git commit -m "feat: build app shell with sidebar, topbar, and dashboard home"
```

---

## Phase 4: The Coach Module

### Task 7: Create Mock Data for Coach

**Files:**
- Create: `src/data/coach-responses.ts`

**Step 1: Create pre-written S&T-aligned responses**

Create a map of trigger keywords → responses. Include:
- General S&T coaching responses (when no specific trigger matched)
- Responses for "perpetrator behavior", "case", "pattern"
- Responses for "survivor", "mother", "protective actions"
- Responses for fidelity drift triggers: if message contains phrases like "why didn't she leave", "she failed to protect", "mother's inability" → AI gently redirects to S&T framing
- Context hot-button responses for "Case Consultation", "Practice Guidance", "S&T Principles"
- Each response should be 2-4 sentences, professionally written, grounded in S&T language

Include at least 15 unique responses and a default pool of 5 general coaching responses.

Also include a `DEMO_SESSIONS` array with 3-4 past session summaries (title, date, preview).

**Step 2: Commit**

```bash
git add -A
git commit -m "feat: add coach mock data and S&T-aligned responses"
```

---

### Task 8: Build Coach Chat Interface

**Files:**
- Create: `src/app/dashboard/coach/page.tsx`
- Create: `src/components/coach/ChatMessage.tsx`
- Create: `src/components/coach/ChatInput.tsx`
- Create: `src/components/coach/ContextButtons.tsx`
- Create: `src/components/coach/SessionSidebar.tsx`
- Create: `src/hooks/useStreamingText.ts`

**Step 1: Create streaming text hook**

`src/hooks/useStreamingText.ts` — Custom hook that takes a full string and streams it character-by-character with a configurable speed (default 20ms). Returns `{ displayedText, isStreaming, startStreaming }`. Uses `useEffect` with interval.

**Step 2: Build ChatMessage component**

`src/components/coach/ChatMessage.tsx` — Message bubble component. Props: `role` ("user" | "assistant"), `content`, `isStreaming`. User messages: right-aligned, primary-600 bg, white text. Assistant messages: left-aligned, slate-50 bg, with small SafetyNexus icon. Animate in with `motion.div` slide-up. If streaming, use the streaming hook to display text character by character.

**Step 3: Build ChatInput**

`src/components/coach/ChatInput.tsx` — Input bar at bottom. Textarea (auto-grows), send button with arrow icon. Disabled state while AI is "responding". Subtle shadow above the input area.

**Step 4: Build ContextButtons**

`src/components/coach/ContextButtons.tsx` — Horizontal row of pill buttons at top of chat: "Case Consultation", "Practice Guidance", "S&T Principles", "Fidelity Check". On click, inserts a pre-written prompt into the chat.

**Step 5: Build SessionSidebar**

`src/components/coach/SessionSidebar.tsx` — Right sidebar (desktop only) showing past sessions from `DEMO_SESSIONS`. Each item: title, date, preview. "New Session" button at top. Collapsible on desktop.

**Step 6: Assemble Coach page**

`src/app/dashboard/coach/page.tsx` — Full layout: SessionSidebar (right), main chat area (center). ContextButtons at top. Chat messages in scrollable area. ChatInput at bottom. Initial welcome message from the coach. When user sends a message: show typing indicator for 1s, then stream the matched response.

Implement the matching logic:
1. Check message against fidelity drift triggers → redirect response
2. Check against keyword matches → matched response
3. Fall back to random general coaching response

Auto-scroll to bottom on new messages.

**Step 7: Test in browser**

Navigate to `/dashboard/coach`. Verify:
- Welcome message appears with streaming animation
- Context buttons insert prompts
- User can type and send messages
- Typing indicator shows, then response streams in
- Try typing "why didn't she leave" → verify fidelity drift redirect
- Session sidebar shows past sessions
- Mobile: sidebar hidden, full chat view

**Step 8: Commit**

```bash
git add -A
git commit -m "feat: build Coach chat interface with streaming responses"
```

---

## Phase 5: Role-Play Simulator

### Task 9: Create Role-Play Mock Data

**Files:**
- Create: `src/data/role-play-data.ts`

**Step 1: Create personas and scenarios**

Define 4 persona objects:
- **Survivor (Maria)**: DV survivor, 2 children, seeking custody support. Difficulty: Intermediate.
- **Judge (Judge Campbell)**: Family court judge reviewing custody case. Difficulty: Advanced.
- **Police Officer (Officer Davies)**: Responding officer, initially dismissive. Difficulty: Intermediate.
- **Supervisor (Team Lead Chen)**: Reviewing caseworker's documentation. Difficulty: Beginner.

Each persona: name, role, avatar color, difficulty badge, scenario description, 8-10 pre-written dialogue exchanges (user prompt → persona response pairs), and a debrief object (S&T alignment score, strengths array, improvements array, key takeaway).

**Step 2: Commit**

```bash
git add -A
git commit -m "feat: add role-play personas and scenario data"
```

---

### Task 10: Build Role-Play UI

**Files:**
- Create: `src/app/dashboard/role-play/page.tsx`
- Create: `src/components/role-play/PersonaCard.tsx`
- Create: `src/components/role-play/RolePlayChat.tsx`
- Create: `src/components/role-play/CoachObserver.tsx`
- Create: `src/components/role-play/DebriefScreen.tsx`

**Step 1: Build PersonaCard**

`src/components/role-play/PersonaCard.tsx` — Card with: colored avatar circle with initial, persona name, role, scenario description, difficulty Badge. Click to select. Hover animation (lift + glow border). Selected state with checkmark.

**Step 2: Build scenario selection page**

`src/app/dashboard/role-play/page.tsx` — Two states: selection and active role-play.

Selection state: Header "Choose a Scenario", subtitle explaining role-play. Grid of 4 PersonaCards. "Start Role-Play" button (enabled when one selected). Animate cards in with stagger.

**Step 3: Build RolePlayChat**

`src/components/role-play/RolePlayChat.tsx` — Similar to Coach chat but with persona-specific styling. Persona messages use their avatar color. Header shows persona name + scenario. "End Session" button in header. Uses the pre-written dialogue exchanges — each user message triggers the next persona response in sequence.

**Step 4: Build CoachObserver**

`src/components/role-play/CoachObserver.tsx` — Right panel (desktop). Header "Coach Observations". Shows real-time observation notes that appear as the conversation progresses. Each note: icon (checkmark for good, alert for needs attention), text. Notes fade in as messages are exchanged. Example notes: "Good use of perpetrator-pattern language", "Consider asking about children's experience".

**Step 5: Build DebriefScreen**

`src/components/role-play/DebriefScreen.tsx` — Shown after "End Session". Animated score reveal (circular progress with S&T Alignment percentage). Three sections: Strengths (green checkmarks), Areas for Improvement (amber arrows), Key Takeaway (blue info box). "Practice Again" and "Back to Scenarios" buttons. Everything animates in with stagger.

**Step 6: Wire up the full flow**

In the page component, manage state: `selection` → `active` → `debrief`. Transition animations between states. In active state: split view with RolePlayChat (left 60%) and CoachObserver (right 40%). On mobile: tabs to switch between chat and observer.

**Step 7: Test in browser**

Navigate to `/dashboard/role-play`. Verify:
- 4 persona cards render with animations
- Selecting a persona highlights it
- Starting role-play transitions smoothly
- Messages exchange correctly with streaming
- Coach observations appear alongside
- Ending session shows debrief with score animation
- Mobile responsive

**Step 8: Commit**

```bash
git add -A
git commit -m "feat: build Role-Play Simulator with personas and debrief"
```

---

## Phase 6: Case Mapping Tool

### Task 11: Create Case Mapping Data

**Files:**
- Create: `src/data/case-mapping-data.ts`

**Step 1: Define 12 steps with form fields**

Create an array of 12 step objects, each with: step number, title, description/guidance text, and form field definitions. Steps based on S&T perpetrator pattern mapping:

1. Case Overview (text fields: case ID, date, worker name)
2. Referral Information (textarea: referral source, reason)
3. Perpetrator Identification (text fields: name, relationship, demographics)
4. Pattern of Coercive Control (textarea with prompts, checkboxes for behavior types)
5. Impact on Daily Functioning (textarea)
6. Impact on Parenting (textarea)
7. Impact on Children (textarea, checklist of observed impacts)
8. Survivor Protective Actions (textarea with S&T-framed prompts)
9. Survivor Strengths & Resources (textarea)
10. Children's Functioning & Needs (textarea)
11. Risk Assessment Summary (textarea, dropdown for risk level)
12. Recommended Actions (textarea, checkboxes for action types)

Include placeholder/example text for each field.

**Step 2: Commit**

```bash
git add -A
git commit -m "feat: add case mapping 12-step data definitions"
```

---

### Task 12: Build Case Mapping Wizard

**Files:**
- Create: `src/app/dashboard/case-mapping/page.tsx`
- Create: `src/components/case-mapping/StepProgress.tsx`
- Create: `src/components/case-mapping/StepForm.tsx`
- Create: `src/components/case-mapping/CasePreview.tsx`
- Create: `src/components/case-mapping/DocumentUpload.tsx`

**Step 1: Build StepProgress**

`src/components/case-mapping/StepProgress.tsx` — Horizontal progress indicator showing all 12 steps. Current step highlighted in primary, completed steps in accent with checkmark, upcoming in slate-200. Step numbers in circles connected by lines. Animated fill on the progress line. Responsive: on mobile, show step X of 12 with ProgressBar.

**Step 2: Build StepForm**

`src/components/case-mapping/StepForm.tsx` — Renders form fields for the current step. Props: step data object. Renders: step title, guidance text (in a blue-50 info box), form fields (textareas, text inputs, checkboxes, dropdowns as defined). Pre-populated with placeholder/example text. "Next" and "Previous" buttons at bottom.

**Step 3: Build DocumentUpload**

`src/components/case-mapping/DocumentUpload.tsx` — Drag-and-drop zone with dashed border. Shows file icon and "Drop files here or click to upload" text. On "drop" (simulated), shows a fake uploaded file with name, size, and remove button. Animated entry.

**Step 4: Build CasePreview**

`src/components/case-mapping/CasePreview.tsx` — PDF-style preview. White page with shadow, header with "Case Map Report" title, case ID, date. Renders all 12 step titles with their filled content below. Professional report styling. "Download PDF" button (shows toast: "PDF export ready" — doesn't actually generate). "Edit" button to go back to a step.

**Step 5: Assemble wizard page**

`src/app/dashboard/case-mapping/page.tsx` — State: current step (1-12) + form data object + view mode (wizard | preview). StepProgress at top. StepForm in center. Framer Motion `AnimatePresence` for slide transitions between steps (slide left going forward, slide right going back). At step 12 completion, "Review Case Map" button → transitions to CasePreview. Include DocumentUpload in relevant steps (e.g., step 2, 4).

**Step 6: Test in browser**

Navigate to `/dashboard/case-mapping`. Verify:
- Progress bar shows all 12 steps
- Form fields render correctly for each step
- Slide transitions work between steps
- Document upload area works visually
- Final preview renders like a report
- "Download PDF" shows feedback
- Mobile responsive

**Step 7: Commit**

```bash
git add -A
git commit -m "feat: build Case Mapping 12-step wizard with preview"
```

---

## Phase 7: Well-Being Companion

### Task 13: Create Well-Being Mock Data

**Files:**
- Create: `src/data/well-being-data.ts`

**Step 1: Define well-being data**

Create:
- Check-in mood options: 5 moods with emoji, label, color (Great, Good, Okay, Struggling, In Crisis)
- Well-being chat responses: supportive, empathetic responses for different moods
- Crisis protocol data:
  - Category A (Personal Safety): immediate danger resources
  - Category B (Mental Health): mental health crisis lines
  - Category C (Child Danger): child protection hotlines
  - Jurisdiction-specific resources for Scotland, New Zealand, Australia (real hotline numbers)
- Crisis trigger phrases: "I'm not safe", "I want to hurt myself", "I can't do this anymore", "emergency", "suicide"

**Step 2: Commit**

```bash
git add -A
git commit -m "feat: add well-being and crisis protocol data"
```

---

### Task 14: Build Well-Being Companion UI

**Files:**
- Create: `src/app/dashboard/well-being/page.tsx`
- Create: `src/components/well-being/MoodCheckIn.tsx`
- Create: `src/components/well-being/WellBeingChat.tsx`
- Create: `src/components/well-being/CrisisProtocol.tsx`

**Step 1: Build MoodCheckIn**

`src/components/well-being/MoodCheckIn.tsx` — Centered card with "How are you feeling today?" heading. 5 mood buttons in a row, each with emoji + label. Subtle teal/green color scheme. On selection, animate out and transition to chat. Special case: "In Crisis" selection → immediately shows CrisisProtocol.

**Step 2: Build WellBeingChat**

`src/components/well-being/WellBeingChat.tsx` — Similar to Coach chat but with softer styling: teal accent colors, rounded bubbles, calming UI. Privacy badge pinned at top: lock icon + "This session is private and excluded from analytics". Responses are empathetic and supportive. If user types a crisis trigger phrase → transitions to CrisisProtocol.

**Step 3: Build CrisisProtocol**

`src/components/well-being/CrisisProtocol.tsx` — Full-screen overlay with serious treatment:
- Red accent bar at top: "Crisis Support Activated"
- Jurisdiction toggle: Scotland | New Zealand | Australia (tabs)
- Per-jurisdiction: Category A/B/C resources displayed as cards with phone numbers, descriptions
- Large "Call Now" buttons (tel: links for mobile)
- "I'm Safe" acknowledgment button at bottom → returns to well-being chat with gentled-down messaging
- This component uses NO AI — all content is hardcoded
- Animate in with scale + fade

**Step 4: Assemble well-being page**

`src/app/dashboard/well-being/page.tsx` — State machine: `checkin` → `chat` → optionally `crisis`. MoodCheckIn shown first. After mood selection, WellBeingChat. Crisis protocol can trigger from either MoodCheckIn ("In Crisis") or chat (trigger phrases). Smooth transitions between states.

**Step 5: Test in browser**

Navigate to `/dashboard/well-being`. Verify:
- Mood check-in renders with all 5 options
- Selecting a mood transitions to chat
- Chat works with streaming responses
- Typing "I'm not safe" triggers crisis protocol
- Selecting "In Crisis" mood triggers crisis protocol
- Jurisdiction toggle switches resources
- "I'm Safe" returns to chat
- Privacy badge visible
- Teal/green color scheme distinct from other modules

**Step 6: Commit**

```bash
git add -A
git commit -m "feat: build Well-Being Companion with crisis protocol"
```

---

## Phase 8: Analytics Dashboard

### Task 15: Create Analytics Mock Data

**Files:**
- Create: `src/data/analytics-data.ts`

**Step 1: Generate mock analytics data**

Create:
- KPI values: activeUsers (247), sessionsThisWeek (1,284), avgDuration (18.5 min), fidelityScore (94.2%)
- Line chart data: 30 data points (dates + session counts), trending upward
- Donut chart data: module usage percentages (Coach 35%, Role-Play 25%, Case Mapping 20%, Well-Being 15%, Other 5%)
- Bar chart data: 8 anonymized team members with session counts
- Date range options: Last 7 days, Last 30 days, Last 90 days, This Year

**Step 2: Commit**

```bash
git add -A
git commit -m "feat: add analytics mock data"
```

---

### Task 16: Build Analytics Dashboard UI

**Files:**
- Create: `src/app/dashboard/analytics/page.tsx`
- Create: `src/components/analytics/KPICard.tsx`
- Create: `src/components/analytics/SessionsChart.tsx`
- Create: `src/components/analytics/ModuleUsageChart.tsx`
- Create: `src/components/analytics/TeamActivityChart.tsx`
- Create: `src/components/analytics/DateRangeFilter.tsx`

**Step 1: Build KPICard**

`src/components/analytics/KPICard.tsx` — Card with: icon in colored circle, label, CountUpNumber value, trend indicator (up/down arrow + percentage in green/red). Animate in on mount.

**Step 2: Build SessionsChart**

`src/components/analytics/SessionsChart.tsx` — Recharts `AreaChart` (not Line — Area looks better). Gradient fill under the line (primary-500 to transparent). Custom tooltip. Animated on mount. Responsive.

**Step 3: Build ModuleUsageChart**

`src/components/analytics/ModuleUsageChart.tsx` — Recharts `PieChart` with donut style (inner radius). Custom colors per module. Center label showing total. Custom legend below. Animated segments.

**Step 4: Build TeamActivityChart**

`src/components/analytics/TeamActivityChart.tsx` — Recharts `BarChart` with rounded bars. Primary-500 fill. Horizontal layout. Custom tooltip with session count.

**Step 5: Build DateRangeFilter**

`src/components/analytics/DateRangeFilter.tsx` — Row of pill buttons for date ranges. Active state styling. Plus "Export PDF" and "Export CSV" buttons on the right (show toast on click).

**Step 6: Assemble analytics page**

`src/app/dashboard/analytics/page.tsx` — Layout:
- DateRangeFilter at top
- 4 KPICards in a grid row (responsive: 2x2 on mobile)
- SessionsChart (full width)
- ModuleUsageChart and TeamActivityChart side by side (stack on mobile)
- Everything animates in with stagger

**Step 7: Test in browser**

Navigate to `/dashboard/analytics`. Verify:
- KPI cards animate count-up numbers
- All 3 charts render with animations
- Date range pills toggle (visual only)
- Export buttons show feedback
- Charts are responsive
- Overall layout looks professional

**Step 8: Commit**

```bash
git add -A
git commit -m "feat: build Analytics Dashboard with charts and KPIs"
```

---

## Phase 9: Polish & Final Touches

### Task 17: Add Page Transitions & Loading States

**Files:**
- Modify: `src/app/dashboard/layout.tsx`
- Create: `src/components/ui/PageTransition.tsx`
- Create: `src/components/ui/SkeletonLoader.tsx`

**Step 1: Build PageTransition wrapper**

Framer Motion wrapper that animates page content on route change. Fade + slight slide up. Wrap the `{children}` in dashboard layout.

**Step 2: Build SkeletonLoader**

Shimmer-effect skeleton component for loading states. Variants: text line, card, circle (avatar). Used as placeholder while "loading" for 500ms on page mount.

**Step 3: Add loading states to dashboard pages**

Each module page shows skeleton for 500ms on mount, then fades in real content. This gives the impression of data loading and feels more like a real app.

**Step 4: Commit**

```bash
git add -A
git commit -m "feat: add page transitions and skeleton loading states"
```

---

### Task 18: Mobile Responsiveness Pass

**Files:**
- Modify: Various component files as needed

**Step 1: Audit and fix mobile layouts**

Go through each page at 375px width and fix:
- Landing page: stack hero content, reduce font sizes
- Dashboard: ensure bottom nav works, cards stack to single column
- Coach/Role-Play/Well-Being: full-width chat, hide sidebars
- Case Mapping: step progress shows compact view
- Analytics: charts stack vertically, KPIs in 2x2 grid

**Step 2: Test on multiple breakpoints**

Verify at 375px (mobile), 768px (tablet), 1024px (small desktop), 1440px (desktop).

**Step 3: Commit**

```bash
git add -A
git commit -m "fix: mobile responsiveness across all pages"
```

---

### Task 19: Final Visual Polish

**Files:**
- Modify: Various files as needed

**Step 1: Review and polish**

- Ensure consistent spacing, typography, and color usage
- Add subtle hover states to all interactive elements
- Verify all animations are smooth (no jank)
- Add favicon and meta tags for social sharing (og:image, etc.)
- Add a simple toast notification system for actions like "PDF exported"
- Ensure the landing page → login → dashboard flow is seamless

**Step 2: Build for production**

```bash
npm run build
```

Fix any build errors or warnings.

**Step 3: Final commit**

```bash
git add -A
git commit -m "feat: final visual polish and production build"
```

---

## Summary

| Phase | Tasks | Description |
|-------|-------|-------------|
| 1 | 1-3 | Project setup, design system, UI components |
| 2 | 4 | Marketing landing page |
| 3 | 5-6 | Login page, app shell (sidebar/topbar/dashboard) |
| 4 | 7-8 | The Coach module |
| 5 | 9-10 | Role-Play Simulator |
| 6 | 11-12 | Case Mapping Tool |
| 7 | 13-14 | Well-Being Companion |
| 8 | 15-16 | Analytics Dashboard |
| 9 | 17-19 | Polish, transitions, mobile, final build |

**Total: 19 tasks across 9 phases**
