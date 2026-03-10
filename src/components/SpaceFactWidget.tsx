"use client";

import { useState, useCallback } from "react";

interface FactResponse {
  fact: string;
  index: number;
  total: number;
  timestamp: string;
}

export default function SpaceFactWidget() {
  const [data, setData] = useState<FactResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchFact = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/space-facts");
      if (!res.ok) throw new Error("Failed to fetch");
      const json: FactResponse = await res.json();
      setData(json);
    } catch {
      setError("Failed to fetch space fact. Try again!");
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <div className="bg-gradient-to-r from-nebula-purple/10 to-neptune-blue/10 border border-nebula-purple/30 rounded-xl p-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <span>✨</span> Random Space Fact
        </h2>
        <span className="text-xs bg-cosmic-700 px-3 py-1 rounded-full text-cosmic-300">
          Client Component → API Route
        </span>
      </div>

      <div className="min-h-[80px] flex items-center justify-center mb-4">
        {loading ? (
          <div className="flex items-center gap-2 text-cosmic-400">
            <span className="animate-spin text-lg">🌀</span>
            <span>Contacting deep space...</span>
          </div>
        ) : error ? (
          <p className="text-mars-red">{error}</p>
        ) : data ? (
          <div className="text-center">
            <p className="text-lg text-cosmic-100 leading-relaxed">
              &ldquo;{data.fact}&rdquo;
            </p>
            <p className="text-xs text-cosmic-500 mt-3 font-mono">
              Fact #{data.index + 1} of {data.total} · Fetched at{" "}
              {new Date(data.timestamp).toLocaleTimeString()}
            </p>
          </div>
        ) : (
          <p className="text-cosmic-400">
            Click the button to fetch a random space fact from the API
          </p>
        )}
      </div>

      <div className="text-center">
        <button
          onClick={fetchFact}
          disabled={loading}
          className="px-6 py-3 bg-gradient-to-r from-nebula-purple to-cosmic-500 rounded-full font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 text-white cursor-pointer disabled:cursor-not-allowed"
        >
          {loading ? "Fetching..." : data ? "Get Another Fact" : "Get a Space Fact"}
        </button>
      </div>
    </div>
  );
}
