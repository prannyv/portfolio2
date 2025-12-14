import { ProjectTemplate } from "@/components/project";

export default function MisoPage() {
  const sections = [
    {
      id: "inspiration",
      title: "Inspiration",
      content: (
        <div className="space-y-4">
          <p>
            Why are there so few women in STEM? How can we promote female empowerment within STEM? 
            As two of us are women, we have personally faced misogyny within the tech community—from 
            being told women aren&apos;t fit for certain responsibilities, to our accomplishments being 
            undermined, we wanted to diminish gender inequality in STEM.
          </p>
          <p>
            We chose to focus on one of the roots of this problem: misogynistic or sexist comments 
            in both professional and social settings.
          </p>
        </div>
      ),
    },
    {
      id: "what-it-does",
      title: "What it does",
      content: (
        <div className="space-y-4">
          <p>
            Thus, we built Miso, an AI that detects sexism and toxicity in text messages and warns 
            the sender of their behaviour. It is then up to them whether they still want to send it 
            or not, but mind that messages which are filtered as at least 60% sexist or 80% toxic 
            will be sent up to admin within the communication channel.
          </p>
          <p>
            It can be integrated into Discord as a bot or used directly on our website. In a 
            professional workspace, which Discord is increasingly being used as—especially for new 
            startups—the consequences of toxic behaviour are even more serious.
          </p>
          <p>
            Every employee in the company will have a profile which tracks every time a message is 
            flagged as sexist or toxic. This tool helps HR determine inappropriate behaviour, measure 
            the severity of it, and keep records to help them mediate workplace conflicts.
          </p>
          <p>
            We hope to reduce misogyny within tech communities so that women feel more empowered and 
            encouraged to join STEM!
          </p>
        </div>
      ),
    },
    {
      id: "how-we-built-it",
      title: "How we built it",
      content: (
        <div className="space-y-4">
          <p>
            We made our own custom machine learning model on Cohere. We made a classify model which 
            categorises text inputs into the labels True (misogynistic) and False (non-misogynistic). 
            To train it, we combined various databases which took comments from social media sites 
            including Reddit and Twitter, and organised them into 2 columns: message text and their 
            associated label. In addition to our custom model, we also implemented the Cohere Toxicity 
            Detection API into our program and checked messages against both models.
          </p>
          <p>
            Next, we developed a Discord Bot so that users can integrate this AI into their Discord 
            Servers. We built it using Python, Discord API, and JSON. If someone sends a message which 
            is determined to be 60% likely to be sexist or 80% likely to be toxic, then the bot would 
            delete the message and send a warning text into the channel.
          </p>
          <p>
            To log the message history of the server, we used Estuary. Whenever a message would be sent 
            in the discord, a new text file would be created and uploaded to Estuary to be backed up. 
            This text file contains the message id, content and author. The file is uploaded by calling 
            the Estuary API and making a request to upload. Once the file uploads, the content ID is 
            saved and the file on our end is deleted. Estuary allows us to save message logs that are 
            problematic without the burden of storage on our end.
          </p>
          <p>
            Our next problem was connecting our machine learning models to our front end website &amp; 
            Discord. The Discord was easy enough as both the machine learning model and the discord bot 
            was coded in Python. We imported the model into our Discord bot and ran every message into 
            both machine learning models to determine whether they were problematic or not.
          </p>
          <p>
            The website was more difficult because it was made in React.JS so we needed an external app 
            to connect the front end display and back end models. We created an API endpoint in our model 
            page using FastAPI and created a server using Uvicorn. This allowed us to use the Fetch API 
            to fetch the model&apos;s prediction of the inputted sample message.
          </p>
          <p>
            As for our frontend, we developed a website to display Miso using React.JS, Javascript, 
            HTML/CSS, and Figma.
          </p>
        </div>
      ),
    },
    {
      id: "challenges",
      title: "Challenges we ran into",
      content: (
        <div className="space-y-4">
          <p>
            Some challenges we ran into were figuring out how to connect our frontend to our backend, 
            incorporate Estuary, train a custom machine learning model in Cohere, and handle certain 
            libraries, such as JSON, for the first time.
          </p>
        </div>
      ),
    },
  ];

  return (
    <ProjectTemplate
      title="Miso"
      heroImage="/miso/miso.jpg"
      role="Backend Developer"
      timeline="January 2023"
      team="4 team members"
      tools={["Python", "Cohere", "FastAPI", "Discord API", "React.js", "Estuary"]}
      sections={sections}
      backHref="/"
    />
  );
}
