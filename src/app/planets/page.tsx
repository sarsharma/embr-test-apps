import Link from "next/link";
import { planets } from "@/lib/data";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Planets — Cosmic Explorer",
  description: "Explore all 8 planets of our solar system",
};

// Static page — all planet data is known at build time
export default function PlanetsPage() {
  return (
    <div className="relative z-10 max-w-6xl mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <span className="text-6xl mb-6 block">🪐</span>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          The Solar System
        </h1>
        <p className="text-cosmic-400 text-lg">
          All planet pages are statically generated with{" "}
          <code className="text-neptune-blue bg-cosmic-800 px-2 py-1 rounded text-sm">
            generateStaticParams
          </code>
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {planets.map((planet, index) => (
          <Link
            key={planet.id}
            href={`/planets/${planet.id}`}
            className="glow-card group bg-cosmic-800/50 backdrop-blur-sm border border-cosmic-700 rounded-xl p-6 hover:border-nebula-purple/50 transition-all duration-300 relative overflow-hidden"
          >
            {/* Order number */}
            <div className="absolute top-3 right-3 text-xs font-mono text-cosmic-500">
              #{index + 1}
            </div>

            <div className="text-5xl mb-4 group-hover:scale-125 transition-transform duration-500">
              {planet.emoji}
            </div>
            <h2 className="text-xl font-bold mb-1 text-star-white">
              {planet.name}
            </h2>
            <p className="text-xs font-medium text-nebula-purple mb-3">
              {planet.type}
            </p>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-cosmic-400">
                <span>Distance</span>
                <span className="text-cosmic-200">{planet.distanceFromSun}</span>
              </div>
              <div className="flex justify-between text-cosmic-400">
                <span>Moons</span>
                <span className="text-cosmic-200">{planet.moons}</span>
              </div>
              <div className="flex justify-between text-cosmic-400">
                <span>Temp</span>
                <span className="text-cosmic-200">{planet.temperature}</span>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-cosmic-700">
              <p className="text-xs text-cosmic-400 line-clamp-2">
                {planet.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
