import fs from "fs";
import path from "path";
import type { Metadata } from "next";
import ProjectSection from "../../../components/ProjectSection";

interface ProjectPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export const metadata: Metadata = {
  title: "Project Detail",
};

function getProject(slug: string) {
  const projectPath = path.join(process.cwd(), "content", "projects", slug);
  const infoPath = path.join(projectPath, "info.md");

  let title = slug;
  let heroDataUrl = "";

  let type = "";
  let location = "";
  let area = "";
  let year = "";
  let englishTitle = "";
  let projectIntroduction = "";
  let designConcept = "";
  let spaceStrategy = "";
  let materialStrategy = "";
  let galleryImages: string[] = [];

  if (fs.existsSync(infoPath)) {
    const content = fs.readFileSync(infoPath, "utf8");

    const lines = content.split("\n");

    const titleLine = lines.find((line) => line.startsWith("# "));
    if (titleLine) {
      title = titleLine.replace("# ", "").trim();
    }

    let expectEnglishTitle = false;

    lines.forEach((line) => {
      if (expectEnglishTitle) {
        const trimmed = line.trim();
        if (trimmed) {
          englishTitle = trimmed;
          expectEnglishTitle = false;
        }

        return;
      }

      if (line.startsWith("- 项目类型：")) {
        type = line.replace("- 项目类型：", "").trim();
      }

      if (line.startsWith("- 项目地点：")) {
        location = line.replace("- 项目地点：", "").trim();
      }

      if (line.startsWith("- 建筑面积：")) {
        area = line.replace("- 建筑面积：", "").trim();
      }

      if (line.startsWith("- 设计时间：")) {
        year = line.replace("- 设计时间：", "").trim();
      }

      if (line.startsWith("## English Name")) {
        expectEnglishTitle = true;
      }
    });

    // extract 项目介绍 section until next '---' or next heading
    const introMatch = content.match(/## 项目介绍\s*([\s\S]*?)(?:\n---|\n##|$)/);
    const conceptMatch = content.match(/## 设计理念\s*([\s\S]*?)(?:\n---|\n##|$)/);
    const spaceMatch = content.match(/## 空间策略\s*([\s\S]*?)(?:\n---|\n##|$)/);
    const materialMatch = content.match(/## 材料策略\s*([\s\S]*?)(?:\n---|\n##|$)/);

    if (introMatch) {
      projectIntroduction = introMatch[1].trim();
    }
    if (conceptMatch) {
      designConcept = conceptMatch[1].trim();
    }
    if (spaceMatch) {
      spaceStrategy = spaceMatch[1].trim();
    }
    if (materialMatch) {
      materialStrategy = materialMatch[1].trim();
    }
  }

  const galleryPath = path.join(projectPath, "gallery");
  if (fs.existsSync(galleryPath)) {
    galleryImages = fs
      .readdirSync(galleryPath)
      .filter((file) => /\.(jpe?g|png)$/i.test(file))
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" }))
      .map((file) => {
        const filePath = path.join(galleryPath, file);
        const buffer = fs.readFileSync(filePath);
        const ext = path.extname(filePath).toLowerCase();
        const mime = ext === ".png" ? "image/png" : "image/jpeg";
        return `data:${mime};base64,${buffer.toString("base64")}`;
      });
  }

  // support jpg or png hero
  const heroJpgPath = path.join(projectPath, "hero.jpg");
  const heroPngPath = path.join(projectPath, "hero.png");
  const chosenHero = fs.existsSync(heroJpgPath)
    ? heroJpgPath
    : fs.existsSync(heroPngPath)
    ? heroPngPath
    : "";

  if (chosenHero) {
    const buffer = fs.readFileSync(chosenHero);
    const ext = path.extname(chosenHero).toLowerCase();
    const mime = ext === ".png" ? "image/png" : "image/jpeg";
    heroDataUrl = `data:${mime};base64,${buffer.toString("base64")}`;
  }

  return {
    title,
    heroDataUrl,
    type,
    location,
    area,
    year,
    englishTitle,
    projectIntroduction,
    designConcept,
    spaceStrategy,
    materialStrategy,
    galleryImages,
  };
}

export default async function ProjectDetailPage({
  params,
}: ProjectPageProps) {
  const { slug } = await params;

  const cleanSlug = decodeURIComponent(slug);

  const project = getProject(cleanSlug);

  return (
    <section className="min-h-screen w-full">
      <div className="mx-auto max-w-[1440px] px-[80px] py-20">

        {project.heroDataUrl && (
          <img
            src={project.heroDataUrl}
            alt={project.title}
            className="mb-16 h-[78vh] w-full max-w-[1440px] rounded-[16px] object-cover"
          />
        )}

        <h1 className="mt-12 text-[56px] font-bold tracking-[0.02em] leading-[1.02]">
          {project.title}
        </h1>

        {project.englishTitle && (
          <p className="mt-3 text-[20px] font-[400] tracking-[0.08em] text-zinc-500">
            {project.englishTitle}
          </p>
        )}

        <div className="mt-12 grid max-w-[800px] gap-x-12 gap-y-8 text-zinc-700 sm:grid-cols-2">
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">Project Type</p>
            <p className="text-lg font-semibold text-zinc-900">{project.type}</p>
          </div>
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">Year</p>
            <p className="text-lg font-semibold text-zinc-900">{project.year}</p>
          </div>
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">Location</p>
            <p className="text-lg font-semibold text-zinc-900">{project.location}</p>
          </div>
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">Area</p>
            <p className="text-lg font-semibold text-zinc-900">{project.area}</p>
          </div>
        </div>

        {project.projectIntroduction && (
          <ProjectSection
            title="Project Introduction"
            content={project.projectIntroduction}
            image={project.galleryImages[0]}
          />
        )}

        {project.designConcept && (
          <ProjectSection
            title="Design Concept"
            content={project.designConcept}
            image={project.galleryImages[1]}
          />
        )}

        {project.spaceStrategy && (
          <ProjectSection
            title="Space Strategy"
            content={project.spaceStrategy}
            image={project.galleryImages[2]}
          />
        )}

        {project.materialStrategy && (
          <ProjectSection
            title="Material Strategy"
            content={project.materialStrategy}
            image={project.galleryImages[3]}
          />
        )}

      </div>
    </section>
  );
}