export default function Home() {
  return (
    <section className="flex min-h-[100vh] w-full">
      <div className="mx-auto flex w-full max-w-[1440px] items-center px-[80px]">
        <div className="flex w-full items-center justify-between gap-20">
          <div className="w-[55%]">
            <div className="space-y-8">
              <h1 className="text-[min(7rem,12vw)] font-light leading-[0.95] tracking-[-0.02em] text-black">
                Designing
                <br />
                places with
                <br />
                memory.
              </h1>
              <div className="space-y-2 text-sm text-zinc-600">
                <p>Harbin, China</p>
                <p>Tingshan Studio</p>
              </div>
            </div>
          </div>
          <div className="relative h-[75vh] w-[45%] overflow-hidden">
            <img
              src="/images/projects/hero.jpg"
              alt="Hero"
              className="h-full w-full object-cover translate-x-8"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
