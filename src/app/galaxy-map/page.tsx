import type { Metadata } from "next";
import { Suspense } from "react";
import { starSystems, nebulae } from "@/lib/data";

export const metadata: Metadata = {
  title: "Galaxy Map — Cosmic Explorer",
  description: "Explore star systems, nebulae, and cosmic phenomena with streaming",
};

// Force dynamic so each section streams independently
export const dynamic = "force-dynamic";

function SectionSkeleton({ rows }: { rows: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {Array.from({ length: rows }, (_, i) => (
        <div key={i} className="bg-cosmic-800/30 border border-cosmic-700 rounded-xl p-6 animate-pulse">
          <div className="h-10 w-10 bg-cosmic-700/50 rounded-lg mb-3" />
          <div className="h-5 bg-cosmic-700/50 rounded w-3/4 mb-2" />
          <div className="h-4 bg-cosmic-700/30 rounded w-full mb-1" />
          <div className="h-4 bg-cosmic-700/30 rounded w-2/3" />
        </div>
      ))}
    </div>
  );
}

async function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function StarSystemsSection() {
  await delay(1000);
  const fetchedAt = new Date().toISOString();

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <span>⭐</span> Star Systems
        </h2>
        <span className="text-xs text-cosmic-500 font-mono">
          Loaded at {new Date(fetchedAt).toLocaleTimeString()}
        </span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {starSystems.map((system) => (
          <div
            key={system.id}
            className="bg-cosmic-800/50 border border-cosmic-700 rounded-xl p-6 hover:border-star-gold/40 transition-colors"
          >
            <span className="text-3xl mb-3 block">{system.emoji}</span>
            <h3 className="text-lg font-bold text-star-white mb-1">{system.name}</h3>
            <p className="text-sm text-cosmic-400 mb-3">{system.type}</p>
            <div className="flex items-center justify-between text-xs text-cosmic-500">
              <span>📏 {system.distance}</span>
              <span>🌍 {system.knownPlanets} planet{system.knownPlanets !== 1 ? "s" : ""}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

async function NebulaeSection() {
  await delay(2500);
  const fetchedAt = new Date().toISOString();

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <span>🌌</span> Nebulae
        </h2>
        <span className="text-xs text-cosmic-500 font-mono">
          Loaded at {new Date(fetchedAt).toLocaleTimeString()}
        </span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {nebulae.map((nebula) => (
          <div
            key={nebula.id}
            className="bg-cosmic-800/50 border border-nebula-purple/20 rounded-xl p-6 hover:border-nebula-purple/50 transition-colors"
          >
            <span className="text-3xl mb-3 block">{nebula.emoji}</span>
            <h3 className="text-lg font-bold text-star-white mb-1">{nebula.name}</h3>
            <p className="text-sm text-cosmic-400 mb-3">{nebula.type}</p>
            <div className="flex items-center justify-between text-xs text-cosmic-500">
              <span>📏 {nebula.distance}</span>
              <span>⭐ {nebula.constellation}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

async function CosmicPhenomenaSection() {
  await delay(4000);
  const fetchedAt = new Date().toISOString();

  const phenomena = [
    {
      id: "black-hole",
      name: "Sagittarius A*",
      type: "Supermassive Black Hole",
      detail: "4.15 million solar masses at the center of our Milky Way",
      emoji: "🕳️",
    },
    {
      id: "magnetar",
      name: "SGR 1806-20",
      type: "Magnetar",
      detail: "Strongest magnetic field ever detected — 10¹⁵ Tesla",
      emoji: "🧲",
    },
    {
      id: "pulsar",
      name: "PSR J1748-2446ad",
      type: "Millisecond Pulsar",
      detail: "Spins 716 times per second — fastest known pulsar",
      emoji: "💫",
    },
    {
      id: "quasar",
      name: "TON 618",
      type: "Quasar",
      detail: "66 billion solar masses — one of the most massive black holes known",
      emoji: "💎",
    },
    {
      id: "grb",
      name: "GRB 221009A",
      type: "Gamma-Ray Burst",
      detail: "The brightest gamma-ray burst ever recorded — the 'BOAT'",
      emoji: "⚡",
    },
    {
      id: "fast-radio-burst",
      name: "FRB 20220912A",
      type: "Fast Radio Burst",
      detail: "Mysterious millisecond radio pulses from billions of light-years away",
      emoji: "📻",
    },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <span>🕳️</span> Cosmic Phenomena
        </h2>
        <span className="text-xs text-cosmic-500 font-mono">
          Loaded at {new Date(fetchedAt).toLocaleTimeString()}
        </span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {phenomena.map((item) => (
          <div
            key={item.id}
            className="bg-cosmic-800/50 border border-mars-red/20 rounded-xl p-6 hover:border-mars-red/40 transition-colors"
          >
            <span className="text-3xl mb-3 block">{item.emoji}</span>
            <h3 className="text-lg font-bold text-star-white mb-1">{item.name}</h3>
            <p className="text-sm text-cosmic-400 mb-2">{item.type}</p>
            <p className="text-xs text-cosmic-300">{item.detail}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function GalaxyMapPage() {
  return (
    <div className="relative z-10 max-w-6xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <span className="text-6xl mb-6 block">🌌</span>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Galaxy{" "}
          <span className="bg-gradient-to-r from-star-gold to-neptune-blue bg-clip-text text-transparent">
            Map
          </span>
        </h1>
        <p className="text-cosmic-400 text-lg max-w-2xl mx-auto">
          Each section loads independently using Streaming with Suspense — watch them appear one by one
        </p>
      </div>

      {/* Streaming Info Banner */}
      <div className="bg-neptune-blue/10 border border-neptune-blue/30 rounded-xl p-4 mb-10 text-center">
        <p className="text-sm text-neptune-blue font-medium">
          🌊 Streaming (Suspense) — Each section is an async Server Component wrapped in a Suspense boundary
        </p>
        <p className="text-xs text-cosmic-500 mt-1">
          Star Systems (~1s) → Nebulae (~2.5s) → Cosmic Phenomena (~4s)
        </p>
      </div>

      <div className="space-y-10">
        {/* Section 1: Star Systems (loads in ~1s) */}
        <Suspense fallback={
          <div>
            <h2 className="text-2xl font-bold flex items-center gap-2 mb-4">
              <span>⭐</span> Star Systems
              <span className="text-sm font-normal text-cosmic-500 animate-pulse">Loading...</span>
            </h2>
            <SectionSkeleton rows={6} />
          </div>
        }>
          <StarSystemsSection />
        </Suspense>

        {/* Section 2: Nebulae (loads in ~2.5s) */}
        <Suspense fallback={
          <div>
            <h2 className="text-2xl font-bold flex items-center gap-2 mb-4">
              <span>🌌</span> Nebulae
              <span className="text-sm font-normal text-cosmic-500 animate-pulse">Loading...</span>
            </h2>
            <SectionSkeleton rows={5} />
          </div>
        }>
          <NebulaeSection />
        </Suspense>

        {/* Section 3: Cosmic Phenomena (loads in ~4s) */}
        <Suspense fallback={
          <div>
            <h2 className="text-2xl font-bold flex items-center gap-2 mb-4">
              <span>🕳️</span> Cosmic Phenomena
              <span className="text-sm font-normal text-cosmic-500 animate-pulse">Loading...</span>
            </h2>
            <SectionSkeleton rows={6} />
          </div>
        }>
          <CosmicPhenomenaSection />
        </Suspense>
      </div>

      {/* Footer badge */}
      <div className="mt-12 text-center text-xs text-cosmic-500">
        🌊 This page uses Streaming — each section is independently streamed via Suspense boundaries
      </div>
    </div>
  );
}
