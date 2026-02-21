import type { Project } from "@/types/portfolio";

export const projects: Project[] = [
  {
    id: "king-stats-capstone",
    title: "King Stats – Foot Pressure Analytics & Shoe Recommendation",
    oneLiner: "Pressure sensor data → dashboards → shoe recommendations.",
    description:
      "Senior Capstone building a smart foot-pressure mat to identify pressure patterns and translate them into shoe recommendations. I built the data layer: scraping shoe specs, cleaning/standardizing attributes, and designing a database + dashboard flow so sensor insights can connect to real product data.",
    category: "Data",
    tech: ["Python", "Playwright", "Pandas", "SQLite", "Power BI", "GitHub"],
    highlights: [
      "Built a Playwright scraper to collect shoe specifications and normalize messy product text into consistent fields.",
      "Designed an analytics-ready SQLite schema that supports matching sensor outputs to shoe categories and attributes.",
      "Implemented cleaning + dedup logic in Pandas to keep refreshes stable and avoid repeated product records.",
      "Created stakeholder-friendly Power BI visuals to explore trends across shoe types and attributes.",
    ],
    role: "Data Engineer + Analyst",
    timeframe: "Jan 2026 - Present",
    links: {
      github: "https://github.com/YOUR_USERNAME/king-stats",
      caseStudy: "https://yourportfolio.com/king-stats-case-study",
    },
    images: [
      "/images/Sensors.png",
    ],
    featured: true,
  },

  {
    id: "cu-hyperloop-teensy-redis-ethernet",
    title: "CU Hyperloop – Teensy Ethernet + Redis Telemetry",
    oneLiner: "Embedded networking for real-time control + data exchange.",
    description:
      "Embedded software work for CU Hyperloop focused on low-level networking and telemetry. Built reliable communication between a Teensy 4.1 Ethernet setup and a Redis server to publish/subscribe control and status messages, supporting integration across multiple controllers.",
    category: "Embedded",
    tech: ["C", "Arduino", "Teensy 4.1", "Ethernet", "Redis", "OpenCAN", "Git"],
    highlights: [
      "Implemented Ethernet connectivity on Teensy 4.1 and established messaging to a Redis backend.",
      "Built publish/subscribe functions for sending and receiving controller data over Redis channels.",
      "Worked through integration constraints across controllers and learned OpenCAN protocols to align messaging.",
      "Focused on reliability and debugging across hardware + software boundaries.",
    ],
    role: "Embedded Software Engineer",
    timeframe: "Sep 2024 - Present",
    links: {
      github: "https://github.com/YOUR_USERNAME/cu-hyperloop-telemetry",
      caseStudy: "https://yourportfolio.com/cu-hyperloop-case-study",
    },
    images: ["/images/ardinuo_pictures.png"],
    featured: true,
  },

  {
    id: "curls-on-the-block-platform",
    title: "Curls on the Block – Hair Care Recommendations Platform",
    oneLiner: "Full-stack platform to personalize hair care + boost STEM engagement.",
    description:
      "Full-stack project for a nonprofit empowering girls and women of color through natural hair confidence and STEM engagement. Built the foundation for a recommendations experience with a structured database, reusable UI components, and API routes for future recommendation logic.",
    category: "Web",
    tech: ["React", "Node.js", "TypeScript", "Express", "MySQL", "GitHub"],
    highlights: [
      "Designed a MySQL schema to support users, hair profiles, products, and recommendations.",
      "Implemented API endpoints with Express + TypeScript for CRUD workflows and future personalization logic.",
      "Built responsive React UI flows for browsing and saving recommendations.",
      "Prioritized clean data modeling so the product can scale into smarter recommendations later.",
    ],
    role: "Full-Stack Developer",
    timeframe: "Sep 2024 - Dec 2024",
    links: {
      github: "https://github.com/YOUR_USERNAME/curls-on-the-block",
      caseStudy: "https://yourportfolio.com/curls-case-study",
    },
    featured: true,
  },

  {
    id: "barbershop-website",
    title: "CU Barbershop Website",
    oneLiner: "Clean, student-friendly site with a relaxed local vibe.",
    description:
      "Designed and built a modern website for a barbershop near CU Boulder with a buffalo brand identity. Focused on clear service info, fast navigation on mobile, and a design that matches the shop’s welcoming vibe. Structured the project so a backend booking system can be added later.",
    category: "Web",
    tech: ["HTML", "CSS", "JavaScript", "React", "Figma"],
    highlights: [
      "Built a mobile-first layout optimized for quick service discovery and booking intent.",
      "Created a visual style that reflects the shop’s relaxed vibe and buffalo logo identity.",
      "Structured components so future backend booking integration is straightforward.",
      "Focused on accessibility, readable hierarchy, and clean UI polish.",
    ],
    role: "Frontend Developer",
    timeframe: "Mar 2025 - Apr 2025",
    links: {
      github: "https://github.com/YOUR_USERNAME/barbershop-site",
      live: "https://YOUR_SITE.vercel.app",
    },
    featured: true,
  },

  {
    id: "lucene-search-engine",
    title: "Lucene Search Engine Index + Query Pipeline",
    oneLiner: "Index text files and run ranked queries with Lucene.",
    description:
      "Built a search engine pipeline following Lucene fundamentals: ingesting and indexing text files, then running queries with analyzers and relevance scoring. Worked through build automation using Apache Ant and validated search behavior with test datasets.",
    category: "Data",
    tech: ["Java", "Apache Lucene", "Apache Ant", "Luke", "Git"],
    highlights: [
      "Indexed large sets of .txt documents into a Lucene index with analyzers and structured fields.",
      "Implemented query workflows to return ranked results and validate relevance behavior.",
      "Used Apache Ant for repeatable builds and Luke to inspect/verify index structure.",
      "Documented how tokenization and analyzers impacted retrieval quality.",
    ],
    role: "Search / Data Engineer",
    timeframe: "Sep 2024 - Oct 2024",
    links: {
      github: "https://github.com/YOUR_USERNAME/lucene-search-pipeline",
      caseStudy: "https://yourportfolio.com/lucene-case-study",
    },
    featured: false,
  },

  {
    id: "personal-portfolio-site",
    title: "Personal Portfolio Website",
    oneLiner: "A clean, animated portfolio built to showcase engineering work.",
    description:
      "Designed and built a portfolio website to present my projects across data, embedded systems, and web development. Prioritized strong visual hierarchy, polished UI, and an architecture that makes adding new projects effortless.",
    category: "Design",
    tech: ["Next.js", "TypeScript", "Tailwind", "Framer Motion", "Vercel"],
    highlights: [
      "Built reusable project cards and filtering so content scales cleanly as projects grow.",
      "Designed a consistent visual system (spacing, typography, components) to keep the UI cohesive.",
      "Optimized layout for mobile + desktop with accessible interaction patterns.",
      "Deployed and maintained with Vercel for fast iteration and updates.",
    ],
    role: "Designer + Frontend Engineer",
    timeframe: "Feb 2026 - Present",
    links: {
      github: "https://github.com/YOUR_USERNAME/portfolio",
      live: "https://YOUR_PORTFOLIO.vercel.app",
    },
    featured: true,
  },
  {
    id: "cu-campus-expansion-dashboard",
    title: "CU Campus Expansion Dashboard",
    oneLiner: "Analyzing campus growth through structured building data.",
    description:
      "Designed an interactive Power BI dashboard to analyze campus building expansion trends using structured datasets including square footage, year built, acquisition timelines, and zoning classifications.",
    category: "Data",
    tech: ["Power BI", "Data Modeling", "Excel", "Data Cleaning", "Visualization Design"],
    highlights: [
      "Modeled building datasets including square footage, year built, acquisition year, and campus zone classifications.",
      "Built interactive filters and time-based slicers to visualize expansion trends over time.",
      "Analyzed square footage growth patterns across MAIN_CAMP, GRANDVIEW, and OFF_CAMPUS zones.",
      "Designed stakeholder-friendly visuals to clearly communicate long-term infrastructure growth.",
    ],
    role: "Data Analyst",
    timeframe: "2025",
    links: {
      caseStudy: "https://yourportfolio.com/cu-expansion-dashboard",
      download: "/images/image.png",
    },
    images: ["/images/image.png"],
    featured: true,
  },
];