const awards = [
  {
    id: "A001",
    title: "春蚕",
    image: "/awards/A001.jpg",
  },
  {
    id: "A002",
    title: "4022-23",
    image: "/awards/A002.jpg",
  },
  {
    id: "A003",
    title: "红棉",
    image: "/awards/A003.jpg",
  },
  {
    id: "A004",
    title: "4020-21",
    image: "/awards/A004.jpg",
  },
];

export default function AwardsPage() {
  return (
    <main className="mx-auto max-w-[1400px] px-6 py-20 md:px-12 lg:px-[60px] lg:py-[140px]">
      {/* Hero */}
      <section className="mb-24 lg:mb-[180px]">
        <h1 className="mb-5 text-5xl font-light tracking-[-0.03em] md:text-6xl lg:text-[72px]">
          Awards
        </h1>

        <p className="max-w-[420px] text-sm leading-[1.9] text-zinc-500 md:text-base">
          A visual archive of competitions, exhibitions and moments that
          continue to shape our architectural journey.
        </p>
      </section>

      {/* Awards */}
      <div className="space-y-24 lg:space-y-[200px]">
        {awards.map((award, index) => (
          <section
            key={award.id}
            className={`flex ${
              index % 2 === 0
                ? "justify-start"
                : "justify-end"
            }`}
          >
            <div className="w-full max-w-[560px]">
              <div className="overflow-hidden">
                <img
                  src={award.image}
                  alt={award.title}
                  className="
                    block
                    h-auto
                    w-full
                    transition
                    duration-700
                    hover:scale-105
                  "
                  style={{
                    filter: "saturate(.88) brightness(.98)",
                  }}
                />
              </div>

              <div className="mt-6">
                <div className="mb-2 text-[11px] tracking-[0.25em] text-zinc-400">
                  {award.id}
                </div>

                <div className="text-sm text-zinc-600">
                  {award.title}
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>

      {/* Footer */}
      <section className="mt-32 border-t border-zinc-100 pt-20">
        <p className="text-sm text-zinc-400">
          More to come.
        </p>
      </section>
    </main>
  );
}