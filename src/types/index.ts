export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  image: string;
  technologies: string[];
  github?: string;
  live?: string;
  challenges?: string;
  lessons?: string;
  impact?: string;
  featured?: boolean;
}

export interface Experience {
  id: string;
  title: string;
  company: string;
  period: string;
  description: string;
  responsibilities: string[];
  achievements: string[];
  technologies?: string[];
}

export interface TimelineEntry {
  id: string;
  year: string;
  title: string;
  description: string;
  icon?: string;
}

export interface SkillCategory {
  name: string;
  icon: string;
  skills: Skill[];
}

export interface Skill {
  name: string;
  level: number;
  icon?: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  category: string;
  readingTime: string;
  image?: string;
  content: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  image?: string;
  url?: string;
}

export interface CurrentlyDoing {
  work: string[];
  learning: string[];
  reading: string[];
  projects: string[];
  goals: string[];
  gym: string;
  life: string;
  travel: string;
  lastUpdated: string;
}

export interface Favorite {
  category: string;
  value: string;
  icon: string;
  description?: string;
}

export interface Hobby {
  name: string;
  icon: string;
  description?: string;
}
