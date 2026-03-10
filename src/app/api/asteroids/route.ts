import { NextResponse } from "next/server";

// Dynamic API route — simulates near-earth asteroid tracking data
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

function generateAsteroids(): Asteroid[] {
  const names = [
    "Apophis", "Bennu", "Didymos", "Ryugu", "Itokawa",
    "Eros", "Vesta", "Ceres", "Pallas", "Hygiea",
    "Psyche", "Juno", "Iris", "Flora", "Metis",
  ];

  const count = 5 + Math.floor(Math.random() * 6);
  const used = new Set<number>();

  return Array.from({ length: count }, (_, i) => {
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
}

export async function GET() {
  // Simulate slight server processing delay
  await new Promise((r) => setTimeout(r, 100));

  const asteroids = generateAsteroids();
  const hazardousCount = asteroids.filter((a) => a.hazardous).length;

  return NextResponse.json({
    generated_at: new Date().toISOString(),
    count: asteroids.length,
    hazardous_count: hazardousCount,
    asteroids,
  });
}
