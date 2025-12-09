import { BentoGrid } from "@/components/bento/BentoGrid";
import { Card } from "@/components/bento/Card";
import { HackWesternCanvas } from "@/components/bento/HackWesternCanvas";
import { CardOverlay } from "@/components/bento/CardOverlay";
import { PhotoCard } from "@/components/bento/PhotoCard";
import { FeaturedPartners } from "@/components/bento/FeaturedPartners";

export default function Home() {
  return (
    <div className="min-h-screen">
      <CardOverlay />
      <BentoGrid>
        {/* Row 1: Large (2x2) + MediumH (2x1) */}
        <Card 
          className="col-span-1 sm:col-span-2 row-span-2 min-h-[680px] bg-red-100"
          caseLabel="View Large Card 1 Case Study"
        >
          <div className="h-full flex items-center justify-center">
            <h2 className="text-xl font-bold text-gray-800">Large Card 1</h2>
          </div>
        </Card>
        <Card 
          className="col-span-1 sm:col-span-2 row-span-1 min-h-[330px] p-0"
          caseTitle="🐎 HackWestern 2025"
          caseSubtitle="Canada's 2nd Largest Hackathon"
        >
          <HackWesternCanvas />
        </Card>

        {/* Row 2: MediumV (1x2) + Small (1x1) filling right side of Large */}
        <Card 
          className="col-span-1 row-span-2 min-h-[680px] bg-green-100"
          caseLabel="View Medium Vertical 2 Case Study"
        >
          <div className="h-full flex items-center justify-center">
            <h2 className="text-xl font-bold text-gray-800">Medium Vertical 2</h2>
          </div>
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
          <FeaturedPartners />
        </Card>
        <Card 
          className="col-span-1 row-span-1 min-h-[330px] bg-pink-100"
          caseLabel="View Small Card 2 Case Study"
        >
          <div className="h-full flex items-center justify-center">
            <h2 className="text-xl font-bold text-gray-800">Small Card 2</h2>
          </div>
        </Card>

        {/* Row 4: MediumH (2x1) + Large (2x2) starts */}
        <Card 
          className="col-span-1 sm:col-span-2 row-span-1 min-h-[330px] bg-indigo-100"
          caseLabel="View Medium Horizontal 4 Case Study"
        >
          <div className="h-full flex items-center justify-center">
            <h2 className="text-xl font-bold text-gray-800">Medium Horizontal 4</h2>
          </div>
        </Card>
        <Card 
          className="col-span-1 sm:col-span-2 row-span-2 min-h-[680px] bg-orange-100"
          caseLabel="View Large Card 2 Case Study"
        >
          <div className="h-full flex items-center justify-center">
            <h2 className="text-xl font-bold text-gray-800">Large Card 2</h2>
          </div>
        </Card>

        {/* Row 5: Small + Small (filling left side of Large) */}
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
