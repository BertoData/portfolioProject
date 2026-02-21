"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ThemeToggle } from "@/components/theme-toggle";
import type { Project } from "@/types/portfolio";

const DROPDOWN_LIST_ID = "navbar-projects-dropdown";
const RECENT_PROJECTS_LIMIT = 5;

const sections = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];

type NavbarProps = {
  projects: Project[];
  onOpenProject: (id: string) => void;
};

function getStartYear(timeframe: string): number {
  const match = timeframe.match(/\d{4}/);
  return match ? Number.parseInt(match[0], 10) : 0;
}

export function Navbar({ projects, onOpenProject }: NavbarProps) {
  const [activeSection, setActiveSection] = useState("home");
  const [projectsDropdownOpen, setProjectsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const recentProjects = useMemo(() => {
    return [...projects]
      .sort((a, b) => getStartYear(b.timeframe) - getStartYear(a.timeframe))
      .slice(0, RECENT_PROJECTS_LIMIT);
  }, [projects]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries.find((entry) => entry.isIntersecting);
        if (visibleEntry) {
          setActiveSection(visibleEntry.target.id);
        }
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0.1 },
    );

    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!projectsDropdownOpen) return;

    const handleMousedown = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setProjectsDropdownOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setProjectsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleMousedown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleMousedown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [projectsDropdownOpen]);

  function handleProjectSelect(project: Project) {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
    onOpenProject(project.id);
    setProjectsDropdownOpen(false);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200/70 bg-white/85 backdrop-blur dark:border-slate-700 dark:bg-slate-900/90">
      <nav className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <a href="#home" className="text-sm font-semibold tracking-wide text-[var(--navy)] dark:text-[var(--navy-hover)]">
          Portfolio
        </a>
        <div className="flex items-center gap-2 sm:gap-4">
          <ul className="hidden items-center gap-1 sm:flex">
            {sections.map((section) => (
              <li key={section.id}>
                {section.id === "projects" ? (
                  <div ref={dropdownRef} className="relative">
                    <button
                      type="button"
                      onClick={() => setProjectsDropdownOpen((open) => !open)}
                      aria-expanded={projectsDropdownOpen}
                      aria-haspopup="true"
                      aria-controls={DROPDOWN_LIST_ID}
                      className={`flex items-center gap-1 rounded-full px-3 py-1.5 text-sm transition ${
                        activeSection === section.id
                          ? "bg-[var(--navy)] text-white dark:bg-[var(--navy)] dark:text-white"
                          : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
                      }`}
                    >
                      {section.label}
                      <span className="ml-0.5 inline-block size-3.5 shrink-0 translate-y-px" aria-hidden>
                        ▾
                      </span>
                    </button>
                    {projectsDropdownOpen && (
                      <ul
                        id={DROPDOWN_LIST_ID}
                        role="menu"
                        className="absolute left-0 top-full z-50 mt-1 min-w-[12rem] rounded-xl border border-zinc-200 bg-white py-1 shadow-lg dark:border-zinc-600 dark:bg-zinc-800/98 dark:shadow-[0_0_0_1px_rgba(255,255,255,0.04)]"
                      >
                        {recentProjects.map((project) => (
                          <li key={project.id} role="none">
                            <button
                              type="button"
                              role="menuitem"
                              onClick={() => handleProjectSelect(project)}
                              className="w-full px-3 py-2 text-left text-sm text-zinc-700 hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-zinc-800"
                            >
                              {project.title}
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ) : (
                  <a
                    href={`#${section.id}`}
                    className={`rounded-full px-3 py-1.5 text-sm transition ${
                      activeSection === section.id
                        ? "bg-[var(--navy)] text-white dark:bg-[var(--navy)] dark:text-white"
                        : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
                    }`}
                  >
                    {section.label}
                  </a>
                )}
              </li>
            ))}
          </ul>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
