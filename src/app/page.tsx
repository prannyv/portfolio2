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
              <h2 className="text-2xl sm:text-3xl font-bold text-black">Pranav Varma</h2>
              <div className="mt-5 border-t border-gray-200"></div>
            </div>
            
            {/* Content Rows - 7 rows evenly spaced */}
            <div className="flex-1 flex flex-col justify-between text-base sm:text-lg">
              <p className="text-gray-600">placeholder text row 1</p>
              <p className="text-gray-600">placeholder text row 2</p>
              <p className="text-gray-600">placeholder text row 3</p>
              <p className="text-gray-600">placeholder text row 4</p>
              <p className="text-gray-600">placeholder text row 5</p>
              <p className="text-gray-600">placeholder text row 6</p>
              <p className="text-gray-600">placeholder text row 7</p>
            </div>
          </div>
        </Card>
        <Card 
          className="col-span-1 sm:col-span-2 row-span-1 min-h-[330px] p-0"
          caseTitle="🐎 HackWestern 2025"
          caseSubtitle="Infinite Canvas Home Page"
        >
          <HackWesternCanvas />
        </Card>

        {/* Row 2: MediumV (1x2) + Small (1x1) filling right side of Large */}
        <Card 
          className="col-span-1 row-span-2 min-h-[680px] p-0"
          caseTitle="🐎 HackWestern 12"
          caseSubtitle="Personal Badge System"
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
          caseTitle="Google Workspace Marketplace"
          caseSubtitle="Featured Partner Apps Banner"
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
          className="col-span-1 row-span-2 min-h-[680px] bg-orange-100"
          caseLabel="View Large Card 2 Case Study"
        >
          <div className="h-full flex items-center justify-center">
            <h2 className="text-xl font-bold text-gray-800">Large Card 2</h2>
          </div>
        </Card>
        <Card 
          className="col-span-1 row-span-2 min-h-[680px] bg-[#050505] p-0"
          caseTitle="RBC Design Thinking"
          caseSubtitle="Wealth wizards"
        >
          <FigmaPhoneEmbed />
        </Card>

        {/* Row 4-5: MediumH (2x1) + Small + Small */}
        <Card 
          className="col-span-1 sm:col-span-2 row-span-1 min-h-[330px] p-0"
          caseLabel="View Basketball Highlights Case Study"
        >
          <BasketballHighlights />
        </Card>
        <Card 
          className="col-span-1 row-span-1 min-h-[330px] bg-teal-100"
          caseLabel="View Small Card 3 Case Study"
        >
          <div className="h-full flex items-center justify-center">
            <h2 className="text-xl font-bold text-gray-800">Small Card 3</h2>
          </div>
        </Card>
        <Card 
          className="col-span-1 row-span-1 min-h-[330px] bg-gray-200"
          caseLabel="View Small Card 4 Case Study"
        >
          <div className="h-full flex items-center justify-center">
            <h2 className="text-xl font-bold text-gray-800">Small Card 4</h2>
          </div>
        </Card>
      </BentoGrid>
    </div>
  );
}
