import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, FileText, Github, Linkedin, Phone } from "lucide-react";
import { useRef } from "react";

export function Cta() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Last-page animation: torus scales up, drifts, and rotates as the section scrolls in
  const torusScale = useTransform(scrollYProgress, [0, 0.4, 0.8, 1], [0.55, 1, 1.42, 1.65]);
  const torusY = useTransform(scrollYProgress, [0, 1], [90, -140]);
  const torusOpacity = useTransform(scrollYProgress, [0, 0.2, 0.85, 1], [0, 0.92, 0.92, 0.35]);
  const cardY = useTransform(scrollYProgress, [0, 0.35, 0.7, 1], [68, 18, -8, -20]);
  const cardScale = useTransform(scrollYProgress, [0, 0.45, 1], [0.95, 1, 1.02]);
  const cardOpacity = useTransform(scrollYProgress, [0, 0.2, 1], [0.1, 1, 1]);

  return (
    <section ref={ref} className="relative py-32 md:py-56 overflow-hidden bg-black border-y border-white/5 overflow-x-clip" id="contact">
      {/* Last-page torus animation */}
      <motion.div
        style={{ scale: torusScale, y: torusY, opacity: torusOpacity }}
        className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none"
      >
        <motion.div
          className="relative w-[min(78vw,620px)] aspect-square sm:w-[min(90vw,720px)]"
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
          className="relative bg-white/[0.06] backdrop-blur-[56px] backdrop-saturate-180 border border-white/20 rounded-[2.5rem] p-8 sm:p-12 md:p-16 shadow-[0_40px_120px_-35px_rgba(0,0,0,0.9),inset_0_1px_0_0_rgba(255,255,255,0.25)] overflow-hidden"
          style={{ y: cardY, scale: cardScale, opacity: cardOpacity }}
        >
          <div className="absolute -top-px inset-x-12 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-br from-white/[0.12] via-transparent to-white/[0.03] pointer-events-none rounded-[2.5rem]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(255,255,255,0.10),transparent_42%)] pointer-events-none rounded-[2.5rem]" />
          <div className="relative flex flex-col md:flex-row items-start justify-between gap-12 md:gap-16">
            <div className="flex-1">
              <p className="text-[11px] uppercase tracking-[0.3em] text-gray-400 mb-6 font-semibold">Contact</p>
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium tracking-tighter text-white leading-[1.05]">
                Have a project in mind?
              </h2>
            </div>

            <div className="flex-1 flex flex-col gap-8 items-start w-full">
              <p className="text-lg sm:text-xl text-gray-300 leading-relaxed">
                I'm actively seeking new challenges. If you think I'd be a great fit for your team, reach out!
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
                  href="tel:+919381047356"
                  className="group flex items-center justify-between gap-4 bg-white text-black px-8 py-4 rounded-full font-medium text-base sm:text-lg transition-transform hover:scale-105 w-full sm:w-auto"
                >
                  +91 9381047356
                  <div className="bg-black text-white rounded-full p-1.5 transition-transform group-hover:translate-x-1">
                    <Phone className="w-5 h-5" />
                  </div>
                </a>
              </div>

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