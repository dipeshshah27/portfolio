import { AuroraBackground } from "@/components/aurora-background";
import { Cursor } from "@/components/cursor";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { Preloader } from "@/components/preloader";
import { ScrollProgress } from "@/components/scroll-progress";
import { Contact } from "@/components/sections/contact";
import { Experience } from "@/components/sections/experience";
import { Hero } from "@/components/sections/hero";
import { Manifesto } from "@/components/sections/manifesto";
import { Projects } from "@/components/sections/projects";
import { Skills } from "@/components/sections/skills";
import { SmoothScroll } from "@/components/smooth-scroll";
import { VelocityMarquee } from "@/components/velocity-marquee";

export default function Home() {
  return (
    <SmoothScroll>
      <Preloader />
      <Cursor />
      <ScrollProgress />
      <AuroraBackground />
      <Navbar />
      <main>
        <Hero />
        <Manifesto />
        <VelocityMarquee />
        <Experience />
        <Projects />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </SmoothScroll>
  );
}
