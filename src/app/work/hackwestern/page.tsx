import { ProjectTemplate } from "@/components/project";

export default function HackWesternPage() {
  const sections = [
    {
      id: "overview",
      title: "Overview & Role",
      content: (
        <div className="space-y-4">
          <p>
            As a Web Organizer for Hack Western 12, I was responsible for architecting and building the digital infrastructure that powered the event for hundreds of attendees. My role was a hybrid of Product Designer and Full Stack Engineer; I ensured designs adhered to strict UX best practices while implementing the codebase using Next.js, TypeScript, and Node.js. The goal was to move beyond a static informational site and create a fully interactive application that managed the hacker lifecycle from application to event day.
          </p>
        </div>
      ),
    },
    {
      id: "immersion",
      title: "Immersion & Delight",
      content: (
        <div className="space-y-4">
          <p>
            To differentiate our brand, we focused on high-fidelity motion design and interactivity. I implemented a seemingly &quot;infinite&quot; scrolling background populated with draggable stickers, requiring optimized event listeners to maintain 60fps performance. I also engineered complex animation sequences, such as a digital scrapbook and interactive &quot;opening envelopes&quot; that revealed content.
          </p>
          <p>
            We also revamped the application process to be more expressive. Instead of standard form fields, I built a custom character creator and an integrated HTML5 drawing canvas. This allowed applicants to submit doodles and avatars as part of their application, making the user experience memorable and fun while testing technical implementation of canvas data handling.
          </p>
        </div>
      ),
    },
    {
      id: "systems",
      title: "Systems & Integration",
      content: (
        <div className="space-y-4">
          <p>
            Beyond the visual layer, I developed complex backend features to support event logistics. A major challenge was bridging the physical and digital worlds; I implemented a QR code scanning system that allowed hackers to check into workshops. This fed into a &quot;scavenger hunt&quot; gamification engine I built, where users collected points to redeem for rewards, requiring secure endpoints to prevent score manipulation.
          </p>
          <p>
            To streamline the attendee experience, I also integrated third-party mobile wallet APIs. This feature allowed hackers to generate passes on their personal dashboards and push them directly to their Apple Wallet or Google Wallet, ensuring they had offline access to their credentials throughout the venue.
          </p>
        </div>
      ),
    },
  ];

  return (
    <ProjectTemplate
      title="Hack Western"
      heroImage="/cases/hackwestern/hw1.png"
      role="Web Organizer"
      timeline="Hack Western 12"
      team="Design & Engineering Team"
      tools={["Next.js", "TypeScript", "Node.js", "Framer Motion", "HTML5 Canvas"]}
      sections={sections}
      backHref="/"
    />
  );
}

