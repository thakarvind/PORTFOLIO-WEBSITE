import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { DashboardMock } from "../ui/DashboardMock";
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
    <section className="relative min-h-[100dvh] flex flex-col items-center justify-center pt-32 pb-24 overflow-hidden" id="about">
      {/* Background Image & Glow */}
      <div className="absolute inset-0 z-0">
        <motion.div 
          className="absolute inset-0 bg-[url('/images/hero-bg.png')] bg-cover bg-center bg-no-repeat opacity-60"
          style={{
            x: (mousePos.x - 0.5) * -20,
            y: (mousePos.y - 0.5) * -20,
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,black_80%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black" />
      </div>

      <div className="relative z-10 container px-4 mx-auto flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-medium tracking-tighter text-white mb-6 leading-[1.1]">
            Turning data into decisions, and ideas into products.
          </h1>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            I'm Arvind — a data analyst and developer building dashboards, analytics tools, and end-to-end web experiences that turn raw numbers into clear, beautiful insight.
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
              href="#"
              className="group flex items-center justify-between gap-4 bg-white/10 text-white px-6 py-3 rounded-full font-medium text-lg border border-white/10 backdrop-blur-md transition-all hover:bg-white/20 w-full sm:w-auto"
            >
              Resume
              <div className="bg-white text-black rounded-full p-1 transition-transform group-hover:translate-x-1">
                <ArrowRight className="w-4 h-4" />
              </div>
            </a>
          </div>
        </motion.div>

        {/* Featured Project Floating Card */}
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mt-24 w-full max-w-6xl mx-auto relative"
          id="work"
        >
          <div className="absolute -inset-1 bg-gradient-to-b from-white/10 to-transparent rounded-[2rem] blur-sm" />
          <div className="relative bg-black/40 backdrop-blur-2xl border border-white/10 rounded-[2rem] p-8 md:p-12 shadow-2xl overflow-hidden">
            <div className="flex flex-col lg:flex-row gap-12 items-center">
              <div className="flex-1 text-left">
                <p className="text-[10px] uppercase tracking-[0.3em] text-gray-500 mb-4 font-semibold">Featured Project</p>
                <h3 className="text-3xl md:text-4xl font-medium text-white mb-4 tracking-tight">
                  Uber NCR — End-to-end ride bookings analysis
                </h3>
                <p className="text-gray-400 text-lg leading-relaxed mb-8">
                  An interactive analytics dashboard exploring 100k+ ride bookings across the Delhi NCR region — surfacing demand patterns, peak-hour pricing, cancellation drivers, and route economics.
                </p>
                <a
                  href="https://github.com/thakarvind/UBER-NCR-data-analysis"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-white font-medium hover:text-gray-300 transition-colors"
                >
                  View on GitHub <ArrowRight className="w-4 h-4" />
                </a>
              </div>
              <div className="flex-1 w-full relative">
                <DashboardMock />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}