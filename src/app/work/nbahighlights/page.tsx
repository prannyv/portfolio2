import { ProjectTemplate } from "@/components/project";

export default function NBAHighlightsPage() {
  const sections = [
    {
      id: "overview",
      title: "Overview",
      content: (
        <div className="space-y-4">
          <p>
            NBA Highlights is a personal project that automatically generates
            highlight reels from basketball games using computer vision and
            machine learning.
          </p>
          <p>
            The system analyzes game footage to identify key moments like dunks,
            three-pointers, and game-winning shots.
          </p>
        </div>
      ),
    },
    // {
    //   id: "problem",
    //   title: "The Problem",
    //   content: (
    //     <div className="space-y-4">
    //       <p>
    //         Add your problem statement and context here. What challenges were you trying to solve?
    //         What was the initial state before your involvement?
    //       </p>
    //     </div>
    //   ),
    // },
    // {
    //   id: "technical",
    //   title: "Technical Approach",
    //   content: (
    //     <div className="space-y-4">
    //       <p>
    //         Describe the technical implementation. What algorithms, models, or
    //         frameworks did you use?
    //       </p>
    //     </div>
    //   ),
    // },
    // {
    //   id: "solution",
    //   title: "Solution",
    //   content: (
    //     <div className="space-y-4">
    //       <p>
    //         Present your final solution here. Include key features, architecture,
    //         and the reasoning behind your technical decisions.
    //       </p>
    //     </div>
    //   ),
    // },
    // {
    //   id: "results",
    //   title: "Results",
    //   content: (
    //     <div className="space-y-4">
    //       <p>
    //         Share the outcomes and impact of your work. Include metrics, feedback,
    //         and lessons learned.
    //       </p>
    //     </div>
    //   ),
    // },
  ];

  return (
    <ProjectTemplate
      title="NBA Highlights"
      heroImage="/googleBackground.png"
      role="Full Stack Developer"
      timeline="2024"
      team="Solo Project"
      tools={["Python", "OpenCV", "FFmpeg", "React"]}
      sections={sections}
      backHref="/"
    />
  );
}

