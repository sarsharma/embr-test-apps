# 🚀 Cosmic Explorer

A space-themed Next.js test application demonstrating **hybrid rendering** — a mix of static assets served directly and dynamic content rendered on the server per-request.

Built with Next.js 16, React 19, TypeScript, and Tailwind CSS 4.

## Route Breakdown

### Static Content (pre-rendered at build time)

These pages are generated once during `next build` and served as static HTML/assets. No server computation is needed at request time.

| Route | Type | Description |
|---|---|---|
| `/` | ○ Static | Homepage with hero section, featured planets, and architecture overview |
| `/about` | ○ Static | Fully static page — mission statement, tech stack, and architecture diagram |
| `/planets` | ○ Static | Planet catalog listing all 8 planets with stats |
| `/planets/mercury` | ● SSG | Planet detail page (generated via `generateStaticParams`) |
| `/planets/venus` | ● SSG | Planet detail page |
| `/planets/earth` | ● SSG | Planet detail page |
| `/planets/mars` | ● SSG | Planet detail page |
| `/planets/jupiter` | ● SSG | Planet detail page |
| `/planets/saturn` | ● SSG | Planet detail page |
| `/planets/uranus` | ● SSG | Planet detail page |
| `/planets/neptune` | ● SSG | Planet detail page |

### Dynamic Content (server-rendered on demand)

These routes require server processing on every request. They return fresh data each time.

| Route | Type | Description |
|---|---|---|
| `/dashboard` | ƒ Dynamic (SSR) | Server component that generates fresh asteroid tracking data on every request. Also includes a client-side space fact widget. |
| `/api/space-facts` | ƒ API Route | Returns a random space fact (from a pool of 20+) with a timestamp |
| `/api/asteroids` | ƒ API Route | Returns simulated near-earth asteroid data — count, velocity, distance, hazard status |

### Legend

| Symbol | Meaning |
|---|---|
| ○ | **Static** — pre-rendered as static content, served as-is |
| ● | **SSG** — pre-rendered as static HTML using `generateStaticParams` |
| ƒ | **Dynamic** — server-rendered on demand per request |

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

### Production Build

```bash
npm run build
npm start
```

The build output will confirm which routes are static vs dynamic.

## Tech Stack

- **Next.js 16** — App Router with hybrid static/dynamic rendering
- **React 19** — Server and Client Components
- **TypeScript** — Full type safety
- **Tailwind CSS 4** — Utility-first styling with custom space theme
