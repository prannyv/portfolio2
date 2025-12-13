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
              <h2 className="text-2xl sm:text-3xl font-bold text-black">About Me</h2>
              <div className="mt-5 border-t border-gray-200"></div>
            </div>
            
            {/* Content */}
            <div className="flex-1 flex flex-col justify-start text-base sm:text-lg space-y-4">
              <p className="text-gray-600">Hi, I'm Pranav Varma! I'm a software engineer and a student at Western University. Recently, I've worked in software engineering internships at Google, Shopify, and Dayforce in backend and fullstack roles.</p>
              <p className="text-gray-600">I've been attending hackathons for the past 3 years, and have won awards at several of them. I'm super happy to have joined the <a href="https://hackwestern.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">Hack Western 12</a> team as a web developer.</p>
              <p className="text-gray-600">At school, I'm the co-president of the <a href="https://www.instagram.com/westerndevsociety/?hl=en" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">Western Developer's Society</a>, a club that helps students learn about software development and find opportunities in the tech industry.</p>
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
          className="col-span-1 row-span-1 min-h-[330px] bg-gray-100"
          showCaseButton={false}
        >
          <div className="h-full flex items-center justify-center">
            <h2 className="text-xl font-bold text-gray-800">Block 4</h2>
          </div>
        </Card>
      </BentoGrid>
    </div>
  );
}

