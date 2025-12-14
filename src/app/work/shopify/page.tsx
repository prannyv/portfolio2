import { ProjectTemplate } from "@/components/project";

export default function ShopifyPage() {
  const sections = [
    {
      id: "overview",
      title: "Overview",
      content: (
        <div className="space-y-4">
          <p>
            At Shopify, I worked on the Payments Infrastructure team, building
            and maintaining the systems that power millions of transactions
            for merchants worldwide.
          </p>
        </div>
      ),
    },
  ];

  return (
    <ProjectTemplate
      title="Shopify"
      heroImage="/googleBackground.png"
      role="Software Engineer Intern"
      timeline="Payments Infrastructure"
      team="Payments Infrastructure Team"
      tools={["Ruby", "Rails", "GraphQL", "MySQL"]}
      sections={sections}
      backHref="/"
    />
  );
}

