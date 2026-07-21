import type {
  Project,
  Experience,
  TimelineEntry,
  SkillCategory,
  Certification,
  Favorite,
  Hobby,
} from "@/types";

export const projects: Project[] = [
  {
    id: "1",
    title: "Business Process Automation Dashboard",
    description:
      "An internal analytics dashboard that automates reporting workflows, reducing manual effort by 60%.",
    image: "/projects/dashboard.svg",
    technologies: ["React", "TypeScript", "Node.js", "PostgreSQL"],
    featured: true,
    challenges:
      "Integrating multiple legacy data sources into a unified view while maintaining data accuracy.",
    lessons:
      "Learned the importance of stakeholder alignment and iterative prototyping in enterprise environments.",
    impact:
      "Saved the operations team 20+ hours per week in manual reporting tasks.",
  },
  {
    id: "2",
    title: "Portfolio Website",
    description:
      "A premium personal portfolio built with Next.js, featuring Apple-inspired design and smooth animations.",
    image: "/projects/portfolio.svg",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    github: "https://github.com/emmanuelsimbulan/portfolio",
    live: "https://emmanuelsimbulan.dev",
    featured: true,
    challenges:
      "Achieving buttery-smooth animations while maintaining a perfect Lighthouse score.",
    lessons:
      "Performance and beauty are not mutually exclusive when you architect thoughtfully.",
    impact:
      "A living showcase of my growth, values, and technical capabilities.",
  },
  {
    id: "3",
    title: "E-Commerce Platform",
    description:
      "A full-stack e-commerce solution with payment integration, inventory management, and admin dashboard.",
    image: "/projects/ecommerce.svg",
    technologies: ["Next.js", "Stripe", "MongoDB", "Tailwind CSS"],
    github: "https://github.com/emmanuelsimbulan/ecommerce",
    live: "https://ecommerce-demo.vercel.app",
    featured: true,
    challenges:
      "Implementing secure payment flows and real-time inventory synchronization.",
    lessons:
      "End-to-end product thinking—from database schema to UI polish—is what separates good from great.",
    impact:
      "Demonstrates full-stack capability from architecture to deployment.",
  },
  {
    id: "4",
    title: "Task Management App",
    description:
      "A collaborative project management tool with real-time updates and team features.",
    image: "/projects/taskapp.svg",
    technologies: ["React", "Firebase", "Tailwind CSS"],
    github: "https://github.com/emmanuelsimbulan/taskapp",
    challenges:
      "Designing an intuitive UX that works for both technical and non-technical users.",
    lessons:
      "Great software starts with understanding the people who use it.",
  },
];

export const experiences: Experience[] = [
  {
    id: "1",
    title: "Business Analyst",
    company: "Current Role",
    period: "Present",
    description:
      "Bridging the gap between business needs and technology solutions. Driving process improvements, requirements gathering, and stakeholder alignment.",
    responsibilities: [
      "Leading requirements elicitation and documentation for enterprise projects",
      "Facilitating stakeholder workshops and sprint ceremonies",
      "Translating business requirements into technical specifications",
      "Analyzing data to identify process improvement opportunities",
      "Collaborating with development teams in Agile environments",
    ],
    achievements: [
      "Reduced reporting time by 60% through process automation",
      "Successfully delivered 10+ business-critical projects",
      "Implemented Agile methodologies across the team",
      "Created comprehensive documentation adopted company-wide",
    ],
    technologies: ["Jira", "Confluence", "SQL", "Excel", "Figma", "Azure"],
  },
  {
    id: "2",
    title: "Software Engineering Journey",
    company: "Self-Directed & Projects",
    period: "Ongoing",
    description:
      "Continuously growing my engineering skills through personal projects, open-source contributions, and professional development.",
    responsibilities: [
      "Building full-stack web applications with modern frameworks",
      "Learning system design and software architecture patterns",
      "Contributing to open-source projects",
      "Exploring cloud platforms and DevOps practices",
    ],
    achievements: [
      "Built multiple production-quality applications",
      "Achieved proficiency in React, Next.js, and TypeScript",
      "Deployed applications on Vercel, GitHub Pages, and cloud platforms",
      "Developed a strong understanding of database design and APIs",
    ],
    technologies: [
      "React",
      "Next.js",
      "TypeScript",
      "Node.js",
      "Python",
      "PostgreSQL",
    ],
  },
];

export const timeline: TimelineEntry[] = [
  {
    id: "1",
    year: "Early Years",
    title: "Discovering Curiosity",
    description:
      "Growing up with a natural curiosity about how things work. Always asking questions and seeking to understand the world around me.",
    icon: "🌱",
  },
  {
    id: "2",
    year: "School Days",
    title: "Academic Foundation",
    description:
      "Building a strong academic foundation. Excelling in mathematics, problem-solving, and developing a love for learning.",
    icon: "📚",
  },
  {
    id: "3",
    year: "First Encounter",
    title: "Discovering Programming",
    description:
      "The moment everything changed. Writing my first line of code and realizing the power of technology to solve real problems.",
    icon: "💻",
  },
  {
    id: "4",
    year: "Deep Dive",
    title: "Learning Software Development",
    description:
      "Immersing myself in software development. Learning web technologies, building projects, and understanding the art of creating digital products.",
    icon: "🚀",
  },
  {
    id: "5",
    year: "Career Start",
    title: "Becoming a Business Analyst",
    description:
      "Finding my sweet spot at the intersection of business and technology. Learning to understand problems deeply before building solutions.",
    icon: "📊",
  },
  {
    id: "6",
    year: "Professional Growth",
    title: "Working with Agile",
    description:
      "Embracing Agile methodologies. Understanding that great software is built through collaboration, iteration, and continuous improvement.",
    icon: "🔄",
  },
  {
    id: "7",
    year: "Architecture",
    title: "Learning System Design",
    description:
      "Going beyond code to understand how systems are designed. Learning about scalability, reliability, and the principles that make software truly robust.",
    icon: "🏗️",
  },
  {
    id: "8",
    year: "Present",
    title: "Building the Future",
    description:
      "Combining business acumen with engineering excellence. Working toward becoming a world-class software engineer who builds products that matter.",
    icon: "✨",
  },
  {
    id: "9",
    year: "Future",
    title: "World-Class Engineer",
    description:
      "The goal: to be a world-class software engineer who leads with empathy, builds with purpose, and creates technology that genuinely improves lives.",
    icon: "🌍",
  },
];

export const skillCategories: SkillCategory[] = [
  {
    name: "Business Analysis",
    icon: "📊",
    skills: [
      { name: "Requirements Gathering", level: 95 },
      { name: "Process Mapping", level: 90 },
      { name: "Stakeholder Management", level: 92 },
      { name: "Data Analysis", level: 88 },
      { name: "Documentation", level: 93 },
    ],
  },
  {
    name: "Software Engineering",
    icon: "💻",
    skills: [
      { name: "JavaScript", level: 88 },
      { name: "TypeScript", level: 85 },
      { name: "React", level: 87 },
      { name: "Next.js", level: 85 },
      { name: "Node.js", level: 82 },
    ],
  },
  {
    name: "Frontend",
    icon: "🎨",
    skills: [
      { name: "HTML/CSS", level: 92 },
      { name: "Tailwind CSS", level: 88 },
      { name: "Framer Motion", level: 78 },
      { name: "UI/UX Design", level: 80 },
      { name: "Responsive Design", level: 90 },
    ],
  },
  {
    name: "Backend",
    icon: "⚙️",
    skills: [
      { name: "Node.js", level: 82 },
      { name: "Express", level: 80 },
      { name: "Python", level: 78 },
      { name: "REST APIs", level: 85 },
      { name: "Java", level: 72 },
    ],
  },
  {
    name: "Databases",
    icon: "🗄️",
    skills: [
      { name: "PostgreSQL", level: 82 },
      { name: "MySQL", level: 80 },
      { name: "MongoDB", level: 78 },
      { name: "Firebase", level: 76 },
      { name: "SQL", level: 85 },
    ],
  },
  {
    name: "Cloud & DevOps",
    icon: "☁️",
    skills: [
      { name: "Git/GitHub", level: 88 },
      { name: "Vercel", level: 85 },
      { name: "Docker", level: 70 },
      { name: "Azure", level: 72 },
      { name: "AWS", level: 68 },
    ],
  },
  {
    name: "Agile & Project Management",
    icon: "🔄",
    skills: [
      { name: "Scrum", level: 90 },
      { name: "Kanban", level: 88 },
      { name: "Jira", level: 92 },
      { name: "Confluence", level: 90 },
      { name: "Sprint Planning", level: 88 },
    ],
  },
  {
    name: "Tools & Design",
    icon: "🛠️",
    skills: [
      { name: "VS Code", level: 92 },
      { name: "Figma", level: 80 },
      { name: "Postman", level: 85 },
      { name: "Swagger", level: 78 },
      { name: "Linux", level: 75 },
    ],
  },
];

export const techStack = [
  { name: "HTML", icon: "SiHtml5" },
  { name: "CSS", icon: "SiCss3" },
  { name: "JavaScript", icon: "SiJavascript" },
  { name: "TypeScript", icon: "SiTypescript" },
  { name: "React", icon: "SiReact" },
  { name: "Next.js", icon: "SiNextdotjs" },
  { name: "Node.js", icon: "SiNodedotjs" },
  { name: "Express", icon: "SiExpress" },
  { name: "Java", icon: "SiJava" },
  { name: "Spring Boot", icon: "SiSpringboot" },
  { name: "Python", icon: "SiPython" },
  { name: "PostgreSQL", icon: "SiPostgresql" },
  { name: "MySQL", icon: "SiMysql" },
  { name: "MongoDB", icon: "SiMongodb" },
  { name: "Firebase", icon: "SiFirebase" },
  { name: "Git", icon: "SiGit" },
  { name: "GitHub", icon: "SiGithub" },
  { name: "GitLab", icon: "SiGitlab" },
  { name: "Jira", icon: "SiJira" },
  { name: "Confluence", icon: "SiConfluence" },
  { name: "Figma", icon: "SiFigma" },
  { name: "Docker", icon: "SiDocker" },
  { name: "Vercel", icon: "SiVercel" },
  { name: "VS Code", icon: "SiVisualstudiocode" },
  { name: "Postman", icon: "SiPostman" },
  { name: "REST API", icon: "SiSwagger" },
  { name: "Linux", icon: "SiLinux" },
  { name: "Azure", icon: "SiMicrosoftazure" },
  { name: "AWS", icon: "SiAmazonwebservices" },
  { name: "OpenAI", icon: "SiOpenai" },
];

export const certifications: Certification[] = [
  {
    id: "1",
    name: "Professional Business Analysis",
    issuer: "PMI",
    date: "2023",
    url: "#",
  },
  {
    id: "2",
    name: "Agile Certified Practitioner",
    issuer: "PMI",
    date: "2023",
    url: "#",
  },
  {
    id: "3",
    name: "Azure Fundamentals",
    issuer: "Microsoft",
    date: "2024",
    url: "#",
  },
];

export const favorites: Favorite[] = [
  { category: "Programming Language", value: "TypeScript", icon: "💎", description: "Type safety with elegance" },
  { category: "Framework", value: "Next.js", icon: "▲", description: "The full-stack React framework" },
  { category: "Book", value: "Clean Code", icon: "📖", description: "By Robert C. Martin" },
  { category: "Movie", value: "The Pursuit of Happyness", icon: "🎬", description: "Never give up" },
  { category: "Music", value: "Lo-fi Hip Hop", icon: "🎵", description: "Focus and flow state" },
  { category: "Football Club", value: "FC Barcelona", icon: "⚽", description: "Més que un club" },
  { category: "Developer", value: "Dan Abramov", icon: "👨‍💻", description: "Simplicity in complexity" },
  { category: "Technology", value: "AI & LLMs", icon: "🤖", description: "The future of computing" },
  { category: "Coffee", value: "Pour Over", icon: "☕", description: "Patience in every drop" },
  { category: "Place", value: "My Desk", icon: "🪑", description: "Where ideas come alive" },
  { category: "Food", value: "Sushi", icon: "🍣", description: "Simple perfection" },
];

export const hobbies: Hobby[] = [
  { name: "Gym & Fitness", icon: "🏋️", description: "Building strength and discipline" },
  { name: "Football", icon: "⚽", description: "Teamwork and strategy" },
  { name: "Coding", icon: "💻", description: "Creating and solving problems" },
  { name: "Gaming", icon: "🎮", description: "Strategy and relaxation" },
  { name: "Coffee", icon: "☕", description: "The fuel for creativity" },
  { name: "Learning", icon: "📖", description: "Continuous growth" },
  { name: "Music", icon: "🎵", description: "Rhythm and inspiration" },
  { name: "Traveling", icon: "✈️", description: "Exploring new perspectives" },
  { name: "Photography", icon: "📷", description: "Capturing moments" },
];
