"use client";

import { FormEvent, useState } from "react";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
    event.currentTarget.reset();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3 rounded-2xl border border-zinc-200/50 bg-white/60 backdrop-blur p-5 shadow-sm transition-all duration-300 hover:shadow-md hover:bg-white/80 dark:border-zinc-700/50 dark:bg-zinc-800/50 dark:shadow-[0_0_0_1px_rgba(255,255,255,0.04)] dark:hover:bg-zinc-800/80 dark:hover:shadow-lg dark:hover:shadow-black/20">
      <div className="grid gap-3 sm:grid-cols-2">
        <input
          type="text"
          required
          name="name"
          placeholder="Your name"
          className="rounded-xl border border-zinc-200/50 bg-white/40 backdrop-blur px-3 py-2 text-sm outline-none transition-all duration-300 focus:border-[var(--navy)]/50 focus:ring-2 focus:ring-[var(--navy)]/30 focus:bg-white/60 dark:border-zinc-700/50 dark:bg-zinc-900/30 dark:text-zinc-100 dark:focus:border-[var(--navy)]/50 dark:focus:ring-[var(--navy)]/30 dark:focus:bg-zinc-900/50"
        />
        <input
          type="email"
          required
          name="email"
          placeholder="Your email"
          className="rounded-xl border border-zinc-200/50 bg-white/40 backdrop-blur px-3 py-2 text-sm outline-none transition-all duration-300 focus:border-[var(--navy)]/50 focus:ring-2 focus:ring-[var(--navy)]/30 focus:bg-white/60 dark:border-zinc-700/50 dark:bg-zinc-900/30 dark:text-zinc-100 dark:focus:border-[var(--navy)]/50 dark:focus:ring-[var(--navy)]/30 dark:focus:bg-zinc-900/50"
        />
      </div>
      <textarea
        required
        name="message"
        rows={5}
        placeholder="Tell me about your project or collaboration idea..."
        className="w-full rounded-xl border border-zinc-200/50 bg-white/40 backdrop-blur px-3 py-2 text-sm outline-none transition-all duration-300 focus:border-[var(--navy)]/50 focus:ring-2 focus:ring-[var(--navy)]/30 focus:bg-white/60 dark:border-zinc-700/50 dark:bg-zinc-900/30 dark:text-zinc-100 dark:focus:border-[var(--navy)]/50 dark:focus:ring-[var(--navy)]/30 dark:focus:bg-zinc-900/50"
      />
      <button
        type="submit"
        className="rounded-lg bg-gradient-to-br from-[var(--navy)] to-[var(--navy)]/90 px-5 py-2 text-sm font-medium text-white transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus:ring-2 focus:ring-[var(--navy)]/50 dark:to-[var(--navy-hover)]/90 dark:hover:shadow-black/20 cursor-pointer"
      >
        Send message
      </button>
      {submitted ? <p className="text-sm text-emerald-600 dark:text-emerald-400">Message sent (demo mode).</p> : null}
    </form>
  );
}
