import { profile } from "@/data/profile";

export function Footer() {
  return (
    <footer className="border-t-2 border-t-[var(--navy)]/20 border-zinc-200 px-4 py-8 sm:px-6 lg:px-8 dark:border-zinc-700/80 dark:bg-zinc-950/30">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 text-sm text-zinc-600 sm:flex-row sm:items-center sm:justify-between dark:text-zinc-300">
        <p>© {new Date().getFullYear()} {profile.name}. All rights reserved.</p>
        <div className="flex items-center gap-4">
          <a href={profile.contact.github} target="_blank" rel="noreferrer" className="text-[var(--navy)] hover:underline dark:text-[var(--navy-hover)]">
            GitHub
          </a>
          <a href={profile.contact.linkedin} target="_blank" rel="noreferrer" className="text-[var(--navy)] hover:underline dark:text-[var(--navy-hover)]">
            LinkedIn
          </a>
          <a href={`mailto:${profile.contact.email}`} className="text-[var(--navy)] hover:underline dark:text-[var(--navy-hover)]">
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}
