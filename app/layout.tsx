import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tingshan Studio",
  description: "Architecture Studio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>
        <header className="w-full border-b border-gray-100">
          <div
            className="
              mx-auto
              flex
              max-w-[1440px]
              flex-col
              gap-6
              px-6
              py-6
              lg:flex-row
              lg:items-center
              lg:justify-between
              lg:px-[80px]
            "
          >
            {/* Logo */}
            <div className="flex items-center justify-center gap-3 lg:justify-start">
              <Image
                src="/images/logo/logo.png"
                alt="TINGSHAN logo"
                width={140}
                height={24}
                priority
                className="lg:w-[180px]"
              />

              <span className="whitespace-nowrap text-sm font-medium tracking-[0.2em]">
                庭山营造
              </span>
            </div>

            {/* Navigation */}
            <nav className="w-full lg:w-auto">
              <ul
                className="
                  flex
                  flex-wrap
                  justify-center
                  gap-x-8
                  gap-y-3
                  text-xs
                  uppercase
                  tracking-[0.2em]
                  lg:flex-nowrap
                  lg:gap-14
                  lg:text-[14px]
                  lg:tracking-[0.25em]
                "
              >
                <li className="opacity-90 transition hover:opacity-60">
                  <Link href="/projects">PROJECTS</Link>
                </li>

                <li className="opacity-90 transition hover:opacity-60">
                  <Link href="/awards">AWARDS</Link>
                </li>

                <li className="opacity-90 transition hover:opacity-60">
                  <Link href="/build-your-space">BUILD YOUR SPACE</Link>
                </li>

                <li className="opacity-90 transition hover:opacity-60">
                  <Link href="/contact">CONTACT</Link>
                </li>
              </ul>
            </nav>
          </div>
        </header>

        <main>{children}</main>

        <footer className="py-8 text-center text-[11px] text-zinc-500">
          © Tingshan Studio
        </footer>
      </body>
    </html>
  );
}