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


<header

className="
w-full
border-b
border-gray-100
"

>


<div

className="
mx-auto
flex
items-center
justify-between
max-w-[1440px]
px-[80px]
py-6
"

>


{/* Logo */}

<div

className="
flex
items-center
gap-3
"

>


<Image

src="/tingshan-studio/images/logo/logo.png"

alt="TINGSHAN logo"

width={180}

height={28}

priority

/>


<span

className="
text-[14px]
font-medium
tracking-[0.2em]
"

>

庭山营造

</span>


</div>





{/* Navigation */}

<nav>


<ul

className="
flex
items-center
gap-14
text-[14px]
uppercase
tracking-[0.25em]
"

>


<li
className="
opacity-90
hover:opacity-60
transition
"

>

<Link href="/projects">

PROJECTS

</Link>


</li>



<li
className="
opacity-90
hover:opacity-60
transition
"

>

<Link href="/awards">

AWARDS

</Link>


</li>




<li
className="
opacity-90
hover:opacity-60
transition
"

>

<Link href="/build-your-space">

BUILD YOUR SPACE

</Link>


</li>




<li
className="
opacity-90
hover:opacity-60
transition
"

>

<Link href="/contact">

CONTACT

</Link>


</li>


</ul>


</nav>



</div>


</header>





<main>

{children}

</main>





<footer

className="
py-8
text-center
text-[11px]
text-zinc-500
"

>


© Tingshan Studio


</footer>




</body>

</html>


);

}