import portfolio from "../data/portfolio.json";

export interface Contact {
  phone: string;
  email: string;
}

export interface SocialLink {
  platform: string;
  url: string;
}

export interface PersonalInfo {
  name: string;
  title: string;
  profile_image: string;
  location: string;
  contact: Contact;
  social_links: SocialLink[];
  cv_download: string;
  about_me: string;
}

export interface Skills {
  soft_skills: string[];
  technical_skills: string[];
}

export interface EducationItem {
  degree: string;
  institution: string;
  date_range: string;
}

export interface ExperienceItem {
  title: string;
  company: string;
  location: string;
  date_range: string;
  description_points: string[];
}

export interface ProjectLink {
  type: string;
  url: string;
}

export interface Project {
  name: string;
  cover_image: string;
  short_description: string;
  description: string;
  features: string[];
  technologies_used: string[];
  links: ProjectLink[];
  media: string[];
}

export interface PortfolioData {
  personal_info: PersonalInfo;
  projects_num: string;
  experience_num: string;
  customers_num: string;
  skills: Skills;
  education: EducationItem[];
  experience: ExperienceItem[];
  projects: Project[];
}

const data = portfolio as PortfolioData;

export function getPortfolio(): PortfolioData {
  return data;
}

export function getPersonalInfo(): PersonalInfo {
  return data.personal_info;
}

export function getStats() {
  return {
    projects: Number(data.projects_num) || 0,
    experience: Number(data.experience_num) || 0,
    customers: Number(data.customers_num) || 0,
  };
}

export function getSkills(): Skills {
  return data.skills;
}

export function getEducation(): EducationItem[] {
  return data.education;
}

export function getExperience(): ExperienceItem[] {
  return data.experience;
}

export function getProjects(): Project[] {
  return data.projects;
}
