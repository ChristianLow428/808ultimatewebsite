// app/HomeClient.tsx
"use client";

import { useState, useEffect } from "react";
import Headbar from "./components/Headbar";
import RankingTicker from "./components/RankingTicker";
import Headliner from "./components/Headliner";
import Footer from "./components/Footer";
import PRModal from "./components/PRModal"; // Imported your new standings popover modal
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
  const [isPRModalOpen, setIsPRModalOpen] = useState(false); // Track modal popover visibility
  
  // Track time inside state to avoid impure rendering errors
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

  // Handles switching state to open the Power Ranking list modal
  const handleTogglePR = () => {
    setIsPRModalOpen(true);
  };

  // 1. Headliner Target: Filter for UPCOMING events first, then find the one with peak attendance
  const upcomingTournaments = tournaments.filter((t) => t.startAt >= currentUnixTime);
  const sortedByAttendance = [...upcomingTournaments].sort((a, b) => b.numAttendees - a.numAttendees);
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
    <div className="flex flex-col min-h-screen bg-black text-neutral-200 antialiased selection:bg-sky-500/20">
      {/* Headbar triggers our modal state change */}
      <Headbar onTogglePR={handleTogglePR} />
      
      <RankingTicker />
      
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        {/* Headliner: Spotlights the future tournament with peak attendance */}
        {featuredEvent && (
          <section aria-label="Featured Peak-Attendance Bracket">
            <Headliner featuredTournament={featuredEvent} />
          </section>
        )}
        
        {/* Main Feed Section */}
        <section aria-label="Regional Brackets Layout" className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-900 pb-4">
            
            <div className="flex bg-neutral-950 p-1 rounded-xl border border-neutral-900 self-start">
              <button
                onClick={() => setActiveTab("upcoming")}
                className={`px-4 py-2 text-xs font-bold tracking-wider uppercase rounded-lg transition-all duration-200 ${
                  activeTab === "upcoming"
                    ? "bg-sky-500 text-black shadow-md"
                    : "text-neutral-400 hover:text-neutral-200"
                }`}
              >
                Upcoming
              </button>
              <button
                onClick={() => setActiveTab("past")}
                className={`px-4 py-2 text-xs font-bold tracking-wider uppercase rounded-lg transition-all duration-200 ${
                  activeTab === "past"
                    ? "bg-sky-500 text-black shadow-md"
                    : "text-neutral-400 hover:text-neutral-200"
                }`}
              >
                Past Brackets
              </button>
            </div>

            <span className="text-xs font-semibold text-neutral-500 tracking-wider bg-neutral-950 px-2.5 py-1 rounded-full border border-neutral-900 self-start sm:self-center">
              {displayedBrackets.length} {activeTab.toUpperCase()} EVENTS
            </span>
          </div>
          
          {displayedBrackets.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayedBrackets.map((tournament) => (
                <article 
                  key={tournament.id} 
                  className="flex flex-col justify-between p-5 rounded-2xl border border-neutral-900 bg-neutral-950/40 backdrop-blur-sm hover:border-sky-500/40 hover:shadow-[0_0_20px_rgba(56,189,248,0.03)] transition-all duration-300 group"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-semibold text-lg leading-snug line-clamp-2 group-hover:text-sky-400 transition-colors duration-200">
                        {tournament.name}
                      </h3>
                      <span className="text-[10px] bg-neutral-900 text-neutral-400 px-2 py-0.5 rounded border border-neutral-800 font-mono whitespace-nowrap">
                        👤 {tournament.numAttendees || 0}
                      </span>
                    </div>
                    
                    <div className="space-y-1.5 text-sm text-neutral-400">
                      <div className="flex items-center gap-2">
                        <span className="text-sky-500/80 text-xs">📍</span>
                        <span className="truncate">{tournament.city || "Hawaii, USA"}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sky-500/80 text-xs">📅</span>
                        <span>{formatUnixDate(tournament.startAt)}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-5 pt-4 border-t border-neutral-900/60 flex items-center justify-between">
                    <a 
                      href={`https://start.gg${tournament.url}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center text-xs bg-neutral-900 hover:bg-sky-500 text-neutral-300 hover:text-black px-4 py-2.5 rounded-xl font-bold transition-all duration-200 w-full text-center"
                    >
                      {tournament.startAt >= currentUnixTime ? "Register & Bracket" : "View Results"}
                    </a>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 border border-dashed border-neutral-900 rounded-xl bg-neutral-950/10">
              <p className="text-neutral-500 font-medium">
                No {activeTab} brackets found on file right now.
              </p>
            </div>
          )}
        </section>
      </main>

      <Footer />

      {/* Standings Modal Overlay Panel */}
      <PRModal 
        isOpen={isPRModalOpen} 
        onClose={() => setIsPRModalOpen(false)} 
      />
    </div>
  );
}