"use client";

import { useState } from "react";
import { ContactForm } from "@/components/contact-form";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { ProjectsSection } from "@/components/projects-section";
import { Section } from "@/components/section";
import { BackToTop } from "@/components/back-to-top";
import { experience, profile, projects, skillGroups } from "@/data/data";

export default function HomePage() {
  const [projectIdToOpen, setProjectIdToOpen] = useState<string | null>(null);
  const experiencePointsClassName = "mt-3 list-disc space-y-1 pl-5 text-sm text-zinc-600 dark:text-zinc-300";

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-white to-[var(--navy-muted)] dark:from-[var(--background)] dark:via-slate-900 dark:to-[var(--navy-muted)]">
      <Navbar projects={projects} onOpenProject={(id) => setProjectIdToOpen(id)} />
      <main>
        <section id="home" className="relative scroll-mt-24 overflow-hidden px-4 pt-20 pb-16 sm:px-6 lg:px-8">
          {/* Subtle animated background orbs */}
          <div className="pointer-events-none absolute -right-20 -top-10 h-72 w-72 rounded-full bg-[var(--navy)]/10 blur-3xl dark:bg-[var(--navy)]/20" style={{ animation: "float 8s ease-in-out infinite" }} aria-hidden />
          <div className="pointer-events-none absolute -bottom-10 -left-20 h-56 w-56 rounded-full bg-[var(--navy)]/10 blur-3xl dark:bg-[var(--navy)]/15" style={{ animation: "float 6s ease-in-out infinite 1s" }} aria-hidden />

          <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-3xl flex-1">
              <p
                className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400 opacity-0 animate-fade-in-up"
                style={{ animationDelay: "0.1s", animationFillMode: "forwards" }}
              >
                {profile.headline}
              </p>
              <h1
                className="bg-gradient-to-r from-zinc-900 via-[var(--navy)] to-zinc-900 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl lg:text-6xl dark:from-zinc-100 dark:via-[var(--navy-hover)] dark:to-zinc-100 opacity-0 animate-fade-in-up"
                style={{ animationDelay: "0.2s", animationFillMode: "forwards" }}
              >
                {profile.name}
              </h1>
              <p
                className="mt-4 max-w-2xl text-base leading-7 text-zinc-600 sm:text-lg dark:text-zinc-300 opacity-0 animate-fade-in-up"
                style={{ animationDelay: "0.35s", animationFillMode: "forwards" }}
              >
                {profile.intro}
              </p>
              {profile.focus?.length ? (
                <div className="mt-5 flex flex-wrap gap-2">
                  {profile.focus.map((item, i) => (
                    <span
                      key={item}
                      className="rounded-full bg-zinc-200/80 px-3 py-1 text-xs font-medium text-zinc-700 transition hover:scale-105 hover:bg-[var(--navy)]/15 hover:text-[var(--navy)] dark:bg-zinc-700/80 dark:text-zinc-200 dark:hover:bg-[var(--navy)]/30 dark:hover:text-[var(--navy-hover)] opacity-0 animate-fade-in-up cursor-default"
                      style={{ animationDelay: `${0.5 + i * 0.08}s`, animationFillMode: "forwards" }}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              ) : null}
              {profile.status ? (
                <p
                  className="mt-4 text-sm text-zinc-500 dark:text-zinc-400 opacity-0 animate-fade-in-up"
                  style={{ animationDelay: "0.7s", animationFillMode: "forwards" }}
                >
                  <span className="font-medium text-zinc-600 dark:text-zinc-300">Right now:</span> {profile.status}
                </p>
              ) : null}
              <div
                className="mt-8 flex flex-wrap gap-3 opacity-0 animate-fade-in-up"
                style={{ animationDelay: "0.85s", animationFillMode: "forwards" }}
              >
                <a
                  href="#projects"
                  className="rounded-full bg-[var(--navy)] px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-[var(--navy)]/25 transition hover:scale-105 hover:bg-[var(--navy-hover)] hover:shadow-[var(--navy)]/30 dark:bg-[var(--navy)] dark:hover:bg-[var(--navy-hover)]"
                >
                  View Projects
                </a>
                <a
                  href="#contact"
                  className="rounded-full border-2 border-zinc-300 px-5 py-2.5 text-sm font-semibold text-zinc-700 transition hover:scale-105 hover:border-[var(--navy)]/50 hover:bg-[var(--navy)]/10 hover:text-[var(--navy)] dark:border-zinc-700 dark:text-zinc-200 dark:hover:border-[var(--navy)] dark:hover:bg-[var(--navy)]/20 dark:hover:text-[var(--navy-hover)]"
                >
                  Contact
                </a>
              </div>
            </div>
            <div className="relative hidden shrink-0 lg:block">
              <a
                href="https://www.linkedin.com/in/berto-mazum/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit my LinkedIn page"
              >
                <img
                  src="/images/linkedinProf.png"
                  alt="Berto Mazum, LinkedIn profile"
                  className="h-32 w-32 sm:h-40 sm:w-40 lg:h-48 lg:w-48 rounded-2xl border border-zinc-200 shadow-2xl object-cover transition hover:scale-105 hover:border-[var(--navy)]"
                />
              </a>
            </div>
          </div>
        </section>

        <Section
          id="about"
          title="About"
          subtitle="I enjoy projects where technical depth and clear communication matter equally."
        >
          <div className="grid gap-4 md:grid-cols-2">
            <p className="rounded-2xl border border-zinc-200 bg-white p-5 text-sm leading-7 text-zinc-600 shadow-sm dark:border-zinc-700/80 dark:bg-zinc-800/95 dark:text-zinc-300 dark:shadow-[0_0_0_1px_rgba(255,255,255,0.04)]">
              {profile.aboutA}
            </p>
            <p className="rounded-2xl border border-zinc-200 bg-white p-5 text-sm leading-7 text-zinc-600 shadow-sm dark:border-zinc-700/80 dark:bg-zinc-800/95 dark:text-zinc-300 dark:shadow-[0_0_0_1px_rgba(255,255,255,0.04)]">
              {profile.aboutB}
            </p>
          </div>
          {profile.lookingFor ? (
            <div className="mt-6 rounded-2xl border border-[var(--navy)]/30 bg-[var(--navy-muted)]/50 p-5 dark:border-[var(--navy)]/35 dark:bg-[var(--navy-muted)]/50 dark:shadow-[0_0_0_1px_rgba(91,143,212,0.08)]">
              <p className="text-sm font-medium text-[var(--navy)] dark:text-[var(--navy-hover)]">What I&apos;m looking for</p>
              <p className="mt-1 text-sm text-zinc-700 dark:text-zinc-200">{profile.lookingFor}</p>
            </div>
          ) : null}
        </Section>

        <Section id="skills" title="Skills" subtitle="A practical toolset across product development layers.">
          <div className="grid gap-4 sm:grid-cols-2">
            {skillGroups.map((group) => (
              <article
                key={group.category}
                className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-700/80 dark:bg-zinc-800/95 dark:shadow-[0_0_0_1px_rgba(255,255,255,0.04)]"
              >
                <h3 className="text-sm font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                  {group.category}
                </h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-zinc-200 px-2.5 py-1 text-xs text-zinc-600 dark:border-zinc-700 dark:text-zinc-300"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </Section>

        <Section
          id="projects"
          title="Projects"
          subtitle="Explore cards below. Open details in an accessible modal sub-window or navigate to a shareable project page."
        >
          <ProjectsSection
          projects={projects}
          projectIdToOpen={projectIdToOpen}
          onClearProjectIdToOpen={() => setProjectIdToOpen(null)}
        />
        </Section>

        <Section id="experience" title="Experience" subtitle="A timeline of impact across technical roles.">
          <ol className="relative space-y-5 border-l border-zinc-300 pl-5 dark:border-zinc-700">
            {experience.map((item) => (
              <li key={item.id} className="relative">
                <span className="absolute -left-[1.75rem] top-1 h-3 w-3 rounded-full bg-[var(--navy)] dark:bg-[var(--navy-hover)]" />
                <article className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-700/80 dark:bg-zinc-800/95 dark:shadow-[0_0_0_1px_rgba(255,255,255,0.04)]">
                  <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                    {item.timeframe}
                  </p>
                  <h3 className="mt-1 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                    {item.role} · {item.organization}
                  </h3>
                  <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">{item.summary}</p>
                  <ul className={experiencePointsClassName}>
                    {item.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </article>
              </li>
            ))}
          </ol>
        </Section>

        <Section id="contact" title="Contact" subtitle="Let's connect — open to full-time roles and collaborations.">
          <div className="grid gap-4 md:grid-cols-[1.5fr_1fr]">
            <ContactForm />
            <aside className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-700/80 dark:bg-zinc-800/95 dark:shadow-[0_0_0_1px_rgba(255,255,255,0.04)]">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                Connect
              </h3>
              <ul className="mt-3 space-y-2 text-sm text-zinc-700 dark:text-zinc-200">
                <li>
                  <a href={`mailto:${profile.contact.email}`} className="text-[var(--navy)] hover:underline dark:text-[var(--navy-hover)]">
                    {profile.contact.email}
                  </a>
                </li>
                <li>
                  <a href={profile.contact.github} target="_blank" rel="noreferrer" className="text-[var(--navy)] hover:underline dark:text-[var(--navy-hover)]">
                    {profile.contact.github.replace("https://", "")}
                  </a>
                </li>
                <li>
                  <a href={profile.contact.linkedin} target="_blank" rel="noreferrer" className="text-[var(--navy)] hover:underline dark:text-[var(--navy-hover)]">
                    {profile.contact.linkedin.replace("https://", "").replace(/\/$/, "")}
                  </a>
                </li>
              </ul>
            </aside>
          </div>
        </Section>
      </main>
      <BackToTop />
      <Footer />
    </div>
  );
}
