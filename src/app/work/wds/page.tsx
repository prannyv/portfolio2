import { ProjectTemplate } from "@/components/project";

export default function WDSPage() {
  const sections = [
    {
      id: "overview",
      title: "Overview",
      content: (
        <div className="space-y-4">
          <p>
            Western Developer Society is Western University&apos;s largest tech club,
            fostering a community of developers, designers, and tech enthusiasts
            through workshops, hackathons, and industry events.
          </p>
          <p>
            As Co-President, I led initiatives to grow the community and provide
            students with opportunities to develop their technical and leadership skills.
          </p>
        </div>
      ),
    },
  ];

  return (
    <ProjectTemplate
      title="Western Developer Society"
      heroImage="/googleBackground.png"
      role="Co-President"
      timeline="Western's Largest Tech Club"
      team="Executive Team"
      tools={["Leadership", "Event Planning", "Community Building", "Workshops"]}
      sections={sections}
      backHref="/"
    />
  );
}

