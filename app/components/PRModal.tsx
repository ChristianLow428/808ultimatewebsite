// app/components/PRModal.tsx
"use client";

import { useEffect, useState } from "react";

interface PlayerRanking {
  rank: number;
  name: string;
}

interface PRModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PRModal({ isOpen, onClose }: PRModalProps) {
  const [rankings, setRankings] = useState<PlayerRanking[]>([]);

  useEffect(() => {
    if (!isOpen) return;
    
    async function fetchPR() {
      try {
        const res = await fetch("/api/rankings");
        if (res.ok) {
          const data = await res.json();
          setRankings(data);
        }
      } catch (err) {
        console.error("Error loading modal rankings:", err);
      }
    }
    fetchPR();
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      {/* Backdrop click close */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal Card Box */}
      <div className="relative w-full max-w-md bg-zinc-950 border border-zinc-900 rounded-2xl overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header Header */}
        <div className="p-6 border-b border-zinc-900 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-black tracking-wider text-red-500 uppercase font-mono">
              Hawaii Power Rankings
            </h2>
            <p className="text-[11px] text-zinc-500 font-semibold uppercase tracking-wider mt-0.5">
              Official League Standings
            </p>
          </div>
          <button 
            onClick={onClose}
            className="text-zinc-500 hover:text-white text-xs uppercase font-bold tracking-widest bg-zinc-900 px-2.5 py-1 rounded-lg border border-zinc-800 transition active:scale-95"
          >
            Close
          </button>
        </div>

        {/* Standings Content List */}
        <div className="p-4 max-h-[60vh] overflow-y-auto no-scrollbar flex flex-col gap-2">
          {rankings.length === 0 ? (
            <div className="text-center py-8 text-xs text-zinc-500 font-medium">
              Loading league entries...
            </div>
          ) : (
            rankings.map((player) => (
              <div 
                key={player.rank}
                className="flex items-center justify-between p-3 bg-zinc-900/40 border border-zinc-900 rounded-xl hover:border-zinc-800 transition-colors"
              >
                <div className="flex items-center gap-3">
                  {/* Numerical Rank Plaque */}
                  <span className={`w-6 h-6 rounded-md flex items-center justify-center font-black text-xs font-mono shadow-inner ${
                    player.rank === 1 ? "bg-amber-500 text-zinc-950" : 
                    player.rank === 2 ? "bg-zinc-300 text-zinc-950" :
                    player.rank === 3 ? "bg-amber-700 text-white" : "bg-zinc-800 text-zinc-400"
                  }`}>
                    #{player.rank}
                  </span>
                  
                  {/* Competitor Name */}
                  <span className="text-sm font-bold text-zinc-200 tracking-wide">
                    {player.name}
                  </span>
                </div>

                <div className="text-[10px] uppercase tracking-widest font-bold text-zinc-600 font-mono">
                  Active Verified
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}