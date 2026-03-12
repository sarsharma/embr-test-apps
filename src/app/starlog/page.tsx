import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Starlog — Cosmic Explorer",
  description: "Captain's log with Partial Pre-rendering",
};

// PPR (Partial Pre-rendering) concept page
// In Next.js 16, PPR is available via `cacheComponents` config.
// This page demonstrates the PPR pattern using Suspense:
// the static shell renders instantly, dynamic islands stream in.

// Static data that gets pre-rendered into the shell
const captainsLog = {
  title: "Captain's Starlog",
  subtitle: "Bridge of the CSS Voyager",
  intro:
    "This page demonstrates Partial Pre-rendering (PPR) — the static shell is served instantly from the edge, while dynamic sections stream in via Suspense boundaries.",
  staticEntries: [
    {
      id: "SL-001",
      stardate: "47634.44",
      title: "Mission Parameters Established",
      content:
        "We have defined the exploration parameters for the outer rim. Crew morale is high. All systems nominal.",
      category: "Operations",
      emoji: "📋",
    },
    {
      id: "SL-002",
      stardate: "47635.12",
      title: "Nebula Cartography Complete",
      content:
        "Completed mapping of the Horsehead Nebula region. Found three previously uncharted protostellar formations.",
      category: "Science",
      emoji: "🗺️",
    },
    {
      id: "SL-003",
      stardate: "47636.88",
      title: "First Contact Protocol Review",
      content:
        "Reviewed and updated first contact procedures. All bridge officers certified for diplomatic scenarios.",
      category: "Diplomatic",
      emoji: "🖖",
    },
  ],
};

function DynamicSkeleton() {
  return (
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <div key={i} className="bg-cosmic-800/30 border border-cosmic-700 rounded-xl p-5 animate-pulse">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-8 w-8 bg-cosmic-700/50 rounded-lg" />
            <div className="h-5 bg-cosmic-700/50 rounded w-48" />
          </div>
          <div className="h-4 bg-cosmic-700/30 rounded w-full mb-2" />
          <div className="h-4 bg-cosmic-700/30 rounded w-3/4" />
        </div>
      ))}
    </div>
  );
}

async function LiveTransmissions() {
  // Simulate async data fetching with delay
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const now = new Date();
  const transmissions = [
    {
      id: "TX-" + now.getTime(),
      source: "Deep Space Array Alpha",
      signal: "Hydrogen emission line detected at 21cm",
      strength: Math.floor(Math.random() * 40 + 60),
      timestamp: now.toISOString(),
      emoji: "📡",
    },
    {
      id: "TX-" + (now.getTime() + 1),
      source: "Relay Station Proxima",
      signal: "Telemetry update from Voyager probe network",
      strength: Math.floor(Math.random() * 30 + 40),
      timestamp: new Date(now.getTime() - 300000).toISOString(),
      emoji: "🛰️",
    },
    {
      id: "TX-" + (now.getTime() + 2),
      source: "Europa Subsurface Lab",
      signal: "Thermal vent activity increase in sector 7G",
      strength: Math.floor(Math.random() * 20 + 80),
      timestamp: new Date(now.getTime() - 600000).toISOString(),
      emoji: "🧊",
    },
  ];

  return (
    <div className="space-y-4">
      {transmissions.map((tx) => (
        <div
          key={tx.id}
          className="bg-cosmic-800/50 border border-neptune-blue/30 rounded-xl p-5"
        >
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="text-xl">{tx.emoji}</span>
              <h4 className="font-bold text-star-white">{tx.source}</h4>
            </div>
            <span className="text-xs text-cosmic-500 font-mono">
              {new Date(tx.timestamp).toLocaleTimeString()}
            </span>
          </div>
          <p className="text-sm text-cosmic-300 mb-2">{tx.signal}</p>
          <div className="flex items-center gap-2">
            <span className="text-xs text-cosmic-500">Signal Strength:</span>
            <div className="flex-1 h-2 bg-cosmic-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-neptune-blue to-nebula-purple rounded-full"
                style={{ width: `${tx.strength}%` }}
              />
            </div>
            <span className="text-xs text-neptune-blue font-mono">{tx.strength}%</span>
          </div>
        </div>
      ))}
    </div>
  );
}

async function CrewStatus() {
  await new Promise((resolve) => setTimeout(resolve, 3000));

  const crew = [
    { name: "Commander Nova", role: "Captain", status: "On Bridge", emoji: "👩‍🚀" },
    { name: "Lt. Orion", role: "Science Officer", status: "In Lab", emoji: "🔬" },
    { name: "Ensign Vega", role: "Navigation", status: "On Bridge", emoji: "🧭" },
    { name: "Dr. Pulsar", role: "Chief Medical", status: "Medbay", emoji: "⚕️" },
    { name: "Chief Quasar", role: "Engineering", status: "Engine Room", emoji: "🔧" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {crew.map((member) => (
        <div
          key={member.name}
          className="bg-cosmic-800/50 border border-cosmic-700 rounded-xl p-4 flex items-center gap-3"
        >
          <span className="text-2xl">{member.emoji}</span>
          <div>
            <div className="font-medium text-star-white text-sm">{member.name}</div>
            <div className="text-xs text-cosmic-400">{member.role}</div>
          </div>
          <span className="ml-auto px-2 py-1 bg-green-500/10 text-green-400 border border-green-500/20 rounded-full text-xs">
            {member.status}
          </span>
        </div>
      ))}
      <div className="text-xs text-cosmic-500 font-mono sm:col-span-2 text-center mt-2">
        Crew status updated at {new Date().toLocaleTimeString()}
      </div>
    </div>
  );
}

export default function StarlogPage() {
  return (
    <div className="relative z-10 max-w-5xl mx-auto px-4 py-16">
      {/* ===== STATIC SHELL (Pre-rendered at build time) ===== */}
      <div className="text-center mb-12">
        <span className="text-6xl mb-6 block">📖</span>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          {captainsLog.title}
        </h1>
        <p className="text-cosmic-400 text-lg">{captainsLog.subtitle}</p>
      </div>

      {/* PPR Info Banner (Static) */}
      <div className="bg-star-gold/10 border border-star-gold/30 rounded-xl p-4 mb-10 text-center">
        <p className="text-sm text-star-gold font-medium">
          ⚡ PPR (Partial Pre-rendering) — The static shell loads instantly, dynamic sections stream in
        </p>
        <p className="text-xs text-cosmic-500 mt-1">
          Static parts are pre-rendered at build time · Dynamic parts use Suspense boundaries
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Static Log Entries */}
        <div className="lg:col-span-2 space-y-8">
          {/* Static Section - Rendered immediately */}
          <div>
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <span>📋</span> Archived Log Entries
              <span className="text-xs font-normal px-2 py-0.5 bg-cosmic-700/50 rounded-full text-cosmic-400">
                Static
              </span>
            </h2>
            <p className="text-sm text-cosmic-400 mb-4">{captainsLog.intro}</p>
            <div className="space-y-4">
              {captainsLog.staticEntries.map((entry) => (
                <div
                  key={entry.id}
                  className="bg-cosmic-800/50 border border-cosmic-700 rounded-xl p-5"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{entry.emoji}</span>
                      <h3 className="font-bold text-star-white">{entry.title}</h3>
                    </div>
                    <span className="text-xs text-cosmic-500 font-mono">
                      SD {entry.stardate}
                    </span>
                  </div>
                  <p className="text-sm text-cosmic-300 leading-relaxed">{entry.content}</p>
                  <span className="inline-block mt-2 text-xs px-2 py-0.5 bg-cosmic-700/50 rounded text-cosmic-400">
                    {entry.category}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Dynamic Section - Streams in */}
          <div>
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <span>📡</span> Live Transmissions
              <span className="text-xs font-normal px-2 py-0.5 bg-neptune-blue/20 rounded-full text-neptune-blue">
                Dynamic
              </span>
            </h2>
            <Suspense fallback={<DynamicSkeleton />}>
              <LiveTransmissions />
            </Suspense>
          </div>
        </div>

        {/* Right Column: Dynamic Crew Status */}
        <div>
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <span>👩‍🚀</span> Crew Status
            <span className="text-xs font-normal px-2 py-0.5 bg-neptune-blue/20 rounded-full text-neptune-blue">
              Dynamic
            </span>
          </h2>
          <Suspense fallback={
            <div className="space-y-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="bg-cosmic-800/30 border border-cosmic-700 rounded-xl p-4 animate-pulse flex items-center gap-3">
                  <div className="h-8 w-8 bg-cosmic-700/50 rounded-lg" />
                  <div className="flex-1">
                    <div className="h-4 bg-cosmic-700/50 rounded w-24 mb-1" />
                    <div className="h-3 bg-cosmic-700/30 rounded w-16" />
                  </div>
                </div>
              ))}
            </div>
          }>
            <CrewStatus />
          </Suspense>

          {/* Static sidebar info */}
          <div className="mt-8 bg-cosmic-800/50 border border-cosmic-700 rounded-xl p-5">
            <h3 className="font-bold text-star-white mb-3 flex items-center gap-2">
              <span>ℹ️</span> PPR Explained
            </h3>
            <ul className="space-y-2 text-xs text-cosmic-400">
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">●</span>
                <span><strong className="text-cosmic-300">Static shell</strong> — Title, banner, archived logs, and this sidebar are pre-rendered and served instantly</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-neptune-blue mt-0.5">●</span>
                <span><strong className="text-cosmic-300">Dynamic islands</strong> — Live Transmissions and Crew Status stream in via Suspense after the shell loads</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-nebula-purple mt-0.5">●</span>
                <span><strong className="text-cosmic-300">Best of both</strong> — Instant static TTFB + fresh dynamic data, no full-page trade-off</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Footer badge */}
      <div className="mt-12 text-center text-xs text-cosmic-500">
        ⚡ PPR page — static shell pre-rendered, dynamic sections streamed via Suspense
      </div>
    </div>
  );
}
