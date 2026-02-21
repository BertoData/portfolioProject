import Link from "next/link";

export default function NotFoundPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-b from-white to-[var(--navy-muted)] px-4 dark:from-[var(--background)] dark:to-[var(--navy-muted)]">
      <div className="w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-6 text-center shadow-sm dark:border-zinc-700/80 dark:bg-zinc-800/95 dark:shadow-[0_0_0_1px_rgba(255,255,255,0.04)]">
        <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100">Project not found</h1>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
          The page you requested does not exist or was moved.
        </p>
        <Link
          href="/"
          className="mt-4 inline-block rounded-full bg-[var(--navy)] px-5 py-2 text-sm font-medium text-white transition hover:bg-[var(--navy-hover)] dark:bg-[var(--navy)] dark:hover:bg-[var(--navy-hover)]"
        >
          Return home
        </Link>
      </div>
    </main>
  );
}
