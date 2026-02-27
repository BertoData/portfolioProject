"use client";

import { useState, useEffect } from "react";
import type { ProjectCategory } from "@/types/portfolio";

const categories: Array<"All" | ProjectCategory> = ["All", "Web", "Data", "Embedded", "Design"];

// small helper for toggling arrays
function toggleArray<T>(arr: T[], value: T) {
  return arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value];
}

type FilterBarProps = {
  search: string;
  onSearchChange: (value: string) => void;
  category: "All" | ProjectCategory;
  onCategoryChange: (value: "All" | ProjectCategory) => void;
  selectedTech: string[];
  onSelectedTechChange: (value: string[]) => void;
  sortBy: "Newest" | "Oldest" | "A-Z" | "Featured";
  onSortByChange: (value: "Newest" | "Oldest" | "A-Z" | "Featured") => void;
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
  const [mobileOpen, setMobileOpen] = useState(false);
  const panelClassName =
    "rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-700/80 dark:bg-zinc-800/95 dark:shadow-[0_0_0_1px_rgba(255,255,255,0.04)]";

  const content = (
    <div className={panelClassName}>
      {/* search + selects row */}
      <div className="grid gap-4 md:grid-cols-3">
        <label className="flex items-center gap-2 rounded-xl border border-zinc-200 px-3 py-2 dark:border-zinc-700">
          <span className="text-zinc-500 dark:text-zinc-400">⌕</span>
          <input
            type="search"
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search projects"
            className="w-full bg-transparent text-sm text-zinc-900 outline-none placeholder:text-zinc-400 dark:text-zinc-100 focus:ring-2 focus:ring-[var(--navy)]"
            aria-label="Search projects"
          />
        </label>
        <select
          value={category}
          onChange={(event) => onCategoryChange(event.target.value as "All" | ProjectCategory)}
          className="rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-700 outline-none transition focus:border-zinc-400 focus:ring-2 focus:ring-[var(--navy)] dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-200"
          aria-label="Filter by category"
        >
          {categories.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
        <select
          value={sortBy}
          onChange={(event) => onSortByChange(event.target.value as "Newest" | "Oldest" | "A-Z" | "Featured")}
          className="rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-700 outline-none transition focus:border-zinc-400 focus:ring-2 focus:ring-[var(--navy)] dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-200"
          aria-label="Sort projects"
        >
          <option value="Newest">Newest</option>
          <option value="Oldest">Oldest</option>
          <option value="A-Z">A-Z</option>
          <option value="Featured">Featured</option>
        </select>
      </div>

      {/* tech chips */}
      <div className="mt-4 flex flex-wrap gap-2">
        {allTech.map((tech) => {
          const selected = selectedTech.includes(tech);
          return (
            <button
              key={tech}
              type="button"
              onClick={() => onSelectedTechChange(toggleArray(selectedTech, tech))}
              className={`rounded-full px-3 py-1.5 text-sm transition focus:ring-2 focus:ring-[var(--navy)] ${
                selected
                  ? "bg-[var(--navy)] text-white dark:bg-[var(--navy)] dark:text-white"
                  : "border border-zinc-200 text-zinc-600 hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
              }`}
            >
              {tech}
            </button>
          );
        })}
      </div>

      {/* footer row */}
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

  // close drawer on escape
  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

  // mobile drawer structure
  return (
    <>
      <div className="flex items-center justify-between mb-4 md:hidden">
        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          className="rounded-full border border-zinc-200 px-3 py-1.5 text-sm text-zinc-600 transition hover:bg-zinc-100 focus:ring-2 focus:ring-[var(--navy)] dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
          aria-label="Open filters"
        >
          Filters
        </button>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          {resultCount}/{totalCount}
        </p>
      </div>
      <div className="hidden md:block">{content}</div>
      {mobileOpen && (
        <div
          className="fixed inset-0 z-50 flex bg-black/50"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) setMobileOpen(false);
          }}
        >
          <div className="h-full w-3/4 max-w-xs bg-white p-4 dark:bg-zinc-800">
            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              className="mb-4 rounded-full border border-zinc-200 px-3 py-1.5 text-sm text-zinc-600 transition hover:bg-zinc-100 focus:ring-2 focus:ring-[var(--navy)] dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
            >
              Close
            </button>
            {content}
          </div>
        </div>
      )}
    </>
  );
}
