// app/api/tournaments/route.ts
import { fetchLocalTournaments } from "../../utils/startgg";
import { NextResponse } from "next/server";

export async function GET() {
  const freshData = await fetchLocalTournaments(15);
  return NextResponse.json(freshData);
}