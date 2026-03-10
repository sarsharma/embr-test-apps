import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About — Cosmic Explorer",
  description: "Learn about the Cosmic Explorer mission",
};

// Fully static page — no dynamic data
export default function AboutPage() {
  return (
    <div className="relative z-10 max-w-4xl mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <span className="text-6xl mb-6 block">🔭</span>
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-nebula-purple to-neptune-blue bg-clip-text text-transparent">
          About Cosmic Explorer
        </h1>
        <p className="text-cosmic-400 text-lg">
          This page is 100% statically generated at build time
        </p>
      </div>

      <div className="space-y-8">
        <section className="bg-cosmic-800/50 border border-cosmic-700 rounded-xl p-8">
          <h2 className="text-2xl font-bold mb-4 text-star-gold">🎯 Our Mission</h2>
          <p className="text-cosmic-200 leading-relaxed">
            Cosmic Explorer is a demonstration Next.js application showcasing
            the power of hybrid rendering. It combines static site generation (SSG)
            for blazing-fast content delivery with server-side rendering (SSR) and
            API routes for dynamic, real-time data. Our mission is to make the
            wonders of space accessible to everyone while demonstrating modern
            web architecture patterns.
          </p>
        </section>

        <section className="bg-cosmic-800/50 border border-cosmic-700 rounded-xl p-8">
          <h2 className="text-2xl font-bold mb-4 text-neptune-blue">🏗️ Architecture</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-star-white mb-2">Static Pages</h3>
              <ul className="space-y-2 text-cosmic-300 text-sm">
                <li className="flex items-center gap-2">
                  <span className="text-green-400">●</span> Homepage — pre-rendered hero & cards
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-400">●</span> About — this page, fully static
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-400">●</span> Planet catalog — SSG with generateStaticParams
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-400">●</span> Individual planet pages — pre-built for each planet
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-star-white mb-2">Dynamic Content</h3>
              <ul className="space-y-2 text-cosmic-300 text-sm">
                <li className="flex items-center gap-2">
                  <span className="text-blue-400">●</span> Dashboard — SSR, fresh data every request
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-blue-400">●</span> API: /api/space-facts — random fact endpoint
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-blue-400">●</span> API: /api/asteroids — simulated live data
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-blue-400">●</span> Client-side fact widget — interactive fetching
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section className="bg-cosmic-800/50 border border-cosmic-700 rounded-xl p-8">
          <h2 className="text-2xl font-bold mb-4 text-nebula-pink">🛠️ Tech Stack</h2>
          <div className="flex flex-wrap gap-3">
            {[
              "Next.js 16",
              "React 19",
              "TypeScript",
              "Tailwind CSS 4",
              "App Router",
              "Server Components",
              "API Routes",
              "Static Generation",
            ].map((tech) => (
              <span
                key={tech}
                className="px-4 py-2 bg-cosmic-700/50 border border-cosmic-600 rounded-full text-sm text-cosmic-200"
              >
                {tech}
              </span>
            ))}
          </div>
        </section>

        <section className="bg-cosmic-800/50 border border-cosmic-700 rounded-xl p-8">
          <h2 className="text-2xl font-bold mb-4 text-star-gold">📊 By the Numbers</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { value: "8", label: "Planets" },
              { value: "20+", label: "Space Facts" },
              { value: "2", label: "API Routes" },
              { value: "∞", label: "Curiosity" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl font-bold text-star-white">{stat.value}</div>
                <div className="text-sm text-cosmic-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
