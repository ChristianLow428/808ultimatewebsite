// app/components/Headliner.tsx
"use client";

import { formatUnixDate } from "../utils/formatDate";

interface TournamentImage {
  url: string;
  type: string;
}

interface Tournament {
  id: string;
  name: string;
  startAt: number;
  city: string;
  url: string;
  numAttendees: number;
  images: TournamentImage[] | null;
}

interface HeadlinerProps {
  featuredTournament: Tournament;
}

export default function Headliner({ featuredTournament }: HeadlinerProps) {
  // 1. Hunt down the official wide banner image from the start.gg images array
  const bannerImage = featuredTournament.images?.find(
    (img) => img.type === "banner"
  )?.url;

  const currentUnixTime = Math.floor(Date.now() / 1000);

  return (
    <div className="relative w-full min-h-[280px] sm:min-h-[340px] rounded-2xl overflow-hidden border border-neutral-900 bg-neutral-950 flex items-end p-6 sm:p-8 group shadow-xl">
      
      {/* 2. Dynamic Background Canvas: Renders start.gg image if available, else standard fallback */}
      {bannerImage ? (
        <>
          <img
            src={bannerImage}
            alt=""
            className="absolute inset-0 w-full h-full object-cover object-center filter saturate-[0.85] brightness-[0.45] transition-transform duration-700 group-hover:scale-105"
          />
          {/* Deep dark gradient overlay to ensure text readability matching m7mad.dev aesthetic */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent z-10" />
        </>
      ) : (
        // Premium minimal blue glow fallback if the tournament has no banner uploaded on start.gg
        <div className="absolute inset-0 bg-gradient-to-tr from-neutral-950 via-neutral-900 to-sky-950/20 z-10" />
      )}

      {/* 3. Text & Info Overlay Content Box */}
      <div className="relative z-20 w-full max-w-3xl space-y-4">
        
        {/* Featured Badge */}
        <div className="flex items-center gap-2">
          <span className="bg-sky-500 text-black px-2.5 py-0.5 rounded-md font-black text-[10px] tracking-widest uppercase font-mono shadow-md animate-pulse">
            FEATURED BRACKET
          </span>
          <span className="bg-neutral-900/90 backdrop-blur-sm text-neutral-400 border border-neutral-800 px-2 py-0.5 rounded-md font-mono text-[10px] whitespace-nowrap">
            👤 {featuredTournament.numAttendees || 0} ATTENDEES
          </span>
        </div>

        {/* Title */}
        <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-white leading-tight">
          {featuredTournament.name}
        </h2>

        {/* Meta Details Row */}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs sm:text-sm text-neutral-400 font-medium">
          <div className="flex items-center gap-1.5">
            <span className="text-sky-400 font-sans">📍</span>
            <span>{featuredTournament.city || "Hawaii, USA"}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-sky-400 font-sans">📅</span>
            <span>{formatUnixDate(featuredTournament.startAt)}</span>
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-2">
          <a
            href={`https://start.gg${featuredTournament.url}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center text-xs bg-white text-black hover:bg-sky-400 hover:text-black px-6 py-3 rounded-xl font-bold tracking-wide transition-all duration-200 active:scale-95 shadow-lg"
          >
            {featuredTournament.startAt >= currentUnixTime ? "Register & Enter Bracket" : "View Final Standings"}
          </a>
        </div>

      </div>
    </div>
  );
}