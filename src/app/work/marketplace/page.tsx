import { ProjectTemplate } from "@/components/project";

export default function MarketplacePage() {
  const sections = [
    {
      id: "overview",
      title: "Overview",
      content: (
        <div className="space-y-4">
          <p>
            As a full-stack developer on Google&apos;s Workspace Marketplace team, I built the Featured Partner Apps experience—an interactive banner and dedicated category page that showcases 30+ strategic partners to millions of Workspace users. This was a greenfield feature developed in collaboration with one other engineer, spanning Java backend services and a TypeScript-based React frontend.
          </p>
        </div>
      ),
    },
    {
      id: "problem",
      title: "Problem",
      content: (
        <div className="space-y-4">
          <p>
            Google had recently formalized partnerships with key third-party app developers, but the Marketplace had no mechanism to surface these partners to users. Apps from strategic partners like Atlassian, Canva, Loom, and Lucidchart were buried among thousands of other listings with no differentiation. Google needed a way to highlight these partnerships, drive user discovery, and deliver measurable value back to partners who had committed to deeper Workspace integrations.
          </p>
        </div>
      ),
    },
    {
      id: "solution",
      title: "Solution",
      content: (
        <div className="space-y-4">
          <p>
            We built a two-part solution: a dynamic banner on the Marketplace homepage and a dedicated &quot;Featured Partner Apps&quot; category page. The banner algorithmically rotates through partner apps to ensure equitable visibility while preventing repetition for returning users. On the backend, I implemented a scalable RESTful API in Java that queries partner app data from existing Marketplace infrastructure, optimizing query patterns to minimize response times. The frontend renders the banner and category page using Google&apos;s internal TypeScript framework, maintaining visual consistency with the broader Workspace design system.
          </p>
        </div>
      ),
    },
    {
      id: "results",
      title: "Results",
      content: (
        <div className="space-y-4">
          <p>
            The feature shipped to all Google Workspace customers in October 2024. Partner apps showcased in the banner saw a 20% increase in monthly active users. Backend optimizations reduced API response times by 16%, improving platform reliability at scale. I also developed comprehensive test suites in JUnit and Jest achieving 90% code coverage, which significantly reduced post-deployment issues. Additionally, design refinements made during this project addressed inconsistencies across the Workspace suite, contributing to a 20% improvement in user retention.
          </p>
        </div>
      ),
    },
  ];

  return (
    <ProjectTemplate
      title="Google Workspace Marketplace"
      heroImage="/cases/marketplace/ws1.png"
      role="Software Engineer Intern"
      timeline="Summer 2024"
      team="Google Workspace Team"
      tools={["Java", "TypeScript", "React", "JUnit", "Jest"]}
      sections={sections}
      backHref="/"
      aspectRatio="9/5"
    />
  );
}

