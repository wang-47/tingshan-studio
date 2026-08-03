interface ProjectSectionProps {
  title: string;
  content: string;
  image?: string;
}

export default function ProjectSection({
  title,
  content,
  image,
}: ProjectSectionProps) {
  return (
    <section className="mx-auto max-w-[1200px] py-32">
      <div className="max-w-[680px]">
        <h2 className="text-[2rem] font-medium uppercase tracking-[0.25em] text-black">
          {title}
        </h2>

        <div className="mt-10 whitespace-pre-line text-[1.05rem] leading-[2.1] text-zinc-600">
          {content}
        </div>
      </div>

      {image && (
        <div className="mt-20 flex justify-center">
          <img
            src={image}
            alt={title}
            className="h-auto max-w-[1200px] w-full rounded-[24px] object-cover"
          />
        </div>
      )}
    </section>
  );
}