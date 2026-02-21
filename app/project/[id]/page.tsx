import Link from "next/link";
import { notFound } from "next/navigation";
import { ProjectDetail } from "@/components/project-detail";
import { projects } from "@/data/projects";

type ProjectPageProps = {
  params: Promise<{ id: string }>;
};

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { id } = await params;
  const project = projects.find((entry) => entry.id === id);

  if (!project) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-[var(--navy-muted)] px-4 py-10 sm:px-6 lg:px-8 dark:from-zinc-950 dark:to-[var(--navy-muted)]">
      <div className="mx-auto w-full max-w-4xl space-y-5">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-[var(--navy)] font-medium hover:underline dark:text-[var(--navy-hover)]">
          ← Back to portfolio
        </Link>
        <ProjectDetail project={project} />
      </div>
    </main>
  );
}
