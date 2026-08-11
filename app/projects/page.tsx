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
        const buf = fs.readFileSync(coverJpgPath);
        coverDataUrl = `data:image/jpeg;base64,${buf.toString("base64")}`;
      } else if (fs.existsSync(coverPngPath)) {
        const buf = fs.readFileSync(coverPngPath);
        coverDataUrl = `data:image/png;base64,${buf.toString("base64")}`;
      }

      return {
        slug,
        title,
        coverDataUrl,
      };
    })
    .sort((a, b) => a.slug.localeCompare(b.slug, "en", { numeric: true }));
}

export default function ProjectsPage() {
  const projects = getProjects();

  return (
    <section className="min-h-screen w-full">
      <div className="mx-auto w-full max-w-[1440px] px-6 py-12 lg:px-20 lg:py-20">
        <h1 className="text-4xl font-semibold tracking-[0.05em] lg:text-[2.75rem]">
          PROJECTS
        </h1>

        <div className="mt-12 space-y-16">
          {projects.map((project) => (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              className="grid gap-8 lg:grid-cols-[55%_45%] lg:items-center"
            >
              {/* 手机图片在上 */}
              <div className="order-1 lg:order-2">
                <div className="aspect-[4/3] overflow-hidden bg-zinc-200 lg:h-[45vh] lg:aspect-auto">
                  {project.coverDataUrl ? (
                    <img
                      src={project.coverDataUrl}
                      alt={project.title}
                      className="h-full w-full object-cover transition duration-500 hover:scale-105"
                    />
                  ) : (
                    <div className="h-full w-full bg-zinc-200" />
                  )}
                </div>
              </div>

              {/* 手机标题在下 */}
              <div className="order-2 flex items-center lg:order-1">
                <p className="text-base uppercase tracking-[0.2em] text-zinc-600 lg:text-sm lg:tracking-[0.25em]">
                  {project.title}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}