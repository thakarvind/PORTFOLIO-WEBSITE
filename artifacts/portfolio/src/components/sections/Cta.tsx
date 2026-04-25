import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useRef } from "react";

export function Cta() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Last-page animation: torus scales up, drifts, and rotates as the section scrolls in
  const torusScale = useTransform(scrollYProgress, [0, 0.4, 0.8, 1], [0.5, 1, 1.4, 1.6]);
  const torusY = useTransform(scrollYProgress, [0, 1], [80, -120]);
  const torusOpacity = useTransform(scrollYProgress, [0, 0.2, 0.85, 1], [0, 0.9, 0.9, 0.4]);

  return (
    <section ref={ref} className="relative py-32 md:py-56 overflow-hidden bg-black border-y border-white/5" id="contact">
      {/* Last-page torus animation */}
      <motion.div
        style={{ scale: torusScale, y: torusY, opacity: torusOpacity }}
        className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none"
      >
        <motion.div
          className="relative w-[min(90vw,720px)] aspect-square"
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        >
          <div className="absolute inset-0 bg-[url('/images/hero-bg.png')] bg-contain bg-center bg-no-repeat" />
        </motion.div>
      </motion.div>

      <div className="absolute inset-0 z-[1] bg-[radial-gradient(ellipse_at_center,transparent_0%,black_75%)]" />

      <div className="container relative z-10 mx-auto px-4 max-w-5xl">
        {/* Glass card wrapper for the last page */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="relative bg-white/[0.04] backdrop-blur-[40px] backdrop-saturate-150 border border-white/15 rounded-[2.5rem] p-8 sm:p-12 md:p-16 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8),inset_0_1px_0_0_rgba(255,255,255,0.15)] overflow-hidden"
        >
          <div className="absolute -top-px inset-x-12 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-br from-white/[0.08] via-transparent to-white/[0.02] pointer-events-none rounded-[2.5rem]" />
          <div className="relative flex flex-col md:flex-row items-start justify-between gap-12 md:gap-16">
            <div className="flex-1">
              <p className="text-[11px] uppercase tracking-[0.3em] text-gray-400 mb-6 font-semibold">Get in touch</p>
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium tracking-tighter text-white leading-[1.05]">
                Let's build something that matters.
              </h2>
            </div>

            <div className="flex-1 flex flex-col gap-8 items-start w-full">
              <p className="text-lg sm:text-xl text-gray-300 leading-relaxed">
                Whether it's a one-off analysis, a polished dashboard, or a full product — I'd love to hear what you're working on.
              </p>

              <div className="flex flex-col gap-4 w-full sm:w-auto">
                <a
                  href="mailto:thakarvind@gmail.com"
                  className="group flex items-center justify-between gap-4 bg-white text-black px-8 py-4 rounded-full font-medium text-base sm:text-lg transition-transform hover:scale-105 w-full sm:w-auto"
                >
                  Email Me
                  <div className="bg-black text-white rounded-full p-1.5 transition-transform group-hover:translate-x-1">
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </a>
                <a
                  href="/Thak_Aravind_Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between gap-4 bg-white/[0.05] text-white px-8 py-4 rounded-full font-medium text-base sm:text-lg border border-white/15 backdrop-blur-xl transition-all hover:bg-white/10 w-full sm:w-auto"
                >
                  Resume
                  <div className="bg-white text-black rounded-full p-1.5 transition-transform group-hover:translate-x-1">
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}