// app/components/Headbar.tsx
import Image from 'next/image';

interface HeadbarProps {
  onTogglePR: () => void;
}

export default function Headbar({ onTogglePR }: HeadbarProps) {
  return (
    <header className="w-full border-b border-neutral-900 bg-black sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 relative flex items-center justify-center">
            <Image 
              src="/808Ultimate.jpg" 
              alt="" 
              width={32}
              height={32}
              className="object-contain rounded-md filter grayscale brightness-125"
              priority
            />
          </div>
          
          <div className="flex items-center gap-1.5">
            <span className="text-lg font-black tracking-tighter text-neutral-100">808</span>
            <span className="text-lg font-black tracking-tighter text-sky-400">ULTIMATE</span>
          </div>
        </div>
        
        <button 
          onClick={onTogglePR}
          className="text-[10px] uppercase font-bold tracking-widest px-3 py-1.5 bg-neutral-900/80 hover:bg-neutral-800 border border-neutral-800 active:scale-95 transition text-neutral-400 hover:text-sky-400 rounded-lg cursor-pointer"
        >
          HI PR League Data
        </button>

      </div>
    </header>
  );
}