import { Users, Calendar, MapPin, ExternalLink } from 'lucide-react';

export default function Headliner() {
  // Mocking the hyped featured event
  const featuredEvent = {
    name: "Hawaii Smash Regional #10",
    entrants: 142,
    date: "Saturday, July 11",
    location: "Honolulu, HI",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1200&auto=format&fit=crop", 
    url: "https://start.gg"
  };

  return (
    <section className="w-full bg-gradient-to-b from-red-950/20 to-transparent border border-red-950/40 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row gap-6 items-center my-8">
      {/* Event Banner */}
      <div className="w-full md:w-2/5 aspect-video rounded-xl overflow-hidden bg-zinc-800 relative group">
        <img src={featuredEvent.image} alt={featuredEvent.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
        <span className="absolute top-3 left-3 bg-red-600 text-white font-black text-xs uppercase px-3 py-1 rounded shadow-lg tracking-wider">
          🔥 Most Entrances
        </span>
      </div>

      {/* Event Info */}
      <div className="w-full md:w-3/5 flex flex-col justify-center">
        <h2 className="text-2xl md:text-3xl font-black text-zinc-100 mb-3 tracking-tight">
          {featuredEvent.name}
        </h2>
        
        <div className="grid grid-cols-2 gap-3 text-sm text-zinc-400 mb-6 max-w-sm">
          <div className="flex items-center gap-2"><Users size={16} className="text-red-500" /> <span>{featuredEvent.entrants} Entrants</span></div>
          <div className="flex items-center gap-2"><Calendar size={16} className="text-red-500" /> <span>{featuredEvent.date}</span></div>
          <div className="flex items-center gap-2 col-span-2"><MapPin size={16} className="text-red-500" /> <span>{featuredEvent.location}</span></div>
        </div>

        <a href={featuredEvent.url} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-3 rounded-xl transition shadow-lg shadow-red-900/20 self-start text-sm w-full sm:w-auto">
          Register on Start.gg <ExternalLink size={16} />
        </a>
      </div>
    </section>
  );
}