// app/components/RankingTicker.tsx
"use client";

import { useEffect, useState } from "react";

interface PlayerRanking {
  rank: number;
  name: string;
}

export default function RankingTicker() {
  const [rankings, setRankings] = useState<PlayerRanking[]>([]);

  // Fetches your manually updated list from the local API route
  useEffect(() => {
    async function fetchLivePR() {
      try {
        const res = await fetch("/api/rankings");
        if (res.ok) {
          const data = await res.json();
          setRankings(data);
        }
      } catch (err) {
        console.error("Error fetching local PR standings stream:", err);
      }
    }
    fetchLivePR();
  }, []);

  // Safe fallback layout if data is loading
  if (rankings.length === 0) {
    return (
      <div className="w-full bg-zinc-900 border-b border-zinc-800/60 py-3 flex items-center justify-center text-xs text-zinc-500 font-medium">
        Loading Hawaii Power Rankings...
      </div>
    );
  }

  // Double the array dynamically to ensure a seamless infinite marquee loop
  const duplicatedPR = [...rankings, ...rankings];

  // Your new return block goes right here:
  return (
    <div className="w-full bg-black border-b border-neutral-900/60 overflow-hidden py-3 flex items-center relative select-none z-20">
      <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-black to-transparent z-30 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-black to-transparent z-30 pointer-events-none" />

      <div className="flex whitespace-nowrap gap-6 animate-marquee hover:[animation-play-state:paused] cursor-pointer">
        {duplicatedPR.map((player, index) => (
          <div 
            key={`${player.rank}-${index}`} 
            className="flex items-center gap-3 bg-neutral-950 border border-neutral-900 rounded-xl px-4 py-1.5 text-xs font-semibold shrink-0 shadow-sm transition-all duration-200 hover:border-sky-500/30 group"
          >
            <span className="text-sky-400 font-mono font-black">
              {String(player.rank).padStart(2, '0')}
            </span>
            <span className="text-neutral-300 tracking-wide font-medium group-hover:text-neutral-100 transition-colors duration-150">
              {player.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}