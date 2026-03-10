import { NextResponse } from "next/server";
import { spaceFacts } from "@/lib/data";

// Dynamic API route — returns a random space fact on every request
export const dynamic = "force-dynamic";

export async function GET() {
  const randomIndex = Math.floor(Math.random() * spaceFacts.length);
  return NextResponse.json({
    fact: spaceFacts[randomIndex],
    index: randomIndex,
    total: spaceFacts.length,
    timestamp: new Date().toISOString(),
  });
}
