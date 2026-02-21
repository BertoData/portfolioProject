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
    <form onSubmit={handleSubmit} className="space-y-3 rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-700/80 dark:bg-zinc-800/95 dark:shadow-[0_0_0_1px_rgba(255,255,255,0.04)]">
      <div className="grid gap-3 sm:grid-cols-2">
        <input
          type="text"
          required
          name="name"
          placeholder="Your name"
          className="rounded-xl border border-zinc-200 bg-transparent px-3 py-2 text-sm outline-none focus:border-zinc-400 dark:border-zinc-700 dark:text-zinc-100"
        />
        <input
          type="email"
          required
          name="email"
          placeholder="Your email"
          className="rounded-xl border border-zinc-200 bg-transparent px-3 py-2 text-sm outline-none focus:border-zinc-400 dark:border-zinc-700 dark:text-zinc-100"
        />
      </div>
      <textarea
        required
        name="message"
        rows={5}
        placeholder="Tell me about your project or collaboration idea..."
        className="w-full rounded-xl border border-zinc-200 bg-transparent px-3 py-2 text-sm outline-none focus:border-zinc-400 dark:border-zinc-700 dark:text-zinc-100"
      />
      <button
        type="submit"
        className="rounded-full bg-[var(--navy)] px-5 py-2 text-sm font-medium text-white transition hover:bg-[var(--navy-hover)] dark:bg-[var(--navy)] dark:hover:bg-[var(--navy-hover)]"
      >
        Send message
      </button>
      {submitted ? <p className="text-sm text-emerald-600 dark:text-emerald-400">Message sent (demo mode).</p> : null}
    </form>
  );
}
