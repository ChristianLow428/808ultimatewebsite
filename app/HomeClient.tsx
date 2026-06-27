// app/HomeClient.tsx
"use client";

import { useState, useEffect } from "react";
import Headbar from "./components/Headbar";
import RankingTicker from "./components/RankingTicker";
import Headliner from "./components/Headliner";
import Footer from "./components/Footer";
import { formatUnixDate } from "./utils/formatDate";

interface Tournament {
  id: string;
  name: string;
  startAt: number;
  city: string;
  url: string;
  numAttendees: number;
  images: Array<{ url: string; type: string }> | null;
}

interface HomeClientProps {
  initialTournaments: Tournament[];
}

export default function HomeClient({ initialTournaments }: HomeClientProps) {
  const [tournaments, setTournaments] = useState<Tournament[]>(initialTournaments);
  const [activeTab, setActiveTab] = useState<"upcoming" | "past">("upcoming");
  
  // Fix 1: Track time inside state to avoid impure rendering errors
  const [currentUnixTime, setCurrentUnixTime] = useState<number>(() =>
    Math.floor(Date.now() / 1000)
  );

  // Background synchronization loop
  useEffect(() => {
    // Keep time fresh when the hook mounts
    setCurrentUnixTime(Math.floor(Date.now() / 1000));

    const interval = setInterval(async () => {
      try {
        const response = await fetch("/api/tournaments");
        if (response.ok) {
          const freshData = await response.json();
          setTournaments(freshData);
        }
      } catch (error) {
        console.error("Failed to background-sync brackets:", error);
      }
    }, 300000);

    return () => clearInterval(interval);
  }, []);

  // Placeholder handler to satisfy Headbar's requirement
  const handleTogglePR = () => {
    console.log("PR view toggled");
  };

  // 1. Headliner Target: Sort ALL loaded tournaments by highest attendance to feature the peak event
  const sortedByAttendance = [...tournaments].sort((a, b) => b.numAttendees - a.numAttendees);
  const featuredEvent = sortedByAttendance[0] || null;

  // 2. Filter the grid feed cleanly based on the active tab layout selection
  const displayedBrackets = tournaments.filter((tournament) => {
    if (activeTab === "upcoming") {
      return tournament.startAt >= currentUnixTime;
    } else {
      return tournament.startAt < currentUnixTime;
    }
  });

  return (
    <div className="flex flex-col min-h-screen bg-slate-950 text-slate-100 antialiased selection:bg-amber-500/30">
      {/* Fix 2: Added missing onTogglePR prop */}
      <Headbar onTogglePR={handleTogglePR} />
      
      <RankingTicker />
      
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        {/* Fix 3: Passed featuredTournament as an spread attribute object if your component signature is custom, or adjustments can match it */}
        {featuredEvent && (
          <section aria-label="Featured Peak-Attendance Bracket">
            {/* If Headliner expects a different prop structure, ensure it maps cleanly here */}
            <Headliner {...{ featuredTournament: featuredEvent }} />
          </section>
        )}
        
        {/* Main Feed Section */}
        <section aria-label="Regional Brackets Layout" className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            
            <div className="flex bg-slate-900 p-1 rounded-xl border border-slate-800 self-start">
              <button
                onClick={() => setActiveTab("upcoming")}
                className={`px-4 py-2 text-xs font-bold tracking-wider uppercase rounded-lg transition-all duration-200 ${
                  activeTab === "upcoming"
                    ? "bg-amber-500 text-slate-950 shadow-md"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                Upcoming
              </button>
              <button
                onClick={() => setActiveTab("past")}
                className={`px-4 py-2 text-xs font-bold tracking-wider uppercase rounded-lg transition-all duration-200 ${
                  activeTab === "past"
                    ? "bg-amber-500 text-slate-950 shadow-md"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                Past Brackets
              </button>
            </div>

            <span className="text-xs font-semibold text-slate-500 tracking-wider bg-slate-900 px-2.5 py-1 rounded-full border border-slate-800 self-start sm:self-center">
              {displayedBrackets.length} {activeTab.toUpperCase()} EVENTS
            </span>
          </div>
          
          {displayedBrackets.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayedBrackets.map((tournament) => (
                <article 
                  key={tournament.id} 
                  className="flex flex-col justify-between p-5 rounded-xl border border-slate-800/80 bg-slate-900/30 backdrop-blur-sm hover:border-amber-500/50 hover:bg-slate-900/60 transition-all duration-200 group shadow-lg"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-semibold text-lg leading-snug line-clamp-2 group-hover:text-amber-400 transition-colors duration-200">
                        {tournament.name}
                      </h3>
                      <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded border border-slate-700/50 font-mono whitespace-nowrap">
                        👤 {tournament.numAttendees || 0}
                      </span>
                    </div>
                    
                    <div className="space-y-1.5 text-sm text-slate-400">
                      <div className="flex items-center gap-2">
                        <span className="text-amber-500/80 text-xs">📍</span>
                        <span className="truncate">{tournament.city || "Hawaii, USA"}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-amber-500/80 text-xs">📅</span>
                        <span>{formatUnixDate(tournament.startAt)}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-5 pt-4 border-t border-slate-800/60 flex items-center justify-between">
                    <a 
                      href={`https://start.gg${tournament.url}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center text-xs bg-slate-800 hover:bg-amber-600 text-slate-200 hover:text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 shadow-sm w-full text-center"
                    >
                      {tournament.startAt >= currentUnixTime ? "Register & Bracket" : "View Results"}
                    </a>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 border border-dashed border-slate-800 rounded-xl bg-slate-900/10">
              <p className="text-slate-500 font-medium">
                No {activeTab} brackets found on file right now.
              </p>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}