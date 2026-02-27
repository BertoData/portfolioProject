"use client";

import { useEffect, useMemo, useState } from "react";
import { FilterBar } from "@/components/filter-bar";
import { ProjectCard } from "@/components/project-card";
import { ProjectModal } from "@/components/project-modal";
import type { Project, ProjectCategory } from "@/types/portfolio";

type ProjectsSectionProps = {
  projects: Project[];
  projectIdToOpen?: string | null;
  onClearProjectIdToOpen?: () => void;
};

export function ProjectsSection({
  projects,
  projectIdToOpen = null,
  onClearProjectIdToOpen,
}: ProjectsSectionProps) {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [category, setCategory] = useState<"All" | ProjectCategory>("All");
  const [selectedTech, setSelectedTech] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<"Newest" | "Oldest" | "A-Z" | "Featured">("Newest");
  const [featuredOnly, setFeaturedOnly] = useState(false);
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const allTech = useMemo(
    () =>
      Array.from(new Set(projects.flatMap((project) => project.tech))).sort((a, b) => a.localeCompare(b)),
    [projects],
  );

  const getStartYear = (project: Project) => {
    if (project.date) {
      return new Date(project.date).getFullYear();
    }
    const match = project.timeframe.match(/\d{4}/);
    return match ? Number.parseInt(match[0], 10) : 0;
  };

  const filteredProjects = useMemo(() => {
    const query = debouncedSearch.trim().toLowerCase();

    return projects
      .filter((project) => {
        const categoryMatch = category === "All" || project.category === category;
        const techMatch =
          selectedTech.length === 0 || selectedTech.some((t) => project.tech.includes(t));
        const featuredMatch = !featuredOnly || project.featured;
        const textMatch =
          !query ||
          project.title.toLowerCase().includes(query) ||
          project.oneLiner.toLowerCase().includes(query) ||
          project.description.toLowerCase().includes(query) ||
          project.tech.some((item) => item.toLowerCase().includes(query));

        return categoryMatch && techMatch && featuredMatch && textMatch;
      })
      .sort((a, b) => {
        if (sortBy === "A-Z") {
          return a.title.localeCompare(b.title);
        }
        if (sortBy === "Featured") {
          return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
        }

        const yearA = getStartYear(a);
        const yearB = getStartYear(b);

        if (sortBy === "Oldest") {
          return yearA - yearB;
        }

        return yearB - yearA;
      });
  }, [projects, debouncedSearch, category, selectedTech, featuredOnly, sortBy]);

  function resetFilters() {
    setSearch("");
    setCategory("All");
    setSelectedTech([]);
    setSortBy("Newest");
    setFeaturedOnly(false);
  }

  function openModal(project: Project) {
    setActiveProject(project);
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
    setTimeout(() => {
      setActiveProject(null);
    }, 200);
    onClearProjectIdToOpen?.();
  }

  // debounce search input
  useEffect(() => {
    const timer = window.setTimeout(() => setDebouncedSearch(search), 250);
    return () => clearTimeout(timer);
  }, [search]);

  // open modal if url param triggered
  useEffect(() => {
    if (!projectIdToOpen || !onClearProjectIdToOpen) return;
    const project = projects.find((p) => p.id === projectIdToOpen);
    if (!project) return;
    const timer = window.setTimeout(() => {
      setActiveProject(project);
      setIsModalOpen(true);
      onClearProjectIdToOpen();
    }, 0);
    return () => window.clearTimeout(timer);
  }, [projectIdToOpen, projects, onClearProjectIdToOpen]);

  // modal navigation
  const currentIndex = activeProject
    ? filteredProjects.findIndex((p) => p.id === activeProject.id)
    : -1;
  const prevProject = currentIndex > 0 ? filteredProjects[currentIndex - 1] : null;
  const nextProject = currentIndex >= 0 && currentIndex < filteredProjects.length - 1 ? filteredProjects[currentIndex + 1] : null;

  return (
    <>
      <FilterBar
        search={search}
        onSearchChange={setSearch}
        category={category}
        onCategoryChange={setCategory}
        selectedTech={selectedTech}
        onSelectedTechChange={setSelectedTech}
        sortBy={sortBy}
        onSortByChange={setSortBy}
        featuredOnly={featuredOnly}
        onFeaturedOnlyChange={setFeaturedOnly}
        onReset={resetFilters}
        resultCount={filteredProjects.length}
        totalCount={projects.length}
        allTech={allTech}
      />

      {filteredProjects.length === 0 ? (
        <div className="space-y-4">
          <p className="rounded-2xl border border-dashed border-zinc-300 bg-white p-6 text-sm text-zinc-600 dark:border-zinc-700/80 dark:bg-zinc-800/95 dark:text-zinc-300 dark:shadow-[0_0_0_1px_rgba(255,255,255,0.04)]">
            No projects match these filters.
          </p>
          {search && (
            <button
              type="button"
              onClick={() => setSearch("")}
              className="rounded-full border border-zinc-200 px-4 py-2 text-sm text-zinc-700 transition hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-800"
            >
              Clear search
            </button>
          )}
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} onOpen={openModal} />
          ))}
        </div>
      )}

      <ProjectModal
        project={activeProject}
        isOpen={isModalOpen}
        onClose={closeModal}
        prevProject={prevProject}
        nextProject={nextProject}
        onPrev={() => prevProject && openModal(prevProject)}
        onNext={() => nextProject && openModal(nextProject)}
      />
    </>
  );
}
