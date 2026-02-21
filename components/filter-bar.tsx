"use client";

import type { ProjectCategory } from "@/types/portfolio";

const categories: Array<"All" | ProjectCategory> = ["All", "Web", "Data", "Embedded", "Design"];

type FilterBarProps = {
  search: string;
  onSearchChange: (value: string) => void;
  category: "All" | ProjectCategory;
  onCategoryChange: (value: "All" | ProjectCategory) => void;
  selectedTech: string;
  onSelectedTechChange: (value: string) => void;
  sortBy: "Newest" | "Oldest" | "A-Z";
  onSortByChange: (value: "Newest" | "Oldest" | "A-Z") => void;
  featuredOnly: boolean;
  onFeaturedOnlyChange: (value: boolean) => void;
  onReset: () => void;
  resultCount: number;
  totalCount: number;
  allTech: string[];
};

export function FilterBar({
  search,
  onSearchChange,
  category,
  onCategoryChange,
  selectedTech,
  onSelectedTechChange,
  sortBy,
  onSortByChange,
  featuredOnly,
  onFeaturedOnlyChange,
  onReset,
  resultCount,
  totalCount,
  allTech,
}: FilterBarProps) {
  return (
    <div className="mb-6 rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-700/80 dark:bg-zinc-800/95 dark:shadow-[0_0_0_1px_rgba(255,255,255,0.04)]">
      <div className="grid gap-4 md:grid-cols-[1fr_auto_auto]">
        <label className="flex items-center gap-2 rounded-xl border border-zinc-200 px-3 py-2 dark:border-zinc-700">
          <span className="text-zinc-500 dark:text-zinc-400">⌕</span>
          <input
            type="search"
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search projects by title, description, or tech..."
            className="w-full bg-transparent text-sm text-zinc-900 outline-none placeholder:text-zinc-400 dark:text-zinc-100"
            aria-label="Search projects"
          />
        </label>
        <select
          value={selectedTech}
          onChange={(event) => onSelectedTechChange(event.target.value)}
          className="rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-700 outline-none transition focus:border-zinc-400 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-200"
          aria-label="Filter by technology"
        >
          <option value="">All tech</option>
          {allTech.map((tech) => (
            <option key={tech} value={tech}>
              {tech}
          </option>
          ))}
        </select>
        <select
          value={sortBy}
          onChange={(event) => onSortByChange(event.target.value as "Newest" | "Oldest" | "A-Z")}
          className="rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-700 outline-none transition focus:border-zinc-400 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-200"
          aria-label="Sort projects"
        >
          <option value="Newest">Newest</option>
          <option value="Oldest">Oldest</option>
          <option value="A-Z">A-Z</option>
        </select>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {categories.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => onCategoryChange(item)}
            className={`rounded-full px-3 py-1.5 text-sm transition ${
              category === item
                ? "bg-[var(--navy)] text-white dark:bg-[var(--navy)] dark:text-white"
                : "border border-zinc-200 text-zinc-600 hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
            }`}
          >
            {item}
          </button>
        ))}
      </div>
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => onFeaturedOnlyChange(!featuredOnly)}
            className={`rounded-full px-3 py-1.5 text-sm transition ${
              featuredOnly
                ? "bg-[var(--navy)] text-white dark:bg-[var(--navy)] dark:text-white"
                : "border border-zinc-200 text-zinc-600 hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
            }`}
          >
            Featured only
          </button>
          <button
            type="button"
            onClick={onReset}
            className="rounded-full border border-zinc-200 px-3 py-1.5 text-sm text-zinc-600 transition hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
          >
            Clear filters
          </button>
        </div>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Showing {resultCount} of {totalCount} projects
        </p>
      </div>
    </div>
  );
}
