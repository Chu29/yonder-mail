# Yonder Mail — GitHub Copilot Instructions
# Migration: React 19 + Vite 7 → Next.js 16 (App Router)

> These instructions apply to every Copilot request in this workspace.
> Never ask for these rules to be repeated — apply them automatically.

---

## Project

**Yonder Mail** — a time-capsule app where users record or write messages
delivered to themselves at a chosen future date.

### Current stack (migrating FROM)
- React 19 + Vite 7
- React Router DOM 7
- Zustand 5 (state management)
- Tailwind CSS 4
- Lucide React (icons)
- JavaScript (.jsx files)

### Target stack (migrating TO)
- Next.js 16 (App Router)
- TypeScript (.tsx files) — strict mode
- Tailwind CSS 4
- Lucide React (icons)
- No Zustand — replace with React Context + Server Components where possible
- No React Router — replaced by Next.js App Router file-system routing

---

## Migration Mapping — Pattern by Pattern

### 1. Routing
```
BEFORE (React Router)                    AFTER (Next.js App Router)
─────────────────────────────────────    ──────────────────────────────────────
<BrowserRouter>                          File-system routing (no wrapper needed)
<Route path="/login" element={...} />    app/login/page.tsx
<Route path="/messages" element={...} /> app/messages/page.tsx
<Link to="/login">                       import Link from 'next/link'
useNavigate()                            import { useRouter } from 'next/navigation'
useParams()                              props.params (Server) or useParams() (Client)
```

### 2. State Management
```
BEFORE (Zustand)                         AFTER (Next.js)
─────────────────────────────────────    ──────────────────────────────────────
useMessageStore()                        Server Component props + React Context
useRecordingStore()                      'use client' component local state
Global Zustand store                     Context provider in app/layout.tsx
```

### 3. Data Fetching
```
BEFORE (Vite/React)                      AFTER (Next.js App Router)
─────────────────────────────────────    ──────────────────────────────────────
useEffect + fetch()                      async Server Component
useState for loading/error               Suspense + error.tsx boundaries
Client-side API calls                    Server Actions ('use server')
```

### 4. Page Files
```
BEFORE (Vite)                            AFTER (Next.js)
─────────────────────────────────────    ──────────────────────────────────────
src/pages/Home/HomePage.jsx              app/page.tsx (root = home)
src/pages/Login/LoginPage.jsx            app/login/page.tsx
src/pages/MyMessages/MyMessagesPage.jsx  app/messages/page.tsx
src/pages/Schedule/SchedulePage.jsx      app/schedule/page.tsx
src/pages/Preview/PreviewPage.jsx        app/preview/[id]/page.tsx
src/pages/Recording/RecordingPage.jsx    app/recording/page.tsx
src/pages/Confirmation/ConfirmationPage  app/confirmation/page.tsx
src/pages/FAQ/FAQPage.jsx                app/faq/page.tsx
src/pages/About/AboutPage.jsx            app/about/page.tsx
```

### 5. Components
```
BEFORE (Vite)                            AFTER (Next.js)
─────────────────────────────────────    ──────────────────────────────────────
src/pages/Home/components/Hero.jsx       components/home/Hero.tsx (Server)
src/pages/Login/components/SigninForm    components/auth/SigninForm.tsx ('use client')
src/pages/Recording/components/...      components/recording/*.tsx ('use client')
Any component using useState/events      Add 'use client' at top
Any component that only renders HTML     Server Component (no directive needed)
```

---

## App Router File Structure (target)

```
app/
  layout.tsx              ← root layout, providers, fonts, theme script
  page.tsx                ← home page (Server Component)
  globals.css             ← CSS tokens + Tailwind base
  login/
    page.tsx              ← Server Component shell
    components/
      SigninForm.tsx       ← 'use client' (handles form state + Firebase)
  messages/
    page.tsx              ← async Server Component (fetches messages)
    components/
      MessagesList.tsx     ← Server Component
      MessagesFilter.tsx   ← 'use client' (filter/sort UI)
  schedule/
    page.tsx              ← Server Component shell
    components/
      ScheduleForm.tsx     ← 'use client' (form state + date picker)
  preview/
    [id]/
      page.tsx            ← async Server Component
      components/
        PreviewActions.tsx ← 'use client' (play/pause video)
        VideoPlayer.tsx    ← 'use client' (browser media API)
  recording/
    page.tsx              ← Server Component shell
    components/
      ControlPanel.tsx     ← 'use client' (MediaRecorder API)
      Timer.tsx            ← 'use client'
      WebcamPreview.tsx    ← 'use client' (getUserMedia)
      PrivacyNotice.tsx    ← Server Component (static text)
  confirmation/
    page.tsx              ← Server Component
  faq/
    page.tsx              ← Server Component shell
    components/
      FAQContent.tsx       ← 'use client' (accordion toggle)
  about/
    page.tsx              ← Server Component
components/
  ui/
    NavBar.tsx            ← Server Component (static links)
    ThemeToggle.tsx        ← 'use client'
    Logo.tsx              ← Server Component
    Button.tsx            ← Server Component
  home/
    Hero.tsx              ← Server Component
    Features.tsx          ← Server Component
    CTA.tsx               ← Server Component
  Providers.tsx           ← 'use client' (wraps all context providers)
  ToastContainer.tsx      ← 'use client'
context/
  AuthContext.tsx          ← 'use client'
  MessageContext.tsx       ← 'use client'
  RecordingContext.tsx     ← 'use client'
  ToastContext.tsx         ← 'use client'
```

---

## Design System

### Aesthetic
Vercel-inspired: minimal, typographically clean, emotionally calm.
Dark mode feels like late-night journaling. Light mode feels like fresh stationery.

### Fonts
Load via `next/font/google` in `app/layout.tsx`:
- `Geist` → `--font-geist-sans`
- `Geist_Mono` → `--font-geist-mono`

### CSS Token System
Define in `app/globals.css`. Never hardcode hex values in components.

```css
:root {
  --bg: #ffffff;
  --bg-secondary: #fafafa;
  --bg-tertiary: #f5f5f5;
  --bg-overlay: rgba(0, 0, 0, 0.04);

  --border: rgba(0, 0, 0, 0.08);
  --border-hover: rgba(0, 0, 0, 0.14);
  --border-focus: #0070f3;

  --text: #0a0a0a;
  --text-secondary: #6b7280;
  --text-tertiary: #9ca3af;
  --text-placeholder: #c4c9d4;

  --accent: #0070f3;
  --accent-hover: #0060df;
  --accent-bg: #eff6ff;
  --accent-text: #1d4ed8;

  --success: #10b981;
  --success-bg: #ecfdf5;
  --warning: #f59e0b;
  --warning-bg: #fffbeb;
  --danger: #ef4444;
  --danger-bg: #fef2f2;

  --radius-sm: 6px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-pill: 100px;
}

[data-theme="dark"] {
  --bg: #0a0a0a;
  --bg-secondary: #111111;
  --bg-tertiary: #1a1a1a;
  --bg-overlay: rgba(255, 255, 255, 0.04);

  --border: rgba(255, 255, 255, 0.08);
  --border-hover: rgba(255, 255, 255, 0.14);

  --text: #ededed;
  --text-secondary: #a3a3a3;
  --text-tertiary: #6b7280;
  --text-placeholder: #4b5563;

  --accent-hover: #338ef7;
  --accent-bg: #0a1628;
  --accent-text: #60a5fa;

  --success-bg: #022c22;
  --warning-bg: #1c1400;
  --danger-bg: #1c0000;
}
```

### Tailwind Usage
- Use `dark:` variant for Tailwind utility overrides
- Use `bg-[var(--bg)]` syntax for CSS variable tokens in Tailwind
- Always add `transition-colors duration-200` to interactive elements
- Mobile-first: start with base styles, add `md:` and `lg:` breakpoints

---

## Component Patterns

### Button
```tsx
// Primary
<button className="bg-[var(--text)] text-[var(--bg)] text-sm font-medium
  px-4 py-2 rounded-[var(--radius-md)] hover:opacity-85
  active:scale-[0.98] transition-all disabled:opacity-40">
  Send Letter
</button>

// Ghost
<button className="text-sm text-[var(--text-secondary)] border border-[var(--border)]
  px-4 py-2 rounded-[var(--radius-md)] hover:border-[var(--border-hover)]
  hover:text-[var(--text)] hover:bg-[var(--bg-secondary)] transition-all">
  Cancel
</button>
```

### Card
```tsx
<div className="bg-[var(--bg-secondary)] border border-[var(--border)]
  rounded-[var(--radius-lg)] p-5 hover:border-[var(--border-hover)]
  transition-colors">
  {/* content */}
</div>
```

### Status Badge
```tsx
// Scheduled
<span className="inline-flex items-center gap-1.5 text-xs font-mono
  bg-[var(--warning-bg)] text-[var(--warning)]
  border border-[var(--warning)]/20 px-2.5 py-1 rounded-[var(--radius-pill)]">
  <span className="w-1.5 h-1.5 rounded-full bg-[var(--warning)]" />
  Scheduled
</span>

// Delivered
<span className="inline-flex items-center gap-1.5 text-xs font-mono
  bg-[var(--success-bg)] text-[var(--success)]
  border border-[var(--success)]/20 px-2.5 py-1 rounded-[var(--radius-pill)]">
  <span className="w-1.5 h-1.5 rounded-full bg-[var(--success)]" />
  Delivered
</span>
```

### Input
```tsx
<input className="w-full bg-[var(--bg)] border border-[var(--border)]
  rounded-[var(--radius-md)] px-3 py-2 text-sm text-[var(--text)]
  placeholder:text-[var(--text-placeholder)]
  focus:outline-none focus:border-[var(--border-focus)]
  focus:ring-2 focus:ring-[var(--accent)]/10 transition-all" />
```

### Skeleton Loader
```tsx
<div className="animate-pulse bg-[var(--bg-overlay)]
  rounded-[var(--radius-md)] h-4 w-3/4" />
```

### Empty State
```tsx
<div className="flex flex-col items-center justify-center py-16 gap-3 text-center">
  <div className="text-3xl opacity-40">{icon}</div>
  <p className="text-sm font-medium text-[var(--text)]">{headline}</p>
  <p className="text-xs text-[var(--text-secondary)] max-w-xs">{subtext}</p>
  {/* CTA button here */}
</div>
```

---

## Key Next.js 16 Patterns

### No-FOUC Theme Script (in layout.tsx `<head>`)
```tsx
<script dangerouslySetInnerHTML={{ __html: `
  const t = localStorage.getItem('theme') ||
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  document.documentElement.setAttribute('data-theme', t);
`}} />
```

### Providers Wrapper (keeps layout.tsx a Server Component)
```tsx
// components/Providers.tsx
'use client';
export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ToastProvider>
      <AuthProvider>
        <MessageProvider>
          <RecordingProvider>{children}</RecordingProvider>
        </MessageProvider>
      </AuthProvider>
    </ToastProvider>
  );
}
```

### Async Server Component (replaces useEffect fetch)
```tsx
// BEFORE (Vite/React)
const [messages, setMessages] = useState([]);
useEffect(() => {
  fetch('/api/messages').then(r => r.json()).then(setMessages);
}, []);

// AFTER (Next.js Server Component)
export default async function MessagesPage() {
  const messages = await getMessages(); // direct DB/API call
  return <MessagesList messages={messages} />;
}
```

### Server Action (replaces client-side POST)
```tsx
'use server';
export async function scheduleMessage(formData: FormData) {
  const subject = formData.get('subject') as string;
  const deliveryDate = formData.get('deliveryDate') as string;
  // validate + save to DB
}
```

### Navigation (replaces React Router)
```tsx
// BEFORE
import { useNavigate } from 'react-router-dom';
const navigate = useNavigate();
navigate('/confirmation');

// AFTER
import { useRouter } from 'next/navigation';
const router = useRouter();
router.push('/confirmation');
```

### Link (replaces React Router Link)
```tsx
// BEFORE
import { Link } from 'react-router-dom';
<Link to="/messages">My Messages</Link>

// AFTER
import Link from 'next/link';
<Link href="/messages">My Messages</Link>
```

---

## Hard Rules

| Rule | Detail |
|------|--------|
| ❌ No `any` TypeScript types | Full type safety everywhere |
| ❌ No hardcoded hex colors | CSS variables only |
| ❌ No `useEffect` for data fetching | Use async Server Components |
| ❌ No `'use client'` on page.tsx files | Only on leaf interactive components |
| ❌ No `react-router-dom` imports | Use `next/link` and `next/navigation` |
| ❌ No Zustand imports | Use Context or Server Component props |
| ❌ No layout shift | Use `next/image` with explicit dimensions |
| ✅ Every async UI needs a loading state | Skeleton or Suspense fallback |
| ✅ Every async UI needs an error state | error.tsx boundary or fallback UI |
| ✅ Mobile-first responsive | All layouts work from 320px up |
| ✅ Keyboard accessible | Visible focus rings on all interactive elements |
| ✅ WCAG AA contrast | In both light and dark themes |
| ✅ TypeScript strict mode | tsconfig `"strict": true` |

---

## Copilot Prompt Pattern

One file per prompt. Always reference this file.

```
"Migrate src/pages/Home/components/Hero.jsx
 to components/home/Hero.tsx as a Server Component.
 Follow .github/copilot-instructions.md."

"Migrate src/pages/Recording/components/ControlPanel.jsx
 to components/recording/ControlPanel.tsx.
 Replace Zustand with useState. Add 'use client'.
 Follow .github/copilot-instructions.md."

"Generate app/messages/page.tsx as an async Server Component
 that fetches messages and passes them to <MessagesList />.
 Follow .github/copilot-instructions.md."
```
