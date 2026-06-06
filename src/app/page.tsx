import { BackToTop } from "@/components/BackToTop";
import { Background } from "@/components/Background";
import { Cursor } from "@/components/Cursor";
import { Nav } from "@/components/Nav";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { Stack } from "@/components/sections/Stack";
import { Testimonials } from "@/components/sections/Testimonials";
import { Work } from "@/components/sections/Work";
import Image from "next/image";

export default function Home() {
  return (
    <main className="relative min-h-screen text-foreground" suppressHydrationWarning>
      <Background />
      <Cursor />
      <Nav />
      <Hero />
      <About />
      <Services />
      <Work />
      <Stack />
      <Testimonials />
      <Contact />
      <BackToTop />
    </main>
  );
}
