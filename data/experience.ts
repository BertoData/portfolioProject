import type { ExperienceItem } from "@/types/portfolio";

export const experience: ExperienceItem[] = [
  {
    id: "exp-1",
    role: "Data Analyst Intern",
    organization: "MKS Instruments",
    timeframe: "Summer 2025",
    summary:
      "Applied structured data analysis to improve internal IT and engineering workflows.",
    points: [
      "Analyzed recurring service tickets to identify operational bottlenecks and reduce repeat incidents.",
      "Organized and cleaned internal operational datasets to improve reporting accuracy.",
      "Developed internal tools to automate repetitive validation processes.",
      "Translated operational data into structured documentation and measurable workflow improvements."
    ],
  },
  {
    id: "exp-2",
    role: "Data Analytics Contributor",
    organization: "Senior Capstone – King Stats",
    timeframe: "2025 – Present",
    summary:
      "Building a data pipeline that converts raw foot pressure sensor data into structured analytics for shoe performance insights.",
    points: [
      "Developed a Playwright web scraping pipeline to collect structured shoe specification data.",
      "Designed and maintained a SQLite database to integrate biomechanical sensor outputs with product attributes.",
      "Used Pandas to clean, normalize, and transform raw datasets for downstream analysis.",
      "Focused on translating raw sensor data into interpretable performance metrics."
    ],
  },
  {
    id: "exp-3",
    role: "Data-Focused Web Developer",
    organization: "Freelance & Campus Clients",
    timeframe: "2024 – 2025",
    summary:
      "Built web applications with structured data integration and performance analytics.",
    points: [
      "Designed front-end dashboards to display structured datasets clearly and intuitively.",
      "Optimized performance metrics using Lighthouse analytics.",
      "Maintained version-controlled deployment pipelines.",
      "Worked directly with clients to identify useful data-driven features."
    ],
  },
];