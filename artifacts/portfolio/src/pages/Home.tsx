import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { Experience } from "@/components/sections/Experience";
import { Features } from "@/components/sections/Features";
import { Toolbox } from "@/components/sections/Toolbox";
import { Projects } from "@/components/sections/Projects";
import { Certifications } from "@/components/sections/Certifications";
import { Services } from "@/components/sections/Services";
import { Benefits } from "@/components/sections/Benefits";
import { Cta } from "@/components/sections/Cta";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white relative selection:bg-white selection:text-black">
      {/* Global Grain/Noise Overlay */}
      <svg className="pointer-events-none fixed inset-0 z-50 h-full w-full opacity-[0.03]">
        <filter id="noise">
          <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noise)" />
      </svg>

      <Navbar />
      
      <main>
        <Hero />
        <Experience />
        <Features />
        <Toolbox />
        <Projects />
        <Certifications />
        <Services />
        <Benefits />
        <Cta />
      </main>

      <Footer />
    </div>
  );
}