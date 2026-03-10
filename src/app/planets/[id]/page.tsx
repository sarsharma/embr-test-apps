import { notFound } from "next/navigation";
import Link from "next/link";
import { planets } from "@/lib/data";
import type { Metadata } from "next";

// Statically generate all planet pages at build time
export async function generateStaticParams() {
  return planets.map((planet) => ({
    id: planet.id,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const planet = planets.find((p) => p.id === id);
  if (!planet) return { title: "Planet Not Found" };
  return {
    title: `${planet.name} — Cosmic Explorer`,
    description: planet.description,
  };
}

export default async function PlanetPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const planet = planets.find((p) => p.id === id);

  if (!planet) {
    notFound();
  }

  const planetIndex = planets.findIndex((p) => p.id === id);
  const prevPlanet = planetIndex > 0 ? planets[planetIndex - 1] : null;
  const nextPlanet =
    planetIndex < planets.length - 1 ? planets[planetIndex + 1] : null;

  return (
    <div className="relative z-10 max-w-4xl mx-auto px-4 py-16">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-cosmic-400 mb-8">
        <Link href="/planets" className="hover:text-cosmic-200 transition-colors">
          Planets
        </Link>
        <span>/</span>
        <span className="text-cosmic-200">{planet.name}</span>
      </div>

      {/* Header */}
      <div className="text-center mb-12">
        <div className="text-8xl mb-6 float-animation">{planet.emoji}</div>
        <h1 className="text-5xl md:text-6xl font-bold mb-2">{planet.name}</h1>
        <p className="text-nebula-purple font-medium text-lg">{planet.type}</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        {[
          { label: "Distance from Sun", value: planet.distanceFromSun, icon: "☀️" },
          { label: "Diameter", value: planet.diameter, icon: "📏" },
          { label: "Moons", value: planet.moons.toString(), icon: "🌙" },
          { label: "Orbital Period", value: planet.orbitalPeriod, icon: "⏱️" },
        ].map((stat) => (
          <div
            key={stat.label}
            className="bg-cosmic-800/50 border border-cosmic-700 rounded-xl p-4 text-center"
          >
            <div className="text-2xl mb-1">{stat.icon}</div>
            <div className="text-sm font-bold text-cosmic-200">{stat.value}</div>
            <div className="text-xs text-cosmic-500">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Description */}
      <div className="bg-cosmic-800/50 border border-cosmic-700 rounded-xl p-8 mb-8">
        <h2 className="text-2xl font-bold mb-4">About {planet.name}</h2>
        <p className="text-cosmic-200 leading-relaxed text-lg">
          {planet.description}
        </p>
      </div>

      {/* Fun Fact */}
      <div className="bg-gradient-to-r from-nebula-purple/20 to-neptune-blue/20 border border-nebula-purple/30 rounded-xl p-8 mb-12">
        <h3 className="text-star-gold font-bold mb-2">🤓 Fun Fact</h3>
        <p className="text-cosmic-100 text-lg">{planet.funFact}</p>
      </div>

      {/* Temperature */}
      <div className="bg-cosmic-800/50 border border-cosmic-700 rounded-xl p-6 mb-12 text-center">
        <span className="text-2xl mr-2">🌡️</span>
        <span className="text-cosmic-300">Surface Temperature: </span>
        <span className="font-bold text-star-white">{planet.temperature}</span>
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center pt-8 border-t border-cosmic-700">
        {prevPlanet ? (
          <Link
            href={`/planets/${prevPlanet.id}`}
            className="flex items-center gap-2 text-cosmic-400 hover:text-cosmic-200 transition-colors"
          >
            <span>←</span>
            <span>
              {prevPlanet.emoji} {prevPlanet.name}
            </span>
          </Link>
        ) : (
          <div />
        )}
        {nextPlanet ? (
          <Link
            href={`/planets/${nextPlanet.id}`}
            className="flex items-center gap-2 text-cosmic-400 hover:text-cosmic-200 transition-colors"
          >
            <span>
              {nextPlanet.emoji} {nextPlanet.name}
            </span>
            <span>→</span>
          </Link>
        ) : (
          <div />
        )}
      </div>

      {/* Static badge */}
      <div className="mt-12 text-center text-xs text-cosmic-500">
        📄 This page was statically generated at build time via generateStaticParams
      </div>
    </div>
  );
}
