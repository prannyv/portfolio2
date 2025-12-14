import { ProjectTemplate } from "@/components/project";

export default function DesignThinkingPage() {
  const sections = [
    {
      id: "overview",
      title: "Overview",
      content: (
        <div className="space-y-4">
          <p>
            During the RBC Design Thinking Fellowship, my team was presented with a challenging, open-ended prompt: &quot;How can we help financially at-risk Canadians build wealth in Canada using data-driven insights?&quot; Our objective was to take this broad societal issue and narrow it down into a concrete, digital solution.
          </p>
          <p>
            The result was Bloom Savings, a mobile application concept designed specifically to assist immigrants and newcomers in navigating the Canadian investment landscape. By focusing on education and community, we aimed to lower the barrier to entry for wealth building.
          </p>
        </div>
      ),
    },
    {
      id: "problem",
      title: "The Problem & User Research",
      content: (
        <div className="space-y-4">
          <p>
            Upon analyzing the prompt, we identified that &quot;financially at-risk&quot; often overlaps significantly with the newcomer population. Navigating a new country&apos;s banking system is daunting, and our research highlighted four distinct user pain points:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li><strong>Knowledge Gaps:</strong> A lack of understanding regarding Canadian specific banking products (TFSA, RRSP).</li>
            <li><strong>Language Barriers:</strong> Financial jargon is difficult to parse even for native speakers, let alone those learning English or French.</li>
            <li><strong>Isolation:</strong> A lack of established community to ask for trusted advice.</li>
            <li><strong>Goal Alignment:</strong> Difficulty translating vague desires (buying a house) into concrete financial steps.</li>
          </ul>
        </div>
      ),
    },
    {
      id: "process",
      title: "The Process",
      content: (
        <div className="space-y-4">
          <p>
            We adopted an iterative design thinking methodology. We began with empathy mapping and persona creation to understand the &quot;why&quot; behind the user&apos;s hesitation to invest. We moved through multiple rounds of ideation, sketching out potential user flows that prioritized trust and simplicity over complex data visualization.
          </p>
          <p>
            We utilized Figma to bring these ideas to life, evolving from low-fidelity wireframes to high-fidelity interactive prototypes. This allowed us to test the user interface (UI) and user experience (UX) to ensure the navigation felt intuitive for someone unfamiliar with digital banking.
          </p>
        </div>
      ),
    },
    {
      id: "solution",
      title: "The Solution",
      content: (
        <div className="space-y-4">
          <p>
            Bloom Savings is a mobile application that acts as both an investment tool and a learning hub. The core features include:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li><strong>Goal-Based Onboarding:</strong> Users set specific financial targets immediately upon account creation, allowing the app to tailor recommendations.</li>
            <li><strong>Educational Modules:</strong> A &quot;Skills&quot; section that breaks down complex financial concepts into bite-sized, accessible lessons.</li>
            <li><strong>Community Connection:</strong> A social feature allowing users to connect with other newcomers to share tips and experiences.</li>
            <li><strong>Portfolio Visualization:</strong> A simplified dashboard to view investments without the overwhelming noise of day-trading apps.</li>
          </ul>
        </div>
      ),
    },
    {
      id: "technical",
      title: "Technical Architecture",
      content: (
        <div className="space-y-4">
          <p>
            While the fellowship focused heavily on the product design lifecycle, we planned the implementation strategy to ensure viability. We selected Flutter for the development of the Proof of Concept (PoC).
          </p>
          <p>
            We chose Flutter for its ability to compile to native code for both iOS and Android from a single codebase. This was a strategic decision to maximize reach among the target demographic, who utilize a wide variety of mobile devices, while keeping development overhead low during the prototyping phase.
          </p>
        </div>
      ),
    },
  ];

  return (
    <ProjectTemplate
      title="RBC Design Thinking"
      heroImage="/cases/designthinking/dtp1.png"
      role="UX Designer"
      timeline="Fall 2024"
      team="4 team members"
      tools={["Figma", "Miro", "Flutter", "User Research", "Prototyping"]}
      sections={sections}
      backHref="/"
    />
  );
}

