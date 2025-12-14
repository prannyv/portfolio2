import { ProjectTemplate } from "@/components/project";

export default function DayforcePage() {
  const sections = [
    {
      id: "overview",
      title: "Overview",
      content: (
        <div className="space-y-4">
          <p>
            At Dayforce, I worked on the Core Services team, contributing to
            the foundational systems that power the human capital management
            platform used by organizations worldwide.
          </p>
        </div>
      ),
    },
  ];

  return (
    <ProjectTemplate
      title="Dayforce"
      heroImage="/googleBackground.png"
      role="Software Developer Intern"
      timeline="Core Services"
      team="Core Services Team"
      tools={["C#", ".NET", "SQL Server", "Azure"]}
      sections={sections}
      backHref="/"
    />
  );
}

