// app/api/rankings/route.ts
import { NextResponse } from "next/server";

// --- EDIT YOUR TOP PLAYERS DIRECTLY HERE ---
const localPowerRankings = [
  { rank: 1, name: "Smallleft" },
  { rank: 2, name: "Yasumon" },
  { rank: 3, name: "Vanguard" },
  { rank: 4, name: "Wooo" },
  { rank: 5, name: "daze" },
  { rank: 6, name: "BBW" },
  { rank: 7, name: "Just" },
  { rank: 8, name: "Daqupel" },
  { rank: 9, name: "TheeWeston" },
  { rank: 10, name: "Schlime" },
];

export async function GET() {
  try {
    // Sorts them automatically by rank number before serving to the ticker
    const sortedRankings = [...localPowerRankings].sort((a, b) => a.rank - b.rank);
    return NextResponse.json(sortedRankings);
  } catch (error) {
    return NextResponse.json({ error: "Failed to load PR data" }, { status: 500 });
  }
}