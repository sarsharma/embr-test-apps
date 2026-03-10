import Link from "next/link";
import { planets, spaceFacts } from "@/lib/data";

// This page is statically generated at build time
export default function Home() {
  const featuredPlanets = planets.slice(0, 4);
  const featuredFact = spaceFacts[0];

  return (
    <div className="relative z-10">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4">
        <div className="float-animation mb-8">
          <span className="text-8xl">🚀</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-nebula-purple via-neptune-blue to-star-gold bg-clip-text text-transparent">
          Cosmic Explorer
        </h1>
        <p className="text-xl md:text-2xl text-cosmic-300 max-w-2xl mb-8">
          Journey through the solar system. Discover planets, track asteroids,
          and uncover the mysteries of space.
        </p>
        <div className="flex gap-4 flex-wrap justify-center">
          <Link
            href="/planets"
            className="px-8 py-3 bg-gradient-to-r from-nebula-purple to-cosmic-500 rounded-full font-semibold hover:opacity-90 transition-opacity text-white"
          >
            Explore Planets
          </Link>
          <Link
            href="/dashboard"
            className="px-8 py-3 border border-cosmic-500 rounded-full font-semibold hover:bg-cosmic-800 transition-colors"
          >
            Live Dashboard
          </Link>
        </div>
      </section>

      {/* Space Fact Banner */}
      <section className="max-w-4xl mx-auto px-4 mb-16">
        <div className="bg-cosmic-800/60 backdrop-blur-sm border border-cosmic-700 rounded-xl p-6 text-center">
          <p className="text-star-gold text-sm font-semibold mb-2">✨ DID YOU KNOW?</p>
          <p className="text-lg text-cosmic-200">{featuredFact}</p>
        </div>
      </section>

      {/* Featured Planets Grid */}
      <section className="max-w-6xl mx-auto px-4 mb-16">
        <h2 className="text-3xl font-bold text-center mb-2">Featured Planets</h2>
        <p className="text-cosmic-400 text-center mb-10">Statically generated at build time</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredPlanets.map((planet) => (
            <Link
              key={planet.id}
              href={`/planets/${planet.id}`}
              className="glow-card group bg-cosmic-800/50 backdrop-blur-sm border border-cosmic-700 rounded-xl p-6 hover:border-nebula-purple/50 transition-all duration-300"
            >
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                {planet.emoji}
              </div>
              <h3 className="text-xl font-bold mb-1">{planet.name}</h3>
              <p className="text-sm text-cosmic-400 mb-3">{planet.type}</p>
              <p className="text-sm text-cosmic-300 line-clamp-2">
                {planet.description}
              </p>
            </Link>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link
            href="/planets"
            className="text-neptune-blue hover:text-cosmic-200 transition-colors font-medium"
          >
            View all 8 planets →
          </Link>
        </div>
      </section>

      {/* Architecture Info */}
      <section className="max-w-4xl mx-auto px-4 mb-16">
        <h2 className="text-3xl font-bold text-center mb-10">Hybrid Architecture</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-cosmic-800/50 border border-cosmic-700 rounded-xl p-6 text-center">
            <div className="text-3xl mb-3">📄</div>
            <h3 className="font-bold text-star-gold mb-2">Static (SSG)</h3>
            <p className="text-sm text-cosmic-400">
              Homepage, About, and Planet pages are pre-rendered at build time for instant loading.
            </p>
          </div>
          <div className="bg-cosmic-800/50 border border-cosmic-700 rounded-xl p-6 text-center">
            <div className="text-3xl mb-3">⚡</div>
            <h3 className="font-bold text-neptune-blue mb-2">Dynamic (SSR)</h3>
            <p className="text-sm text-cosmic-400">
              Dashboard fetches fresh asteroid data on every request from the server.
            </p>
          </div>
          <div className="bg-cosmic-800/50 border border-cosmic-700 rounded-xl p-6 text-center">
            <div className="text-3xl mb-3">🔌</div>
            <h3 className="font-bold text-nebula-pink mb-2">API Routes</h3>
            <p className="text-sm text-cosmic-400">
              Server endpoints return live space facts and asteroid tracking data.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
