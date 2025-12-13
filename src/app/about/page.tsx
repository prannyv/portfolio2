import { BentoGrid } from "@/components/bento/BentoGrid";
import { Card } from "@/components/bento/Card";
import { CardOverlay } from "@/components/bento/CardOverlay";
import { PhotoCard } from "@/components/bento/PhotoCard";
import { SpotifyNowPlaying } from "@/components/bento/SpotifyNowPlaying";
import { LetterboxdCard } from "@/components/bento/LetterboxdCard";

export default function About() {
  return (
    <div className="min-h-screen">
      <CardOverlay />
      <BentoGrid>
        {/* Large block (2x2) on the left */}
        <Card 
          className="col-span-1 sm:col-span-2 row-span-2 min-h-[680px] bg-[#f7f7f9]"
          showCaseButton={false}
        >
          <div className="h-full flex flex-col">
            {/* Title Row */}
            <div className="mb-6">
              <h2 className="text-3xl sm:text-4xl font-medium text-black font-sentient">About Me</h2>
              <div className="mt-5 border-t border-gray-200"></div>
            </div>
            
            {/* Content */}
            <div className="flex-1 flex flex-col justify-start text-base sm:text-lg space-y-4 font-geist-sans">
              <p className="text-gray-600">Hi, I'm Pranav Varma! I'm a software engineer and a student at <a href="https://uwo.ca" target="_blank" rel="noopener noreferrer" className="text-black underline transition-colors hover:text-[#8F55E0]">Western University</a>. Recently, I've worked in software engineering internships at <a href="https://google.com" target="_blank" rel="noopener noreferrer" className="underline group"><span className="text-black transition-colors group-hover:text-[#4285F4]">G</span><span className="text-black transition-colors group-hover:text-[#EA4335]">o</span><span className="text-black transition-colors group-hover:text-[#FBBC05]">o</span><span className="text-black transition-colors group-hover:text-[#4285F4]">g</span><span className="text-black transition-colors group-hover:text-[#34A853]">l</span><span className="text-black transition-colors group-hover:text-[#EA4335]">e</span></a>, <a href="https://shopify.com" target="_blank" rel="noopener noreferrer" className="text-black underline transition-colors hover:text-[#96bf48]">Shopify</a>, and <a href="https://dayforce.com" target="_blank" rel="noopener noreferrer" className="text-black underline transition-colors hover:text-[#0f4f9a]">Dayforce</a> in backend and fullstack roles.</p>
              <p className="text-gray-600">I've been attending hackathons for the past 3 years, and have won awards at several of them. I'm super happy to have joined the <a href="https://hackwestern.com" target="_blank" rel="noopener noreferrer" className="text-black underline transition-colors hover:text-[#694e9e]">Hack Western 12</a> team as a web developer.</p>
              <p className="text-gray-600">At school, I'm the co-president of the <a href="https://www.instagram.com/westerndevsociety/?hl=en" target="_blank" rel="noopener noreferrer" className="text-black underline transition-colors hover:text-[#0d2b53]">Western Developer's Society</a>, a club that helps students learn about software development and find opportunities in the tech industry.</p>
              <p className="text-gray-600">Outside of school and work, I love to watch movies, play basketball (go Raptors!), and learn new recipes.</p>
            </div>
          </div>
        </Card>

        {/* 4 small blocks (1x1) on the right */}
        {/* Block 1: Music */}
        <Card 
          className="col-span-1 row-span-1 min-h-[330px] p-0"
          showCaseButton={false}
        >
          <SpotifyNowPlaying />
        </Card>

        {/* Block 2: Photos */}
        <Card 
          className="col-span-1 row-span-1 min-h-[330px] p-0"
          showCaseButton={false}
        >
          <PhotoCard />
        </Card>

        {/* Block 3: Letterboxd */}
        <Card 
          className="col-span-1 row-span-1 min-h-[330px] p-0"
          showCaseButton={false}
        >
          <LetterboxdCard />
        </Card>

        {/* Block 4: Placeholder */}
        <Card 
          className="col-span-1 row-span-1 min-h-[330px] bg-gray-200"
          showCaseButton={false}
        >
          <div className="h-full flex items-center justify-center">
            <h2 className="text-xl font-bold text-gray-400">Coming Soon</h2>
          </div>
        </Card>
      </BentoGrid>
    </div>
  );
}

