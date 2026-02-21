"use client";

import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="h-9 w-9 rounded-full border border-zinc-300 bg-white text-lg text-zinc-900 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100 hover:dark:bg-slate-600"
      aria-label="Toggle color theme"
      suppressHydrationWarning
    >
      {isDark ? "☀" : "☾"}
    </button>
  );
}
