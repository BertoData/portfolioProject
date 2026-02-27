export type ProjectCategory = "Web" | "Data" | "Embedded" | "Design";

export type ProjectLinkSet = {
  github?: string;
  live?: string;
  caseStudy?: string;
  /** Path or URL to a file for download (e.g. /downloads/project-name.pdf) */
  download?: string;
};

export type Project = {
  id: string;
  title: string;
  oneLiner: string;
  description: string;
  category: ProjectCategory;
  tech: string[];
  highlights: string[];
  role: string;
  timeframe: string;
  /** optional ISO date string for the project (e.g. start date) */
  date?: string;
  links: ProjectLinkSet;
  images?: string[];
  featured: boolean;
};

export type ExperienceItem = {
  id: string;
  role: string;
  organization: string;
  timeframe: string;
  summary: string;
  points: string[];
};

export type SkillGroup = {
  category: string;
  items: string[];
};
