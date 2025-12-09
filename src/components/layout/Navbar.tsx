import Link from "next/link";
import { cn } from "@/lib/utils";

export function Navbar() {
  return (
    <>
      {/* SVG Filter for Liquid Effect */}
      <svg style={{ display: 'none' }}>
        <filter id="displacementFilter">
          <feTurbulence 
            type="turbulence" 
            baseFrequency="0.01" 
            numOctaves="2" 
            result="turbulence" 
          />
          <feDisplacementMap 
            in="SourceGraphic" 
            in2="turbulence" 
            scale="30" 
            xChannelSelector="R" 
            yChannelSelector="G" 
          />
        </filter>
      </svg>

      <nav className="fixed top-6 left-0 right-0 z-[100] flex justify-center items-center px-4 pointer-events-none">
        <div className={cn(
          "liquid-glass relative flex items-center justify-between gap-8 px-10 py-4 pointer-events-auto",
          "shadow-[-8px_-10px_46px_rgba(0,0,0,0.1)]", // subtle drop shadow
          "text-gray-900" // Ensure text is dark enough
        )}>
          <Link href="/" className="font-bold text-lg hover:opacity-80 transition-opacity z-10">
            Portfolio
          </Link>
          <div className="flex items-center gap-8 text-sm font-medium text-gray-700 z-10">
            <Link href="#about" className="hover:text-black transition-colors">
              About
            </Link>
            <Link href="#work" className="hover:text-black transition-colors">
              Work
            </Link>
            <Link href="#contact" className="hover:text-black transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
}
