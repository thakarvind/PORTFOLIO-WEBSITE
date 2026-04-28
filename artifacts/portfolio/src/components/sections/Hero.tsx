import { motion } from "framer-motion";
import { FileText, Github, Linkedin } from "lucide-react";
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
      className="relative h-[100dvh] w-full flex flex-col items-center justify-end overflow-hidden scroll-mt-28"
      id="about"
    >
      <motion.div
        className="absolute inset-0 z-0 pointer-events-none bg-black"
        style={{
          x: (mousePos.x - 0.5) * -16,
          y: (mousePos.y - 0.5) * -16,
        }}
      >
        <img
          src="/images/arvind.jpg"
          alt="Thak Aravind"
          className="absolute inset-0 w-full h-full object-contain object-[center_20%] grayscale contrast-110"
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.85)_95%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/10 to-black" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/50" />
      </motion.div>

      <div className="relative z-10 container px-4 mx-auto pb-20 sm:pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mx-auto max-w-6xl relative lg:min-h-[360px]"
        >
          <div className="max-w-4xl text-left lg:max-w-none lg:min-h-[360px]">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-white mb-6 leading-[1.02] drop-shadow-[0_4px_30px_rgba(0,0,0,0.9)] text-balance lg:absolute lg:left-0 lg:bottom-0 lg:mb-0 lg:max-w-[13rem] lg:text-[3.1rem] lg:leading-[0.95]">
              Turning data into decisions, and ideas into products.
            </h1>

            <div className="lg:absolute lg:right-0 lg:bottom-0 lg:max-w-[13rem]">
              <p className="text-sm sm:text-base md:text-lg text-gray-200 max-w-3xl mb-8 leading-relaxed drop-shadow-[0_2px_20px_rgba(0,0,0,0.9)] lg:mb-6 lg:max-w-[13rem] lg:text-[1.05rem] lg:leading-[1.15]">
                I'm Aravind - a data analyst, project manager and Gen AI researcher turning messy numbers into clear, beautiful insight.
              </p>

              <div className="flex items-center gap-3 sm:gap-4">
                <a
                  href="https://github.com/thakarvind"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-3 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/20 backdrop-blur-xl transition-colors"
                  aria-label="GitHub"
                >
                  <Github className="w-5 h-5 text-gray-200 group-hover:text-white" />
                </a>
                <a
                  href="https://www.linkedin.com/in/arvind-thak/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-3 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/20 backdrop-blur-xl transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5 text-gray-200 group-hover:text-white" />
                </a>
                <a
                  href="/Thak_Aravind_Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-3 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/20 backdrop-blur-xl transition-colors"
                  aria-label="Resume"
                >
                  <FileText className="w-5 h-5 text-gray-200 group-hover:text-white" />
                </a>
              </div>
            </div>
          </div>

        </motion.div>
      </div>
    </section>
  );
}
