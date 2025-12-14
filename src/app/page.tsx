import { BentoGrid } from "@/components/bento/BentoGrid";
import { Card } from "@/components/bento/Card";
import { HackWesternCanvas } from "@/components/bento/HackWesternCanvas";
import { CardOverlay } from "@/components/bento/CardOverlay";
import { PhotoCard } from "@/components/bento/PhotoCard";
import { FeaturedPartners } from "@/components/bento/FeaturedPartners";
import { FigmaPhoneEmbed } from "@/components/bento/FigmaPhoneEmbed";
import { BasketballHighlights } from "@/components/bento/BasketballHighlights";
import { SpotifyNowPlaying } from "@/components/bento/SpotifyNowPlaying";
import { HackWesternLoyalty } from "@/components/bento/HackWesternLoyalty";
import { ToxicityDetectionCard } from "@/components/bento/ToxicityDetectionCard";
import { MookieCard } from "@/components/bento/MookieCard";

export default function Home() {
  return (
    <div className="min-h-screen">
      <CardOverlay />
      <BentoGrid>
        {/* Row 1: Large (2x2) + MediumH (2x1) */}
        <Card 
          className="col-span-1 sm:col-span-2 row-span-2 min-h-[680px] bg-[#f7f7f9]"
          caseLabel="View Large Card 1 Case Study"
          showCaseButton={false}
        >
          <div className="h-full flex flex-col">
            {/* Title Row */}
            <div className="mb-6">
              <h2 className="text-3xl sm:text-4xl text-black font-sentient">
                <span className="font-normal">hello, my name is </span>
                <span className="font-medium">Pranav Varma</span>
              </h2>
              <div className="mt-5 border-t border-gray-200"></div>
            </div>
            
            {/* Content */}
            <div className="flex-1 flex flex-col text-base sm:text-lg font-geist-sans">
              <div className="space-y-4">
                <p className="text-gray-600">i'm a computer science student @ <a href="https://uwo.ca" target="_blank" rel="noopener noreferrer" className="text-black underline transition-colors hover:text-[#8F55E0]">Western University</a>. In previous internships, I've worked at <a href="https://google.com" target="_blank" rel="noopener noreferrer" className="underline group"><span className="text-black transition-colors group-hover:text-[#4285F4]">G</span><span className="text-black transition-colors group-hover:text-[#EA4335]">o</span><span className="text-black transition-colors group-hover:text-[#FBBC05]">o</span><span className="text-black transition-colors group-hover:text-[#4285F4]">g</span><span className="text-black transition-colors group-hover:text-[#34A853]">l</span><span className="text-black transition-colors group-hover:text-[#EA4335]">e</span></a>, <a href="https://shopify.com" target="_blank" rel="noopener noreferrer" className="text-black underline transition-colors hover:text-[#96bf48]">Shopify</a>, and <a href="https://dayforce.com" target="_blank" rel="noopener noreferrer" className="text-black underline transition-colors hover:text-[#0f4f9a]">Dayforce</a>.</p>
                <p className="text-gray-600">this site is a collection of my work, projects, and experiences. feel free to play around with the different cards to see components i've shipped!</p>
                <p className="text-gray-600">i tried to include some of the things i do in my free time too, so hopefully you can learn a thing or two about me :P</p>
                <p className="text-gray-600">i've spent a lot of engineering time just completing tickets, so going forward, i want to spend more time thinking about why things are the way they are and how to improve the systems that we use</p>
                <p className="text-gray-600">if you're interested in chatting or working on a project, feel free to reach out!</p>
              </div>
              
              {/* Social Links */}
              <div className="mt-auto pt-6 flex items-center gap-6">
                <a href="https://github.com/prannyv" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-black transition-colors">
                  <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                </a>
                <a href="https://linkedin.com/in/pranavarma" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#0A66C2] transition-colors">
                  <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                </a>
                <a href="https://devpost.com/prannyv" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#003E54] transition-colors">
                  <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24"><path d="M6.002 1.61L0 12.004L6.002 22.39h11.996L24 12.004L17.998 1.61H6.002zm1.593 4.084h3.947c3.605 0 6.276 1.695 6.276 6.31c0 4.436-3.21 6.302-6.456 6.302H7.595V5.694zm2.517 2.449v7.714h1.241c2.646 0 3.862-1.55 3.862-3.861c.009-2.569-1.096-3.853-3.767-3.853H10.112z"/></svg>
                </a>
                <a href="mailto:pranavvarma603@gmail.com" className="text-gray-400 hover:text-black transition-colors">
                  <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
                </a>
              </div>
            </div>
          </div>
        </Card>
        <Card 
          className="col-span-1 sm:col-span-2 row-span-1 min-h-[330px] p-0"
          caseTitle="🐎 HackWestern 2025"
          caseSubtitle="Infinite Canvas Home Page"
          caseHref="/work/hackwestern"
        >
          <HackWesternCanvas />
        </Card>

        {/* Row 2: MediumV (1x2) + Small (1x1) filling right side of Large */}
        <Card 
          className="col-span-1 row-span-2 min-h-[680px] p-0"
          caseTitle="🐎 HackWestern 12"
          caseSubtitle="Personal Badge System"
          caseHref="/work/hackwestern"
        >
          <HackWesternLoyalty />
        </Card>
        <Card 
          className="col-span-1 row-span-1 min-h-[330px] p-0"
          caseLabel="View Small Card 1 Case Study"
          showCaseButton={false}
        >
          <PhotoCard />
        </Card>

        {/* Row 3: MediumH (2x1) + Small (1x1) */}
        <Card 
          className="col-span-1 sm:col-span-2 row-span-1 min-h-[330px] p-0"
          caseTitle="🛒 Google Workspace Marketplace"
          caseSubtitle="Featured Partner Apps Banner"
          caseHref="/work/marketplace"
        >
          <FeaturedPartners backgroundImage="/googleBackground.png" />
        </Card>
        <Card 
          className="col-span-1 row-span-1 min-h-[330px] p-0"
          showCaseButton={false}
        >
          <SpotifyNowPlaying />
        </Card>

        {/* Row 4: Vertical Card 1 (1x2) + Vertical Card 2 (1x2) */}
        <Card 
          className="col-span-1 row-span-2 min-h-[680px] bg-gray-200"
          showCaseButton={false}
        >
          <div className="h-full flex items-center justify-center">
            <h2 className="text-xl font-bold text-gray-400">Coming Soon</h2>
          </div>
        </Card>
        <Card 
          className="col-span-1 row-span-2 min-h-[680px] bg-[#050505] p-0"
          caseTitle="💵 RBC Design Thinking"
          caseSubtitle="Wealth Wizards"
          caseHref="/work/designthinking"
        >
          <FigmaPhoneEmbed />
        </Card>

        {/* Row 4-5: MediumH (2x1) + Small + Small */}
        <Card 
          className="col-span-1 sm:col-span-2 row-span-1 min-h-[330px] p-0"
          caseTitle="🏀 NBA Highlights"
          caseSubtitle="Automated highlight generation"
          caseHref="/work/nbahighlights"
        >
          <BasketballHighlights />
        </Card>
        <Card 
          className="col-span-1 row-span-1 min-h-[330px] p-0"
          caseTitle="🥣 Miso API"
          caseSubtitle="NLP-powered message moderation"
          caseHref="/work/miso"
        >
          <ToxicityDetectionCard />
        </Card>
        <Card 
          className="col-span-1 row-span-1 min-h-[330px] p-0"
          caseTitle="🎵 Mookie"
          caseSubtitle="Image-to-music queue system"
          caseHref="/work/mookie"
        >
          <MookieCard />
        </Card>
      </BentoGrid>
    </div>
  );
}
