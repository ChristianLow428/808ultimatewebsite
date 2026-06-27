// app/components/Footer.tsx

export default function Footer() {
  return (
    <footer className="w-full border-t border-zinc-900 bg-zinc-950 text-zinc-500 py-12 mt-20 text-s">
      <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-6">
        <p>© 2026 Smash Ultimate Hawaii (808 Ultimate). Built for the local scene. Feel free to follow our handles! </p>
        <div className="flex gap-6 text-zinc-400 items-center">
          
          {/* Instagram Link */}
          <a 
            href="https://www.instagram.com/808ultimate/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="hover:text-red-500 transition" 
            aria-label="Instagram"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
              <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
            </svg>
          </a>
          
          {/* Facebook Link */}
          <a 
            href="https://www.facebook.com/groups/672648416185974/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="hover:text-red-500 transition" 
            aria-label="Facebook"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
            </svg>
          </a>


        </div>
      </div>
    </footer>
  );
}