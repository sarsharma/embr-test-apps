import type { Metadata } from "next";
import SpaceFactWidget from "@/components/SpaceFactWidget";

export const metadata: Metadata = {
  title: "Dashboard — Cosmic Explorer",
  description: "Live space data dashboard",
};

// Force dynamic rendering — fresh data on every request
export const dynamic = "force-dynamic";

interface Asteroid {
  id: string;
  name: string;
  diameter_km: number;
  velocity_kms: number;
  distance_km: number;
  hazardous: boolean;
  close_approach: string;
}

interface AsteroidData {
  generated_at: string;
  count: number;
  hazardous_count: number;
  asteroids: Asteroid[];
}

async function getAsteroidData(): Promise<AsteroidData> {
  // Server-side data generation (simulating a DB or external API call)
  const names = [
    "Apophis", "Bennu", "Didymos", "Ryugu", "Itokawa",
    "Eros", "Vesta", "Ceres", "Pallas", "Hygiea",
    "Psyche", "Juno", "Iris", "Flora", "Metis",
  ];

  const count = 5 + Math.floor(Math.random() * 6);
  const used = new Set<number>();

  const asteroids: Asteroid[] = Array.from({ length: count }, (_, i) => {
    let idx: number;
    do {
      idx = Math.floor(Math.random() * names.length);
    } while (used.has(idx));
    used.add(idx);

    const daysFromNow = Math.floor(Math.random() * 30) + 1;
    const approachDate = new Date();
    approachDate.setDate(approachDate.getDate() + daysFromNow);

    return {
      id: `NEO-${2024000 + idx}`,
      name: names[idx],
      diameter_km: Math.round((Math.random() * 2 + 0.01) * 100) / 100,
      velocity_kms: Math.round((Math.random() * 30 + 5) * 100) / 100,
      distance_km: Math.round(Math.random() * 50000000 + 100000),
      hazardous: Math.random() > 0.7,
      close_approach: approachDate.toISOString().split("T")[0],
    };
  });

  const hazardousCount = asteroids.filter((a) => a.hazardous).length;

  return {
    generated_at: new Date().toISOString(),
    count: asteroids.length,
    hazardous_count: hazardousCount,
    asteroids,
  };
}

export default async function DashboardPage() {
  const data = await getAsteroidData();

  return (
    <div className="relative z-10 max-w-6xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <span className="text-6xl mb-6 block">📡</span>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Live Space Dashboard
        </h1>
        <p className="text-cosmic-400 text-lg">
          Server-rendered on every request — data is always fresh
        </p>
        <p className="text-xs text-cosmic-500 mt-2 font-mono">
          Generated: {new Date(data.generated_at).toLocaleString()}
        </p>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-cosmic-800/50 border border-cosmic-700 rounded-xl p-6 text-center">
          <div className="text-4xl font-bold text-star-white">{data.count}</div>
          <div className="text-sm text-cosmic-400 mt-1">Near-Earth Objects Tracked</div>
        </div>
        <div className="bg-cosmic-800/50 border border-mars-red/30 rounded-xl p-6 text-center">
          <div className="text-4xl font-bold text-mars-red">{data.hazardous_count}</div>
          <div className="text-sm text-cosmic-400 mt-1">Potentially Hazardous</div>
        </div>
        <div className="bg-cosmic-800/50 border border-cosmic-700 rounded-xl p-6 text-center">
          <div className="text-4xl font-bold text-neptune-blue">
            {Math.min(...data.asteroids.map((a) => a.distance_km)).toLocaleString()}
          </div>
          <div className="text-sm text-cosmic-400 mt-1">Closest Approach (km)</div>
        </div>
      </div>

      {/* Asteroid Table */}
      <div className="bg-cosmic-800/50 border border-cosmic-700 rounded-xl overflow-hidden mb-12">
        <div className="p-6 border-b border-cosmic-700">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <span>☄️</span> Near-Earth Asteroid Tracker
          </h2>
          <p className="text-sm text-cosmic-400 mt-1">
            Simulated data — refreshes on every page load (SSR)
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-cosmic-700 bg-cosmic-800/80">
                <th className="text-left p-4 font-semibold text-cosmic-300">ID</th>
                <th className="text-left p-4 font-semibold text-cosmic-300">Name</th>
                <th className="text-right p-4 font-semibold text-cosmic-300">Diameter (km)</th>
                <th className="text-right p-4 font-semibold text-cosmic-300">Velocity (km/s)</th>
                <th className="text-right p-4 font-semibold text-cosmic-300">Distance (km)</th>
                <th className="text-center p-4 font-semibold text-cosmic-300">Hazardous</th>
                <th className="text-right p-4 font-semibold text-cosmic-300">Close Approach</th>
              </tr>
            </thead>
            <tbody>
              {data.asteroids.map((asteroid) => (
                <tr
                  key={asteroid.id}
                  className={`border-b border-cosmic-700/50 hover:bg-cosmic-700/30 transition-colors ${
                    asteroid.hazardous ? "bg-mars-red/5" : ""
                  }`}
                >
                  <td className="p-4 font-mono text-cosmic-400">{asteroid.id}</td>
                  <td className="p-4 font-medium text-star-white">{asteroid.name}</td>
                  <td className="p-4 text-right text-cosmic-200">{asteroid.diameter_km}</td>
                  <td className="p-4 text-right text-cosmic-200">{asteroid.velocity_kms}</td>
                  <td className="p-4 text-right text-cosmic-200 font-mono">
                    {asteroid.distance_km.toLocaleString()}
                  </td>
                  <td className="p-4 text-center">
                    {asteroid.hazardous ? (
                      <span className="px-2 py-1 bg-mars-red/20 text-mars-red border border-mars-red/30 rounded-full text-xs font-medium">
                        ⚠️ YES
                      </span>
                    ) : (
                      <span className="px-2 py-1 bg-green-500/10 text-green-400 border border-green-500/30 rounded-full text-xs font-medium">
                        ✓ No
                      </span>
                    )}
                  </td>
                  <td className="p-4 text-right text-cosmic-300">{asteroid.close_approach}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Space Fact Widget (Client Component) */}
      <SpaceFactWidget />

      {/* Dynamic badge */}
      <div className="mt-12 text-center text-xs text-cosmic-500">
        ⚡ This page is dynamically server-rendered on every request (force-dynamic)
      </div>
    </div>
  );
}
