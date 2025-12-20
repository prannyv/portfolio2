import { ProjectTemplate } from "@/components/project";

export default function PokeloPage() {
  const sections = [
    {
      id: "overview",
      title: "Overview",
      content: (
        <div className="space-y-4">
          <p>
            Coming soon...
          </p>
        </div>
      ),
    },
    {
      id: "how-it-works",
      title: "How it works",
      content: (
        <div className="space-y-4">
          <p>
            Coming soon...
          </p>
        </div>
      ),
    },
    {
      id: "tech-stack",
      title: "Tech Stack",
      content: (
        <div className="space-y-4">
          <p>
            Coming soon...
          </p>
        </div>
      ),
    },
  ];

  return (
    <ProjectTemplate
      title="Pokelo"
      heroImage="/pokemon/hero.png"
      role="Full Stack Developer"
      timeline="2024"
      team="Personal Project"
      tools={["React", "TypeScript", "Next.js", "Tailwind CSS"]}
      sections={sections}
      backHref="/"
    />
  );
}

