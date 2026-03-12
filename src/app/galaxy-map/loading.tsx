export default function GalaxyMapLoading() {
  return (
    <div className="relative z-10 max-w-6xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <div className="text-6xl mb-6 block animate-pulse">🌌</div>
        <div className="h-12 bg-cosmic-800/50 rounded-lg w-80 mx-auto mb-4 animate-pulse" />
        <div className="h-6 bg-cosmic-800/30 rounded w-96 mx-auto animate-pulse" />
      </div>

      {/* Streaming info skeleton */}
      <div className="h-14 bg-cosmic-800/30 border border-cosmic-700 rounded-xl mb-10 animate-pulse" />

      {/* Grid skeletons */}
      <div className="space-y-10">
        {[1, 2, 3].map((section) => (
          <div key={section}>
            <div className="h-8 bg-cosmic-800/50 rounded w-48 mb-4 animate-pulse" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[1, 2, 3].map((card) => (
                <div
                  key={card}
                  className="bg-cosmic-800/30 border border-cosmic-700 rounded-xl p-6 animate-pulse"
                >
                  <div className="h-10 w-10 bg-cosmic-700/50 rounded-lg mb-3" />
                  <div className="h-5 bg-cosmic-700/50 rounded w-3/4 mb-2" />
                  <div className="h-4 bg-cosmic-700/30 rounded w-full mb-1" />
                  <div className="h-4 bg-cosmic-700/30 rounded w-2/3" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
