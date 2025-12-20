'use client';

import dynamic from "next/dynamic";

// Lightweight loading placeholder
const CardSkeleton = () => (
  <div className="w-full h-full animate-pulse bg-gray-100 rounded-lg" />
);

// Components that require ssr: false
export const HackWesternCanvas = dynamic(
  () => import("@/components/bento/HackWesternCanvas").then(mod => ({ default: mod.HackWesternCanvas })),
  { loading: () => <CardSkeleton />, ssr: false }
);

export const BasketballHighlights = dynamic(
  () => import("@/components/bento/BasketballHighlights").then(mod => ({ default: mod.BasketballHighlights })),
  { loading: () => <CardSkeleton />, ssr: false }
);

export const FigmaPhoneEmbed = dynamic(
  () => import("@/components/bento/FigmaPhoneEmbed").then(mod => ({ default: mod.FigmaPhoneEmbed })),
  { loading: () => <CardSkeleton />, ssr: false }
);

