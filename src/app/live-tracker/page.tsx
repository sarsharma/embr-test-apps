"use client";

import { useState, useEffect, useCallback } from "react";

interface Asteroid {
  id: string;
  name: string;
  diameter_km: number;
  velocity_kms: number;
  distance_km: number;
  hazardous: boolean;
  close_approach: string;
}

interface AsteroidResponse {
  generated_at: string;
  count: number;
  hazardous_count: number;
  asteroids: Asteroid[];
}

// This entire page is Client-Side Rendered (CSR) — no server rendering at all
export default function LiveTrackerPage() {
  const [data, setData] = useState<AsteroidResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [refreshInterval, setRefreshInterval] = useState(10);
  const [countdown, setCountdown] = useState(10);
  const [fetchCount, setFetchCount] = useState(0);
  const [lastFetchDuration, setLastFetchDuration] = useState<number | null>(null);

  const fetchData = useCallback(async () => {
    const start = performance.now();
    try {
      setLoading(true);
      const res = await fetch("/api/asteroids", { cache: "no-store" });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      setData(json);
      setError(null);
      setFetchCount((prev) => prev + 1);
      setLastFetchDuration(Math.round(performance.now() - start));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial fetch
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Auto-refresh with countdown
  useEffect(() => {
    if (!autoRefresh) return;

    setCountdown(refreshInterval);

    const countdownTimer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          fetchData();
          return refreshInterval;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(countdownTimer);
  }, [autoRefresh, refreshInterval, fetchData]);

  return (
    <div className="relative z-10 max-w-6xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <span className="text-6xl mb-6 block">🛰️</span>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Live{" "}
          <span className="bg-gradient-to-r from-mars-red to-star-gold bg-clip-text text-transparent">
            Tracker
          </span>
        </h1>
        <p className="text-cosmic-400 text-lg">
          Fully client-side rendered — polls the API for real-time asteroid updates
        </p>
      </div>

      {/* CSR Info Banner */}
      <div className="bg-mars-red/10 border border-mars-red/30 rounded-xl p-4 mb-10 text-center">
        <p className="text-sm text-mars-red font-medium">
          🖥️ CSR (Client-Side Rendering) — This page runs entirely in the browser with no server rendering
        </p>
        <p className="text-xs text-cosmic-500 mt-1">
          Data fetched via polling from <code className="text-cosmic-400">/api/asteroids</code>
        </p>
      </div>

      {/* Controls */}
      <div className="bg-cosmic-800/50 border border-cosmic-700 rounded-xl p-6 mb-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <button
              onClick={fetchData}
              disabled={loading}
              className="px-4 py-2 bg-neptune-blue/20 border border-neptune-blue/40 text-neptune-blue rounded-lg hover:bg-neptune-blue/30 transition-colors disabled:opacity-50 text-sm font-medium"
            >
              {loading ? "🔄 Fetching..." : "🔄 Refresh Now"}
            </button>
            <button
              onClick={() => setAutoRefresh(!autoRefresh)}
              className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${
                autoRefresh
                  ? "bg-green-500/20 border-green-500/40 text-green-400"
                  : "bg-cosmic-700/50 border-cosmic-600 text-cosmic-400"
              }`}
            >
              {autoRefresh ? "⏸ Pause Auto-Refresh" : "▶ Resume Auto-Refresh"}
            </button>
          </div>

          <div className="flex items-center gap-3">
            <label className="text-sm text-cosmic-400">Interval:</label>
            <select
              value={refreshInterval}
              onChange={(e) => setRefreshInterval(Number(e.target.value))}
              className="bg-cosmic-800 border border-cosmic-600 text-cosmic-200 rounded-lg px-3 py-1.5 text-sm"
            >
              <option value={5}>5s</option>
              <option value={10}>10s</option>
              <option value={30}>30s</option>
              <option value={60}>60s</option>
            </select>
          </div>
        </div>

        {/* Status Bar */}
        <div className="flex flex-wrap items-center gap-6 mt-4 pt-4 border-t border-cosmic-700 text-xs text-cosmic-500">
          <span>
            Status:{" "}
            <span className={loading ? "text-star-gold" : error ? "text-mars-red" : "text-green-400"}>
              {loading ? "● Fetching" : error ? "● Error" : "● Connected"}
            </span>
          </span>
          <span>Fetches: <span className="text-cosmic-300">{fetchCount}</span></span>
          {lastFetchDuration !== null && (
            <span>Latency: <span className="text-cosmic-300">{lastFetchDuration}ms</span></span>
          )}
          {autoRefresh && (
            <span>
              Next refresh:{" "}
              <span className="text-neptune-blue font-mono">{countdown}s</span>
            </span>
          )}
        </div>

        {/* Countdown Progress Bar */}
        {autoRefresh && (
          <div className="mt-3 h-1 bg-cosmic-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-neptune-blue to-nebula-purple transition-all duration-1000 ease-linear rounded-full"
              style={{ width: `${((refreshInterval - countdown) / refreshInterval) * 100}%` }}
            />
          </div>
        )}
      </div>

      {/* Error State */}
      {error && (
        <div className="bg-mars-red/10 border border-mars-red/30 rounded-xl p-6 mb-8 text-center">
          <span className="text-2xl mb-2 block">⚠️</span>
          <p className="text-mars-red font-medium">Connection Error</p>
          <p className="text-sm text-cosmic-400 mt-1">{error}</p>
        </div>
      )}

      {/* Data Display */}
      {data && (
        <>
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-cosmic-800/50 border border-cosmic-700 rounded-xl p-4 text-center">
              <div className="text-3xl font-bold text-star-white">{data.count}</div>
              <div className="text-xs text-cosmic-400 mt-1">Objects Tracked</div>
            </div>
            <div className="bg-cosmic-800/50 border border-mars-red/30 rounded-xl p-4 text-center">
              <div className="text-3xl font-bold text-mars-red">{data.hazardous_count}</div>
              <div className="text-xs text-cosmic-400 mt-1">Hazardous</div>
            </div>
            <div className="bg-cosmic-800/50 border border-cosmic-700 rounded-xl p-4 text-center">
              <div className="text-3xl font-bold text-neptune-blue">
                {Math.max(...data.asteroids.map((a) => a.velocity_kms)).toFixed(1)}
              </div>
              <div className="text-xs text-cosmic-400 mt-1">Max Velocity (km/s)</div>
            </div>
            <div className="bg-cosmic-800/50 border border-cosmic-700 rounded-xl p-4 text-center">
              <div className="text-3xl font-bold text-star-gold font-mono">
                {new Date(data.generated_at).toLocaleTimeString()}
              </div>
              <div className="text-xs text-cosmic-400 mt-1">Data Timestamp</div>
            </div>
          </div>

          {/* Live Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.asteroids.map((asteroid) => (
              <div
                key={asteroid.id}
                className={`bg-cosmic-800/50 border rounded-xl p-5 transition-all duration-300 ${
                  asteroid.hazardous
                    ? "border-mars-red/40 bg-mars-red/5"
                    : "border-cosmic-700 hover:border-cosmic-600"
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-bold text-star-white">{asteroid.name}</h3>
                    <p className="text-xs text-cosmic-500 font-mono">{asteroid.id}</p>
                  </div>
                  {asteroid.hazardous ? (
                    <span className="px-2 py-1 bg-mars-red/20 text-mars-red border border-mars-red/30 rounded-full text-xs font-medium">
                      ⚠️ HAZARDOUS
                    </span>
                  ) : (
                    <span className="px-2 py-1 bg-green-500/10 text-green-400 border border-green-500/30 rounded-full text-xs font-medium">
                      ✓ Safe
                    </span>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-cosmic-500 text-xs">Diameter</span>
                    <p className="text-cosmic-200 font-mono">{asteroid.diameter_km} km</p>
                  </div>
                  <div>
                    <span className="text-cosmic-500 text-xs">Velocity</span>
                    <p className="text-cosmic-200 font-mono">{asteroid.velocity_kms} km/s</p>
                  </div>
                  <div>
                    <span className="text-cosmic-500 text-xs">Distance</span>
                    <p className="text-cosmic-200 font-mono">{asteroid.distance_km.toLocaleString()} km</p>
                  </div>
                  <div>
                    <span className="text-cosmic-500 text-xs">Approach</span>
                    <p className="text-cosmic-200 font-mono">{asteroid.close_approach}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Loading skeleton when no data yet */}
      {!data && loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }, (_, i) => (
            <div key={i} className="bg-cosmic-800/30 border border-cosmic-700 rounded-xl p-5 animate-pulse">
              <div className="h-5 bg-cosmic-700/50 rounded w-1/2 mb-3" />
              <div className="h-4 bg-cosmic-700/30 rounded w-3/4 mb-2" />
              <div className="h-4 bg-cosmic-700/30 rounded w-2/3" />
            </div>
          ))}
        </div>
      )}

      {/* Footer badge */}
      <div className="mt-12 text-center text-xs text-cosmic-500">
        🖥️ This page is 100% Client-Side Rendered — no server HTML, pure browser execution
      </div>
    </div>
  );
}
