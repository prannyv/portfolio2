'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

export interface PartnerApp {
  id: string;
  name: string;
  description?: string;
  logo: string; // URL or placeholder
  color?: string; // fallback color
}

interface FeaturedPartnersProps {
  apps?: PartnerApp[];
  className?: string;
}

const defaultApps: PartnerApp[] = [
  { id: 'confluence', name: 'Loom', logo: '/bannerLogos/logo1.png' },
  { id: 'lucidchart', name: 'Figma', logo: '/bannerLogos/logo2.svg' },
  { id: 'salesforce', name: 'Confluence', logo: '/bannerLogos/logo3.png' },
  { id: 'github-integration', name: 'Atlassian', logo: '/bannerLogos/logo4.png' },
  { id: 'comeen', name: 'Github', logo: '/bannerLogos/logo5.svg' },
  { id: 'github-chat', name: 'ChatGPT', logo: '/bannerLogos/logo6.png' },
];

export function FeaturedPartners({ apps = defaultApps, className }: FeaturedPartnersProps) {
  const innerRadius = '3px'; // 2-4px border radius
  
  return (
    <div 
      className={cn("w-full h-full flex items-center justify-center bg-white p-6 md:p-10", className)}
      style={{
        borderRadius: innerRadius,
      }}
    >
      {/* The Banner Container */}
      <div 
        className="w-full max-w-[90%] max-h-full aspect-[850/300] p-4 md:p-5 relative flex items-center justify-between gap-3 md:gap-4 overflow-hidden"
        style={{
          backgroundImage: 'url(/featured_partner_home_banner.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          borderRadius: innerRadius,
        }}
      >

        {/* Left Content */}
        <div className="flex-1 space-y-2.5 md:space-y-3 z-10 min-w-0 max-w-[60%]">
          <div>
            <h3 className="text-base md:text-lg font-medium text-slate-900 mb-0.5 md:mb-1">
              Featured partner apps
            </h3>
            <p className="text-slate-600 text-xs md:text-sm max-w-xs leading-tight">
              Connect your business apps with Google Workspace.
            </p>
          </div>
          
          <button 
            className="px-6 py-1 md:px-10 md:py-1 hover:shadow-lg text-white text-xs md:text-xs rounded-lg font-medium transition-all duration-100 cursor-pointer"
            style={{ 
              backgroundColor: '#1a74e8',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#1557b0';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#1a74e8';
            }}
          >
            See all
          </button>
        </div>

        {/* Right Content - Apps List in 2 columns */}
        <div className="flex-1 w-full max-w-[200px] md:max-w-[240px] z-10">
          <div className="grid grid-cols-2 gap-y-1.5 gap-x-2 md:gap-y-2 md:gap-x-3">
            {apps.map((app) => (
              <AppItem key={app.id} app={app} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function AppItem({ app }: { app: PartnerApp }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="relative"
      style={{ zIndex: isHovered ? 50 : 1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* The Item Content */}
      <motion.div 
        className="relative flex items-center gap-1.5 md:gap-2 p-1.5 md:p-2 rounded-lg cursor-pointer"
        initial={false}
        animate={{
          backgroundColor: isHovered ? '#ffffff' : 'transparent',
          boxShadow: isHovered ? '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)' : 'none',
        }}
        transition={{ duration: 0.075, ease: 'linear' }}
      >
        {/* Logo - Same size on hover */}
        {app.logo ? (
          <img 
            src={app.logo} 
            alt={app.name} 
            className="w-5 h-5 md:w-6 md:h-6 object-contain shrink-0" 
            onError={(e) => {
              // Fallback to first letter if image fails to load
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              const fallback = document.createElement('span');
              fallback.textContent = app.name[0];
              fallback.className = 'w-5 h-5 md:w-6 md:h-6 flex items-center justify-center text-slate-700 text-[10px] md:text-xs font-bold shrink-0';
              target.parentElement?.appendChild(fallback);
            }}
          />
        ) : (
          <span className="w-5 h-5 md:w-6 md:h-6 flex items-center justify-center text-slate-700 text-[10px] md:text-xs font-bold shrink-0">
            {app.name[0]}
          </span>
        )}

        {/* Text - Only Name, same on hover, smaller to fit without truncation */}
        <span className={`font-medium text-[10px] md:text-xs leading-tight ${
          isHovered ? 'text-slate-900' : 'text-slate-700'
        }`}>
          {app.name}
        </span>
      </motion.div>
    </motion.div>
  );
}

