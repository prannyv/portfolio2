"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();

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
          <Link 
            href="/" 
            className={cn(
              "hover:opacity-80 transition-opacity z-10 font-medium text-gray-700",
              pathname === "/" ? "text-lg font-bold text-black" : "text-sm"
            )}
          >
            Portfolio
          </Link>
          <div className="flex items-center gap-8 font-medium text-gray-700 z-10">
            <Link 
              href="/about" 
              className={cn(
                "hover:text-black transition-colors",
                pathname === "/about" ? "text-lg font-bold text-black" : "text-sm"
              )}
            >
              About
            </Link>
            <Link 
              href="/work" 
              className={cn(
                "hover:text-black transition-colors",
                pathname === "/work" ? "text-lg font-bold text-black" : "text-sm"
              )}
            >
              Work
            </Link>
            <Link 
              href="/contact" 
              className={cn(
                "hover:text-black transition-colors",
                pathname === "/contact" ? "text-lg font-bold text-black" : "text-sm"
              )}
            >
              Contact
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
}
