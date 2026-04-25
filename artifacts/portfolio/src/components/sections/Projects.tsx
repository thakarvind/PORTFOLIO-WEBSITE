import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { useState } from "react";

const projects = [
  {
    id: 1,
    title: "Uber NCR — Ride Analytics",
    desc: "End-to-end EDA and dashboard for 100k+ NCR ride bookings.",
    link: "https://github.com/thakarvind/UBER-NCR-data-analysis"
  },
  {
    id: 2,
    title: "Spotify Listening Dashboard",
    desc: "Personal listening-history explorer surfacing top artists, mood swings, and listening peaks.",
    link: "https://github.com/thakarvind/spotify-analysis-dashboard-"
  },
  {
    id: 3,
    title: "LearnQuest",
    desc: "Front-end learning platform built as a CSS-driven study project.",
    link: "https://github.com/thakarvind/FRT-PROJECT---LearnQuest"
  }
];

export function Projects() {
  const [active, setActive] = useState(0);

  const next = () => setActive((a) => (a + 1) % projects.length);
  const prev = () => setActive((a) => (a - 1 + projects.length) % projects.length);

  return (
    <section className="py-32 bg-black text-white relative z-10" id="projects">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex-1 w-full lg:w-1/2 aspect-square rounded-[2rem] overflow-hidden relative"
          >
            <img 
              src="/images/solutions-bg.png" 
              alt="Abstract background" 
              className="w-full h-full object-cover filter grayscale contrast-125"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
            <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px]" />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex-1 w-full lg:w-1/2"
          >
            <p className="text-[11px] uppercase tracking-[0.3em] text-gray-500 mb-6 font-semibold">Projects</p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight mb-4 leading-tight">
              Built end-to-end.
            </h2>
            <p className="text-xl text-gray-400 mb-12">
              A few things I've shipped.
            </p>

            <div className="relative min-h-[250px] bg-[#0a0a0a] border border-white/5 rounded-3xl p-8 md:p-10 flex flex-col justify-between">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col gap-4"
                >
                  <h3 className="text-3xl font-medium tracking-tight">{projects[active].title}</h3>
                  <p className="text-gray-400 text-lg leading-relaxed mb-6">
                    {projects[active].desc}
                  </p>
                  <a
                    href={projects[active].link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-white font-medium hover:text-gray-300 transition-colors w-fit"
                  >
                    View on GitHub <ArrowRight className="w-4 h-4" />
                  </a>
                </motion.div>
              </AnimatePresence>

              <div className="mt-8 flex items-center justify-between border-t border-white/5 pt-6">
                <div className="flex gap-2">
                  {projects.map((_, i) => (
                    <div 
                      key={i} 
                      className={`h-1.5 rounded-full transition-all duration-300 ${i === active ? 'w-8 bg-white' : 'w-2 bg-white/20'}`} 
                    />
                  ))}
                </div>
                <div className="flex gap-2">
                  <button onClick={prev} className="p-3 rounded-full border border-white/10 hover:bg-white/5 transition-colors">
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                  <button onClick={next} className="p-3 rounded-full border border-white/10 hover:bg-white/5 transition-colors">
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}