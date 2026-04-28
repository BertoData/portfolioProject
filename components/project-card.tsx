"use client";

import Link from "next/link";
import type { Project } from "@/types/portfolio";

type ProjectCardProps = {
  project: Project;
  onOpen: (project: Project) => void;
};

export function ProjectCard({ project, onOpen }: ProjectCardProps) {
  const thumb = project.images?.[0];
  return (
    <article className="group flex h-full flex-col rounded-2xl border border-zinc-200/50 bg-white/60 backdrop-blur shadow-sm transition-all duration-300 hover:shadow-lg hover:bg-white/80 hover:border-[var(--navy)]/30 hover:-translate-y-1 focus-within:ring-2 focus-within:ring-[var(--navy)]/50 dark:border-zinc-700/50 dark:bg-zinc-800/50 dark:shadow-[0_0_0_1px_rgba(255,255,255,0.04)] dark:hover:bg-zinc-800/80 dark:hover:shadow-lg dark:hover:shadow-black/20 dark:hover:border-[var(--navy)]/40 overflow-hidden">
      {thumb ? (
        <div className="relative aspect-video w-full shrink-0 bg-zinc-100/50 dark:bg-zinc-800/50">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={thumb}
            alt=""
            className="h-full w-full object-cover transition-all duration-300 group-hover:scale-105"
          />
        </div>
      ) : null}
      <div className="flex flex-1 flex-col p-5">
        <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
          {project.category}
        </p>
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">{project.title}</h3>
        <p className="mt-2 flex-1 text-sm leading-6 text-zinc-600 dark:text-zinc-300">{project.oneLiner}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {project.tech.slice(0, 3).map((item) => (
            <span
              key={item}
              className="rounded-full border border-zinc-200/50 bg-zinc-50/50 px-2.5 py-1 text-xs text-zinc-600 transition-all duration-300 hover:bg-[var(--navy)]/10 hover:text-[var(--navy)] dark:border-zinc-700/50 dark:bg-zinc-900/30 dark:text-zinc-300 dark:hover:bg-[var(--navy)]/30 dark:hover:text-[var(--navy-hover)]"
            >
              {item}
            </span>
          ))}
        </div>
        <div className="mt-5 flex items-center justify-between">
          <Link
            href={`/project/${project.id}`}
            className="text-sm font-medium text-zinc-700 underline-offset-4 transition-all duration-300 hover:text-[var(--navy)] hover:underline focus:outline-none focus:ring-2 focus:ring-[var(--navy)]/50 rounded px-1 dark:text-zinc-300 dark:hover:text-[var(--navy-hover)]"
          >
            Open page
          </Link>
          <button
            type="button"
            onClick={() => onOpen(project)}
            className="rounded-lg bg-gradient-to-br from-[var(--navy)] to-[var(--navy)]/90 px-4 py-2 text-sm font-medium text-white transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus:ring-2 focus:ring-[var(--navy)]/50 dark:to-[var(--navy-hover)]/90 dark:hover:shadow-black/20 cursor-pointer"
          >
            Details
          </button>
        </div>
      </div>
    </article>
  );
}
