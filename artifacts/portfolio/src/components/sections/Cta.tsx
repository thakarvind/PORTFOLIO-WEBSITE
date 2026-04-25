import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export function Cta() {
  return (
    <section className="relative py-32 md:py-48 overflow-hidden bg-black border-y border-white/5" id="contact">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[url('/images/solutions-bg.png')] bg-cover bg-center opacity-40 mix-blend-screen grayscale" />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/40 to-black" />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black" />
      </div>

      <div className="container relative z-10 mx-auto px-4 max-w-5xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12 md:gap-24">
          
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex-1"
          >
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-medium tracking-tighter text-white leading-[1.1]">
              Let's build something that matters.
            </h2>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex-1 flex flex-col gap-8 items-start"
          >
            <p className="text-xl text-gray-300 leading-relaxed">
              Whether it's a one-off analysis, a polished dashboard, or a full product — I'd love to hear what you're working on.
            </p>

            <div className="flex flex-col gap-4 w-full sm:w-auto">
              <a
                href="mailto:arvind.thakkar@example.com"
                className="group flex items-center justify-between gap-4 bg-white text-black px-8 py-4 rounded-full font-medium text-lg transition-transform hover:scale-105 w-full sm:w-auto"
              >
                Email Me
                <div className="bg-black text-white rounded-full p-1.5 transition-transform group-hover:translate-x-1">
                  <ArrowRight className="w-5 h-5" />
                </div>
              </a>
              <a
                href="#"
                className="group flex items-center justify-between gap-4 bg-black/40 text-white px-8 py-4 rounded-full font-medium text-lg border border-white/20 backdrop-blur-md transition-all hover:bg-white/10 w-full sm:w-auto"
              >
                Resume
                <div className="bg-white text-black rounded-full p-1.5 transition-transform group-hover:translate-x-1">
                  <ArrowRight className="w-5 h-5" />
                </div>
              </a>
            </div>

            <div className="flex flex-col gap-3 mt-4">
              <span className="text-xs uppercase tracking-[0.2em] text-gray-500 font-semibold">Trusted in</span>
              <div className="flex items-center gap-4 text-sm text-gray-400 font-medium">
                <span>Open Source</span>
                <span className="w-1 h-1 rounded-full bg-gray-600" />
                <span>Personal Projects</span>
                <span className="w-1 h-1 rounded-full bg-gray-600" />
                <span>Freelance</span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}