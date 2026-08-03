import fs from "fs";
import path from "path";
import Link from "next/link";

interface ProjectItem {
  slug: string;
  title: string;
  coverDataUrl: string;
}

function getProjects(): ProjectItem[] {
  const projectsPath = path.join(process.cwd(), "content/projects");
  if (!fs.existsSync(projectsPath)) return [];

  return fs
    .readdirSync(projectsPath, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => {
      const slug = entry.name;
      const infoPath = path.join(projectsPath, slug, "info.md");
      const coverJpgPath = path.join(projectsPath, slug, "cover.jpg");
      const coverPngPath = path.join(projectsPath, slug, "cover.png");
      let title = slug;
      let coverDataUrl = "";

      if (fs.existsSync(infoPath)) {
        const content = fs.readFileSync(infoPath, "utf8");
        const match = content.match(/^#\s*(.+)$/m);
        if (match) title = match[1].trim();
      }

      if (fs.existsSync(coverJpgPath)) {
        try {
          const buf = fs.readFileSync(coverJpgPath);
          const base64 = buf.toString("base64");
          coverDataUrl = `data:image/jpeg;base64,${base64}`;
        } catch (e) {
          coverDataUrl = "";
        }
      } else if (fs.existsSync(coverPngPath)) {
        try {
          const buf = fs.readFileSync(coverPngPath);
          const base64 = buf.toString("base64");
          coverDataUrl = `data:image/png;base64,${base64}`;
        } catch (e) {
          coverDataUrl = "";
        }
      }

      return { slug, title, coverDataUrl };
    })
    .sort((a, b) => a.slug.localeCompare(b.slug, "en", { numeric: true }));
}

export default function ProjectsPage() {
  const projects = getProjects();

  return (
    <section className="flex min-h-screen w-full">
      <div className="mx-auto flex w-full max-w-[1440px] flex-1 flex-col px-[80px] py-20">
        <div className="max-w-3xl">
          <h1 className="text-[2.75rem] font-semibold tracking-[0.05em] text-black">
            PROJECTS
          </h1>
        </div>

        <div className="mt-16 space-y-10">
          {projects.map((project) => {
            return (
              <Link
                href={`/projects/${project.slug}`}
                key={project.slug}
                className="grid min-h-[30rem] gap-10 lg:grid-cols-[55%_45%]"
              >
                <div className="flex flex-col justify-center">
                  <div className="space-y-4">
                    <p className="text-sm uppercase tracking-[0.25em] text-zinc-500">
                      {project.title}
                    </p>
                  </div>
                </div>
                <div className="h-[45vh] overflow-hidden bg-zinc-200">
                  {project.coverDataUrl ? (
                    <img
                      src={project.coverDataUrl}
                      alt={project.title}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="h-full w-full bg-zinc-200" aria-hidden="true" />
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
