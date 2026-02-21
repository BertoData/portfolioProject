import type { Project } from "@/types/portfolio";

type ProjectDetailProps = {
  project: Project;
};

export function ProjectDetail({ project }: ProjectDetailProps) {
  return (
    <article className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-700/80 dark:bg-zinc-800/95 dark:shadow-[0_0_0_1px_rgba(255,255,255,0.04)]">
      <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">{project.category}</p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">{project.title}</h1>
      <p className="mt-3 text-sm leading-6 text-zinc-600 dark:text-zinc-300">{project.description}</p>

      {project.images && project.images.length > 0 ? (
        <div className="mt-6">
          <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Screenshots</h2>
          <div className="mt-2 grid gap-3 sm:grid-cols-2">
            {project.images.map((src, i) => (
              <div key={i} className="relative aspect-video overflow-hidden rounded-xl border border-zinc-200 bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-800">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt="" className="h-full w-full object-cover" />
              </div>
            ))}
          </div>
        </div>
      ) : null}

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-zinc-200 p-4 dark:border-zinc-700">
          <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Role</h2>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">{project.role}</p>
        </div>
        <div className="rounded-xl border border-zinc-200 p-4 dark:border-zinc-700">
          <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Timeframe</h2>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">{project.timeframe}</p>
        </div>
      </div>

      <h2 className="mt-6 text-sm font-semibold text-zinc-900 dark:text-zinc-100">Highlights</h2>
      <ul className="mt-2 space-y-2 text-sm text-zinc-600 dark:text-zinc-300">
        {project.highlights.map((item) => (
          <li key={item} className="rounded-lg border border-zinc-200 px-3 py-2 dark:border-zinc-700">
            {item}
          </li>
        ))}
      </ul>

      <h2 className="mt-6 text-sm font-semibold text-zinc-900 dark:text-zinc-100">Tech Stack</h2>
      <div className="mt-2 flex flex-wrap gap-2">
        {project.tech.map((item) => (
          <span
            key={item}
            className="rounded-full border border-zinc-200 px-2.5 py-1 text-xs text-zinc-600 dark:border-zinc-700 dark:text-zinc-300"
          >
            {item}
          </span>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        {project.links.github ? (
          <a
            href={project.links.github}
            target="_blank"
            rel="noreferrer"
            className="rounded-full bg-[var(--navy)] px-4 py-2 text-sm font-medium text-white transition hover:bg-[var(--navy-hover)] dark:bg-[var(--navy)] dark:hover:bg-[var(--navy-hover)]"
          >
            GitHub
          </a>
        ) : null}
        {project.links.live ? (
          <a
            href={project.links.live}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-zinc-300 px-4 py-2 text-sm text-zinc-700 transition hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-800"
          >
            Live Demo
          </a>
        ) : null}
        {project.links.caseStudy ? (
          <a
            href={project.links.caseStudy}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-zinc-300 px-4 py-2 text-sm text-zinc-700 transition hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-800"
          >
            Case Study
          </a>
        ) : null}
        {project.links.download ? (
          <a
            href={project.links.download}
            download
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-zinc-300 px-4 py-2 text-sm text-zinc-700 transition hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-800"
          >
            Download
          </a>
        ) : null}
      </div>
    </article>
  );
}
