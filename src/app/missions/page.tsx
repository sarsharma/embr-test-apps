import type { Metadata } from "next";
import Link from "next/link";
import { missions } from "@/lib/data";

export const metadata: Metadata = {
  title: "Space Missions — Cosmic Explorer",
  description: "Explore past, present, and future space missions",
};

// ISR: Revalidate this page every 60 seconds
export const revalidate = 60;

const statusColors: Record<string, string> = {
  active: "bg-green-500/20 text-green-400 border-green-500/30",
  completed: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  upcoming: "bg-star-gold/20 text-star-gold border-star-gold/30",
  lost: "bg-mars-red/20 text-mars-red border-mars-red/30",
};

const statusIcons: Record<string, string> = {
  active: "🟢",
  completed: "✅",
  upcoming: "🔜",
  lost: "💔",
};

async function getMissionsData() {
  // Simulate an external data fetch with dynamic timestamps
  const now = new Date();
  return {
    missions,
    fetchedAt: now.toISOString(),
    nextRevalidation: new Date(now.getTime() + 60 * 1000).toISOString(),
  };
}

export default async function MissionsPage() {
  const data = await getMissionsData();

  const activeMissions = data.missions.filter((m) => m.status === "active");
  const completedMissions = data.missions.filter((m) => m.status === "completed");
  const upcomingMissions = data.missions.filter((m) => m.status === "upcoming");

  return (
    <div className="relative z-10 max-w-6xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <span className="text-6xl mb-6 block">🚀</span>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Space{" "}
          <span className="bg-gradient-to-r from-nebula-purple to-nebula-pink bg-clip-text text-transparent">
            Missions
          </span>
        </h1>
        <p className="text-cosmic-400 text-lg max-w-2xl mx-auto">
          Humanity&apos;s greatest voyages beyond Earth — from active explorers to
          future expeditions
        </p>
      </div>

      {/* ISR Info Banner */}
      <div className="bg-nebula-purple/10 border border-nebula-purple/30 rounded-xl p-4 mb-10 text-center">
        <p className="text-sm text-nebula-purple font-medium">
          ⏱️ ISR (Incremental Static Regeneration) — This page is statically generated and revalidates every 60 seconds
        </p>
        <p className="text-xs text-cosmic-500 font-mono mt-1">
          Generated at: {new Date(data.fetchedAt).toLocaleString()}
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        <div className="bg-cosmic-800/50 border border-cosmic-700 rounded-xl p-4 text-center">
          <div className="text-3xl font-bold text-star-white">{data.missions.length}</div>
          <div className="text-sm text-cosmic-400">Total Missions</div>
        </div>
        <div className="bg-cosmic-800/50 border border-green-500/20 rounded-xl p-4 text-center">
          <div className="text-3xl font-bold text-green-400">{activeMissions.length}</div>
          <div className="text-sm text-cosmic-400">Active</div>
        </div>
        <div className="bg-cosmic-800/50 border border-blue-500/20 rounded-xl p-4 text-center">
          <div className="text-3xl font-bold text-blue-400">{completedMissions.length}</div>
          <div className="text-sm text-cosmic-400">Completed</div>
        </div>
        <div className="bg-cosmic-800/50 border border-star-gold/20 rounded-xl p-4 text-center">
          <div className="text-3xl font-bold text-star-gold">{upcomingMissions.length}</div>
          <div className="text-sm text-cosmic-400">Upcoming</div>
        </div>
      </div>

      {/* Missions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {data.missions.map((mission) => (
          <Link
            key={mission.id}
            href={`/missions/${mission.id}`}
            className="group bg-cosmic-800/50 border border-cosmic-700 rounded-xl p-6 hover:border-nebula-purple/50 hover:bg-cosmic-800/80 transition-all duration-300"
          >
            <div className="flex items-start justify-between mb-3">
              <span className="text-4xl">{mission.emoji}</span>
              <span
                className={`px-2.5 py-1 rounded-full text-xs font-medium border ${statusColors[mission.status]}`}
              >
                {statusIcons[mission.status]} {mission.status.toUpperCase()}
              </span>
            </div>
            <h3 className="text-xl font-bold text-star-white mb-1 group-hover:text-nebula-purple transition-colors">
              {mission.name}
            </h3>
            <p className="text-sm text-cosmic-400 mb-3">
              {mission.agency} · {mission.type}
            </p>
            <p className="text-cosmic-300 text-sm leading-relaxed line-clamp-2">
              {mission.description}
            </p>
            <div className="mt-4 flex items-center justify-between text-xs text-cosmic-500">
              <span>🎯 {mission.destination}</span>
              <span>📅 {mission.launchDate}</span>
            </div>
          </Link>
        ))}
      </div>

      {/* Footer badge */}
      <div className="mt-12 text-center text-xs text-cosmic-500">
        ⏱️ This page uses ISR — statically generated, revalidates every 60 seconds
      </div>
    </div>
  );
}
