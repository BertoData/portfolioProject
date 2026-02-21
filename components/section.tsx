import type { ReactNode } from "react";

type SectionProps = {
  id: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
};

export function Section({ id, title, subtitle, children }: SectionProps) {
  return (
    <section id={id} className="scroll-mt-24 px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-6xl">
        <div className="mb-8">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl dark:text-zinc-100">
            {title}
          </h2>
          {subtitle ? (
            <p className="mt-2 max-w-2xl text-sm text-zinc-600 sm:text-base dark:text-zinc-300">{subtitle}</p>
          ) : null}
        </div>
        {children}
      </div>
    </section>
  );
}
