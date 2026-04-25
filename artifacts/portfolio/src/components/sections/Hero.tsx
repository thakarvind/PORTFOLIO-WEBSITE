import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

export function Hero() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section
      className="relative h-[100dvh] w-full flex flex-col items-center justify-end overflow-hidden"
      id="about"
    >
      {/* Full-bleed photo background */}
      <motion.div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          x: (mousePos.x - 0.5) * -16,
          y: (mousePos.y - 0.5) * -16,
        }}
      >
        <img
          src="/images/arvind.jpg"
          alt="Thak Aravind"
          className="absolute inset-0 w-full h-full object-cover object-center grayscale contrast-110 scale-110"
        />
        {/* Cinematic vignettes */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.85)_95%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/10 to-black" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/50" />
      </motion.div>

      {/* Hero content sits at the bottom of the viewport so the face stays visible */}
      <div className="relative z-10 container px-4 mx-auto flex flex-col items-center text-center pb-20 sm:pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium tracking-tighter text-white mb-5 leading-[1.05] drop-shadow-[0_4px_30px_rgba(0,0,0,0.9)]">
            Turning data into decisions, and ideas into products.
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-gray-200 max-w-2xl mx-auto mb-8 leading-relaxed drop-shadow-[0_2px_20px_rgba(0,0,0,0.9)]">
            I'm Aravind — a data analyst, project manager and Gen AI researcher turning messy numbers into clear, beautiful insight.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#work"
              className="group flex items-center justify-between gap-4 bg-white text-black px-6 py-3 rounded-full font-medium text-lg transition-transform hover:scale-105 w-full sm:w-auto"
            >
              View Work
              <div className="bg-black text-white rounded-full p-1 transition-transform group-hover:translate-x-1">
                <ArrowRight className="w-4 h-4" />
              </div>
            </a>
            <a
              href="/Thak_Aravind_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between gap-4 bg-white/10 text-white px-6 py-3 rounded-full font-medium text-lg border border-white/15 backdrop-blur-md transition-all hover:bg-white/20 w-full sm:w-auto"
            >
              Resume
              <div className="bg-white text-black rounded-full p-1 transition-transform group-hover:translate-x-1">
                <ArrowRight className="w-4 h-4" />
              </div>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
