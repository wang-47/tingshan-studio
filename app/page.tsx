export default function Home() {
  return (
    <section className="flex min-h-screen w-full">
      <div className="mx-auto flex w-full max-w-[1440px] items-center px-6 py-12 md:px-12 lg:px-[80px]">
        <div className="flex w-full flex-col-reverse gap-10 lg:flex-row lg:items-center lg:justify-between lg:gap-20">
          {/* Left */}
          <div className="w-full lg:w-[55%]">
            <div className="space-y-8">
              <h1 className="text-5xl font-light leading-[0.95] tracking-[-0.02em] text-black md:text-7xl lg:text-[min(7rem,12vw)]">
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

          {/* Right */}
          <div className="relative h-[40vh] w-full overflow-hidden lg:h-[75vh] lg:w-[45%]">
            <img
              src="/images/projects/hero.jpg"
              alt="Hero"
              className="h-full w-full object-cover lg:translate-x-8"
            />
          </div>
        </div>
      </div>
    </section>
  );
}