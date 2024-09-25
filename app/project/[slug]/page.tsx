import { Footer } from "@/components/footer";
import { Project } from "@/components/project";
import { Button } from "@/components/ui/button";
interface ProjectPageProps {
  params: {
    slug: string;
  };
}

const dtimes = {
  name: "Dtimes",
  header: "Dtimes A Full-Stack News Web Application",
  src: "https://www.dtimes.online",
  quote:
    "In the era of information, delivering the truth is the greatest service.",
  description:
    "Dinhata Times is a local news website I built where admins can easily manage and publish news content. I used Django for the backend to handle things like articles, categories, and user management, while Next.js powers the frontend, making the site fast and good for SEO. Admins log in securely through Next Auth and can add, edit, or delete articles, and they also have an editable profile page to update their own info. It’s designed to be super easy to use, both for the admins managing content and for visitors browsing the latest local news.",
  steps: [
    {
      title: "Planning & Requirements",
      description:
        "First, I had a discussion with the client to understand what they needed. The main focus was to build a news website where they could post local news, manage articles easily, and have a clean, user-friendly design. Some key features we decided on included a custom admin panel, authentication, and the ability for admins to update their profiles.",
    },
    {
      title: "Designing the Architecture",
      description:
        "Once I had the requirements, I planned out the architecture. I used Django for the backend because it’s powerful and makes handling the database easy. PostgreSQL was chosen for the database, as it works great for handling large amounts of data. For the frontend, I went with Next.js to help with server-side rendering, which is important for SEO. Tailwind was picked for styling to make things responsive and clean.",
    },
    {
      title: "Backend Development with Django",
      description:
        "I started building the backend using Django. I created models to store all the news articles, categories, and admin details. A REST API was built so the frontend could communicate with the backend seamlessly. For the database, I set up PostgreSQL to manage everything efficiently. Authentication was handled using Next Auth to make sure only authorized admins could access the control panel.",
    },
    {
      title: "Frontend Development with Next.js & Tailwind",
      description:
        "For the frontend, I used Next.js to build a fast, dynamic interface. I also added Tailwind CSS to design the website and make it responsive. Using Shadcn, I built reusable components for things like buttons and modals to keep the design consistent. The result was a smooth, user-friendly site where visitors can browse news articles and filter by categories.",
    },
    {
      title: "Custom Admin Panel",
      description:
        "One of the main tasks was building a custom admin panel so the client could easily manage their content. This was done using Django’s admin capabilities, but I customized it a lot to suit the client’s needs. The admin could add, edit, and delete news articles, manage categories, and update their profiles directly from this panel.",
    },
    {
      title: "Next Auth Integration",
      description:
        "To handle authentication, I integrated Next Auth so that only authorized admins could log in and manage the site. Admins could also update their own profile details, like their email and password, through a secure profile page.",
    },
    {
      title: "Testing & Debugging",
      description:
        "Once everything was set up, I tested the site thoroughly to make sure all the features worked smoothly. I fixed any bugs I found, especially focusing on user authentication, article management, and the overall user experience.",
    },
    {
      title: "Deployment & Maintenance",
      description:
        "After testing, I deployed the site. I set up a continuous deployment process to make future updates easier. Since launch, I’ve also been providing ongoing maintenance, checking for any performance issues and ensuring everything is secure.",
    },
    {
      title: "Final Handover",
      description:
        "Once the site was live, I handed it over to the client with full documentation on how to use the admin panel, manage content, and make updates. I’m also available for future support and updates if needed.",
    },
  ],
  btnDiv: (
    <div className="flex gap-2 items-center">
      <Button className="bg-emerald-700 hover:bg-emerald-600 shadow-[0_0_45px_1px_rgba(4,120,87,0.5)]">
        Django
      </Button>
      <Button className="bg-red-700  hover:bg-red-600 shadow-[0_0_45px_1px_rgba(255,0,0,0.5)]">
        Full Stack
      </Button>
      <Button className="bg-white/90 hover:bg-white text-black shadow-[0_0_45px_1px_rgba(255,255,255,0.5)]">
        Next.js
      </Button>
    </div>
  ),
};
const projectPlannerAI = {
  name: "Project Planner AI",
  header: "Project Planner AI - Your Personalized Project Planning Tool",
  src: "https://project-planner-ai-ebon.vercel.app",
  quote: "Every great project begins with a well-thought-out plan.",
  description:
    "I built Project Planner AI to help users create personalized project plans based on their skills, experience level, and budget. After learning new tech stacks, I thought it would be really useful to have an AI that can generate plans tailored to what users need. With this tool, users can input their skills and preferences, and the AI creates a plan just for them. They can also mark projects as completed or delete them, and everything gets stored in a MongoDB database. I designed a modern user interface using Next.js and Shadcn, and secured user logins with Next Auth. Plus, users can update their profiles whenever they want.",
  steps: [
    {
      title: "Idea and Planning",
      description:
        "I came up with the idea for this project when I realized how helpful it would be to have an AI generate plans for various projects based on the skills and resources users have. This led me to outline the core features and functionalities that would make the tool really effective.",
    },
    {
      title: "Designing the Architecture",
      description:
        "I decided on using Next.js for the frontend to create a fast and responsive user experience. MongoDB was chosen for the backend to store user data and project plans efficiently. The architecture was designed to allow easy interaction between the frontend and backend.",
    },
    {
      title: "Backend Development with MongoDB",
      description:
        "I set up the backend using Node.js and connected it to MongoDB. This allowed me to create models for user data and project plans, enabling efficient data storage and retrieval. I also implemented APIs to handle requests from the frontend.",
    },
    {
      title: "Frontend Development with Next.js & Shadcn",
      description:
        "For the frontend, I used Next.js to build a clean, modern interface. Shadcn was used to create reusable components that kept the design consistent throughout the application. The user experience was prioritized to ensure that users could easily navigate and interact with the tool.",
    },
    {
      title: "User Authentication with Next Auth",
      description:
        "To keep user data secure, I integrated Next Auth for authentication. This ensures that users have a safe way to log in and manage their profiles. They can also easily update their information whenever they want.",
    },
    {
      title: "Testing and Feedback",
      description:
        "Once everything was in place, I conducted testing to ensure all features worked as intended. I also gathered feedback from potential users to make improvements and adjustments to the application.",
    },
    {
      title: "Deployment & Maintenance",
      description:
        "After testing, I deployed the application, making it accessible to users. I also set up ongoing maintenance to monitor performance and address any issues that arise.",
    },
    {
      title: "Final Touches and Handover",
      description:
        "With the application live, I added the final touches and made sure everything was functioning well. I documented the features and provided guidance on how to use the tool effectively.",
    },
  ],
  btnDiv: (
    <div className="flex gap-2 items-center">
      <Button className="bg-emerald-700 hover:bg-emerald-600 shadow-[0_0_45px_1px_rgba(4,120,87,0.5)]">
        AI
      </Button>
      <Button className="bg-red-700  hover:bg-red-600 shadow-[0_0_45px_1px_rgba(255,0,0,0.5)]">
        Project Management
      </Button>
      <Button className="bg-white/90 hover:bg-white text-black shadow-[0_0_45px_1px_rgba(255,255,255,0.5)]">
        Next.js
      </Button>
    </div>
  ),
};

const ProjectPage = ({ params }: ProjectPageProps) => {
  if (params.slug !== "dtimes-news" && params.slug !== "project-planner-ai") {
    return <div>not found</div>;
  }
  return (
    <Project
      project={params.slug === "dtimes-news" ? dtimes : projectPlannerAI}
    />
  );
};

export default ProjectPage;
