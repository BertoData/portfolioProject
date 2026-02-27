"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import type { Project } from "@/types/portfolio";

type ProjectModalProps = {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
  prevProject?: Project | null;
  nextProject?: Project | null;
  onPrev?: () => void;
  onNext?: () => void;
};

function getFocusableElements(container: HTMLElement) {
  const selectors = [
    "a[href]",
    "button:not([disabled])",
    "textarea:not([disabled])",
    "input:not([disabled])",
    "select:not([disabled])",
    "[tabindex]:not([tabindex='-1'])",
  ];

  return Array.from(container.querySelectorAll<HTMLElement>(selectors.join(",")));
}

export function ProjectModal({ project, isOpen, onClose, prevProject, nextProject, onPrev, onNext }: ProjectModalProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const previousActiveElementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isOpen || !panelRef.current) {
      return;
    }

    previousActiveElementRef.current = document.activeElement as HTMLElement;
    const panel = panelRef.current;
    const focusable = getFocusableElements(panel);
    const firstFocusable = focusable[0] ?? panel;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    firstFocusable.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        onNext?.();
        return;
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        onPrev?.();
        return;
      }

      if (event.key !== "Tab") {
        return;
      }

      const elements = getFocusableElements(panel);
      if (elements.length === 0) {
        event.preventDefault();
        panel.focus();
        return;
      }

      const first = elements[0];
      const last = elements[elements.length - 1];
      const active = document.activeElement as HTMLElement;

      if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = originalOverflow;
      previousActiveElementRef.current?.focus();
    };
  }, [isOpen, onClose]);

  if (!project) {
    return null;
  }

  return (
    <div
      className={`fixed inset-0 z-[60] flex items-center justify-center p-4 transition ${
        isOpen ? "pointer-events-auto bg-black/50 opacity-100" : "pointer-events-none bg-black/0 opacity-0"
      }`}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
      aria-hidden={!isOpen}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
        aria-describedby="project-modal-description"
        tabIndex={-1}
        className={`w-full max-w-3xl rounded-2xl border border-zinc-200 bg-white p-6 shadow-2xl outline-none transition duration-200 dark:border-zinc-600 dark:bg-zinc-800/98 dark:shadow-[0_0_0_1px_rgba(255,255,255,0.05),0_25px_50px_-12px_rgba(0,0,0,0.5)] ${
          isOpen ? "translate-y-0 scale-100 opacity-100" : "translate-y-4 scale-95 opacity-0"
        }`}
      >
        <div className="mb-4 flex items-start justify-between gap-4">
          <div className="flex flex-col">
            <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
              {project.category}
            </p>
            <h3 id="project-modal-title" className="mt-1 text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
              {project.title}
            </h3>
          </div>
          <div className="flex items-center gap-2">
            {onPrev && (
              <button
                type="button"
                onClick={onPrev}
                disabled={!prevProject}
                aria-label="Previous project"
                className="rounded-full border border-zinc-300 px-2 py-1 text-sm text-zinc-700 transition hover:bg-zinc-100 focus:ring-2 focus:ring-[var(--navy)] disabled:opacity-40 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-800"
              >
                ◀
              </button>
            )}
            {onNext && (
              <button
                type="button"
                onClick={onNext}
                disabled={!nextProject}
                aria-label="Next project"
                className="rounded-full border border-zinc-300 px-2 py-1 text-sm text-zinc-700 transition hover:bg-zinc-100 focus:ring-2 focus:ring-[var(--navy)] disabled:opacity-40 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-800"
              >
                ▶
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="rounded-full border border-zinc-300 px-3 py-1.5 text-sm text-zinc-700 transition hover:bg-zinc-100 focus:ring-2 focus:ring-[var(--navy)] dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-800"
            >
              Close
            </button>
          </div>
        </div>

        <p id="project-modal-description" className="text-sm leading-6 text-zinc-600 dark:text-zinc-300">
          {project.description}
        </p>

        {project.images && project.images.length > 0 ? (
          <div className="mt-4 flex gap-2 overflow-x-auto rounded-xl border border-zinc-200 bg-zinc-50 p-2 dark:border-zinc-700 dark:bg-zinc-800/50">
            {project.images.map((src, i) => (
              <div key={i} className="relative h-28 w-40 shrink-0 overflow-hidden rounded-lg bg-zinc-200 dark:bg-zinc-700">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt="" className="h-full w-full object-cover" />
              </div>
            ))}
          </div>
        ) : null}

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-zinc-200 p-4 dark:border-zinc-700">
            <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Role & Timeline</h4>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">{project.role}</p>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">{project.timeframe}</p>
          </div>
          <div className="rounded-xl border border-zinc-200 p-4 dark:border-zinc-700">
            <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Tech Stack</h4>
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
          </div>
        </div>

        <div className="mt-6">
          <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Highlights</h4>
          <ul className="mt-2 space-y-2 text-sm text-zinc-600 dark:text-zinc-300">
            {project.highlights.map((highlight) => (
              <li key={highlight} className="rounded-lg border border-zinc-200 px-3 py-2 dark:border-zinc-700">
                {highlight}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href={`/project/${project.id}`}
            className="rounded-full bg-[var(--navy)] px-4 py-2 text-sm font-medium text-white transition hover:bg-[var(--navy-hover)] dark:bg-[var(--navy)] dark:hover:bg-[var(--navy-hover)]"
          >
            Open full page
          </Link>
          {project.links.github ? (
            <a
              href={project.links.github}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-zinc-300 px-4 py-2 text-sm text-zinc-700 transition hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-800"
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
      </div>
    </div>
  );
}
