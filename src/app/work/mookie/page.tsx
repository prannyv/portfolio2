import { ProjectTemplate } from "@/components/project";

export default function MookiePage() {
  const sections = [
    {
      id: "inspiration",
      title: "Inspiration",
      content: (
        <div className="space-y-4">
          <p>
            In 2024, only 48.6% of Canadians aged 15 and older reported being highly satisfied with their lives, down from 54.0% just three years earlier. Our team at Hack Western 11 wanted to explore how technology could make everyday moments feel a little more special. We landed on music: what if your soundtrack could adapt in real-time to what you&apos;re actually experiencing, turning your commute, study session, or morning coffee into a cinematic moment?
          </p>
        </div>
      ),
    },
    {
      id: "what-it-does",
      title: "What It Does",
      content: (
        <div className="space-y-4">
          <p>
            Mookie is a wearable device powered by a Raspberry Pi Zero that transforms your day into a personalized musical experience. It captures snapshots of your environment at regular intervals, analyzes the mood and context using on-device AI, and automatically queues songs on Spotify that match your current vibe. At the end of the day, Mookie generates a &quot;Daily Wrapped&quot; featuring a playlist of everything you listened to alongside a summary caption describing your day&apos;s mood arc, similar to Spotify&apos;s Daylist titles.
          </p>
        </div>
      ),
    },
    {
      id: "how-we-built-it",
      title: "How We Built It",
      content: (
        <div className="space-y-4">
          <p>
            I served as the backend engineer and worked on the ML pipeline. The core of Mookie runs locally on the Pi using Ollama with Llama 3.2 Vision (11B parameters, approximately 7GB). Every minute, the device captures a snapshot and the model extracts keywords describing the scene&apos;s mood, emotion, and atmosphere. These keywords feed into a semantic search against Spotify&apos;s vector embeddings, matching vibes to songs and queueing them via the Spotify API. We built a React/Next.js frontend to handle Spotify OAuth and user authentication. For privacy, we added a physical button to toggle capture on and off. When disabled, the model stops running entirely.
          </p>
        </div>
      ),
    },
    {
      id: "challenges",
      title: "Challenges We Ran Into",
      content: (
        <div className="space-y-4">
          <p>
            Our biggest hurdle was hallucinated song names. The model would confidently generate titles that simply didn&apos;t exist in Spotify&apos;s catalog. We addressed this by implementing RAG over a large pre-compiled song dataset, constraining the model&apos;s outputs to real tracks. We also optimized for latency on constrained hardware. Song generation took 5-7 seconds with sub-second queue times, which was fast enough to feel seamless during use.
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
            We built a fully functional prototype over the hackathon weekend with real-time playlist generation, working Spotify integration, and a daily summary feature. Mookie demonstrated that meaningful AI experiences can run entirely on-device with consumer hardware, and the project sparked conversations about context-aware music and ambient computing.
          </p>
        </div>
      ),
    },
  ];

  return (
    <ProjectTemplate
      title="Mookie"
      heroImage="/cases/mookie/mookie1.jpg"
      role="Backend Engineer"
      timeline="Hack Western 11"
      team="Hackathon Team"
      tools={["Raspberry Pi Zero", "Ollama", "Llama 3.2 Vision", "React", "Next.js", "Spotify API"]}
      sections={sections}
      backHref="/"
    />
  );
}

