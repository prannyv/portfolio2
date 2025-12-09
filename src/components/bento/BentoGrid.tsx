import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface BentoGridProps {
  children: ReactNode;
  className?: string;
}

export function BentoGrid({ children, className }: BentoGridProps) {
  return (
    <div 
      className={cn(
        "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mx-auto",
        "w-[95%] md:w-[80%] lg:w-[75%]",
        className
      )}
    >
      {children}
    </div>
  );
}
