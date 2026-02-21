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
    <article className="group flex h-full flex-col rounded-2xl border border-zinc-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-zinc-700/80 dark:bg-zinc-800/95 dark:shadow-[0_0_0_1px_rgba(255,255,255,0.04)] dark:hover:shadow-[0_8px_30px_rgba(0,0,0,0.4),0_0_0_1px_rgba(255,255,255,0.06)] overflow-hidden">
      {thumb ? (
        <div className="relative aspect-video w-full shrink-0 bg-zinc-100 dark:bg-zinc-800">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={thumb}
            alt=""
            className="h-full w-full object-cover"
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
            className="rounded-full border border-zinc-200 px-2.5 py-1 text-xs text-zinc-600 dark:border-zinc-700 dark:text-zinc-300"
          >
            {item}
          </span>
        ))}
      </div>
      <div className="mt-5 flex items-center justify-between">
        <Link
          href={`/project/${project.id}`}
          className="text-sm font-medium text-zinc-700 underline-offset-4 hover:underline dark:text-zinc-300"
        >
          Open page
        </Link>
        <button
          type="button"
          onClick={() => onOpen(project)}
          className="rounded-full bg-[var(--navy)] px-4 py-2 text-sm font-medium text-white transition hover:bg-[var(--navy-hover)] dark:bg-[var(--navy)] dark:hover:bg-[var(--navy-hover)]"
        >
          Details
        </button>
      </div>
      </div>
    </article>
  );
}
