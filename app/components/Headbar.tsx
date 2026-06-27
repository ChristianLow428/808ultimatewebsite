// app/components/Headbar.tsx
import Image from 'next/image';

interface HeadbarProps {
  onTogglePR: () => void;
}

export default function Headbar({ onTogglePR }: HeadbarProps) {
  return (
    <header className="w-full border-b border-zinc-900 bg-zinc-950">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        
        {/* Brand Logo & Title Container */}
        <div className="flex items-center gap-3">
          {/* By passing a simple string path starting with '/', Next.js automatically 
            maps this directly to your root public/ folder at runtime.
          */}
          <div className="w-8 h-8 relative flex items-center justify-center">
            <Image 
              src="/808Ultimate.jpg" 
              alt="" 
              width={32}
              height={32}
              className="object-contain rounded-md"
              priority
            />
          </div>
          
          <div className="flex items-center gap-3">
            <span className="text-xl font-black tracking-wider text-red-500">808 ULTIMATE</span>
            <span className="w-1.5 h-1.5 rounded-full bg-zinc-700 hidden sm:inline" />
            <span className="text-xs font-bold uppercase tracking-widest text-zinc-400 hidden sm:inline">
              Smash Ultimate Hawaii
            </span>
          </div>
        </div>
        
        {/* Clickable League Data Trigger Button */}
        <button 
          onClick={onTogglePR}
          className="text-[10px] uppercase font-black tracking-widest px-3 py-1 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 active:scale-95 transition text-zinc-400 hover:text-white rounded-lg cursor-pointer"
        >
          HI PR League Data
        </button>

      </div>
    </header>
  );
}