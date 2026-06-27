// app/components/RankingTicker.tsx

const mockPR = [
    { rank: 1, name: "PlayerOne" },
    { rank: 2, name: "PlayerTwo" },
    { rank: 3, name: "PlayerThree" },
    { rank: 4, name: "PlayerFour" },
    { rank: 5, name: "PlayerFive" },
    { rank: 6, name: "PlayerSix" },
    { rank: 7, name: "PlayerSeven" },
    { rank: 8, name: "PlayerEight" },
    { rank: 9, name: "PlayerNine" },
    { rank: 10, name: "PlayerTen" },
  ];
  
  export default function RankingTicker() {
    // Double the array to ensure a seamless infinite scrolling loop layout
    const duplicatedPR = [...mockPR, ...mockPR];
  
    return (
      <div className="w-full bg-zinc-900 border-b border-zinc-800/60 overflow-hidden py-3 flex items-center relative select-none z-20">
        
        {/* Side gradient masks to fade the edges beautifully */}
        <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-zinc-950 to-transparent z-30 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-zinc-950 to-transparent z-30 pointer-events-none" />
  
        {/* Moving track container */}
        <div className="flex whitespace-nowrap gap-6 animate-marquee hover:[animation-play-state:paused] cursor-pointer">
          {duplicatedPR.map((player, index) => (
            <div 
              key={`${player.rank}-${index}`} 
              className="flex items-center gap-3 bg-zinc-950/80 border border-zinc-800 rounded-xl pl-2 pr-4 py-1.5 text-xs font-semibold shrink-0 shadow-md"
            >
              {/* Rank Number Badge */}
              <span className="bg-red-600 text-white w-5 h-5 rounded-md flex items-center justify-center font-black text-[10px] tracking-tighter">
                #{player.rank}
              </span>
              
              {/* Fallback controller-icon profile placeholder */}
              <div className="w-5 h-5 rounded bg-zinc-800 flex items-center justify-center text-[10px] text-zinc-400 font-bold border border-zinc-700/50">
                🎮
              </div>
  
              {/* Player Tag Name */}
              <span className="text-zinc-200 tracking-wide font-bold">{player.name}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }