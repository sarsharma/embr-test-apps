import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { missions } from "@/lib/data";

// ISR: Revalidate individual mission pages every 30 seconds
export const revalidate = 30;

// Allow on-demand generation for unknown IDs
export const dynamicParams = true;

export async function generateStaticParams() {
  return missions.map((mission) => ({ id: mission.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const mission = missions.find((m) => m.id === id);
  if (!mission) return { title: "Mission Not Found" };
  return {
    title: `${mission.name} — Cosmic Explorer`,
    description: mission.description,
  };
}

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

export default async function MissionDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const mission = missions.find((m) => m.id === id);

  if (!mission) notFound();

  const missionIndex = missions.findIndex((m) => m.id === id);
  const prevMission = missionIndex > 0 ? missions[missionIndex - 1] : null;
  const nextMission = missionIndex < missions.length - 1 ? missions[missionIndex + 1] : null;
  const generatedAt = new Date().toISOString();

  return (
    <div className="relative z-10 max-w-4xl mx-auto px-4 py-16">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-cosmic-400 mb-8">
        <Link href="/" className="hover:text-star-white transition-colors">Home</Link>
        <span>/</span>
        <Link href="/missions" className="hover:text-star-white transition-colors">Missions</Link>
        <span>/</span>
        <span className="text-star-white">{mission.name}</span>
      </nav>

      {/* ISR Info Banner */}
      <div className="bg-nebula-purple/10 border border-nebula-purple/30 rounded-lg p-3 mb-8 text-center">
        <p className="text-xs text-nebula-purple font-medium">
          ⏱️ ISR — Revalidates every 30s · Generated: {new Date(generatedAt).toLocaleString()}
        </p>
      </div>

      {/* Mission Header */}
      <div className="text-center mb-12">
        <span className="text-7xl mb-6 block animate-float">{mission.emoji}</span>
        <div className="mb-4">
          <span
            className={`px-3 py-1.5 rounded-full text-sm font-medium border ${statusColors[mission.status]}`}
          >
            {statusIcons[mission.status]} {mission.status.toUpperCase()}
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-3">{mission.name}</h1>
        <p className="text-cosmic-400 text-lg">{mission.agency} · {mission.type}</p>
      </div>

      {/* Info Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
        <div className="bg-cosmic-800/50 border border-cosmic-700 rounded-xl p-5 text-center">
          <div className="text-sm text-cosmic-400 mb-1">Launch Date</div>
          <div className="text-lg font-bold text-star-white">{mission.launchDate}</div>
        </div>
        <div className="bg-cosmic-800/50 border border-cosmic-700 rounded-xl p-5 text-center">
          <div className="text-sm text-cosmic-400 mb-1">Destination</div>
          <div className="text-lg font-bold text-neptune-blue">{mission.destination}</div>
        </div>
        <div className="bg-cosmic-800/50 border border-cosmic-700 rounded-xl p-5 text-center">
          <div className="text-sm text-cosmic-400 mb-1">Mission Type</div>
          <div className="text-lg font-bold text-nebula-purple">{mission.type}</div>
        </div>
      </div>

      {/* Description */}
      <div className="bg-cosmic-800/50 border border-cosmic-700 rounded-xl p-8 mb-8">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <span>📋</span> Mission Overview
        </h2>
        <p className="text-cosmic-200 leading-relaxed text-lg">{mission.description}</p>
      </div>

      {/* Highlight */}
      <div className="bg-gradient-to-r from-nebula-purple/10 to-neptune-blue/10 border border-nebula-purple/30 rounded-xl p-8 mb-8">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <span>✨</span> Mission Highlight
        </h2>
        <p className="text-cosmic-200 leading-relaxed text-lg italic">
          &quot;{mission.highlight}&quot;
        </p>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between mt-12">
        {prevMission ? (
          <Link
            href={`/missions/${prevMission.id}`}
            className="flex items-center gap-2 text-cosmic-400 hover:text-star-white transition-colors"
          >
            <span>←</span>
            <span>
              <span className="text-xs block text-cosmic-500">Previous</span>
              {prevMission.name}
            </span>
          </Link>
        ) : (
          <div />
        )}
        {nextMission ? (
          <Link
            href={`/missions/${nextMission.id}`}
            className="flex items-center gap-2 text-cosmic-400 hover:text-star-white transition-colors text-right"
          >
            <span>
              <span className="text-xs block text-cosmic-500">Next</span>
              {nextMission.name}
            </span>
            <span>→</span>
          </Link>
        ) : (
          <div />
        )}
      </div>

      <div className="mt-12 text-center text-xs text-cosmic-500">
        ⏱️ ISR page — revalidates every 30 seconds · dynamicParams enabled
      </div>
    </div>
  );
}
