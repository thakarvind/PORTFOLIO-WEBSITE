import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { SiPython, SiPandas, SiReact, SiTypescript, SiNodedotjs, SiPostgresql, SiTailwindcss, SiFigma } from "react-icons/si";

const tools = [
  { icon: SiPython, label: "Python", color: "hover:text-[#3776AB]" },
  { icon: SiPandas, label: "Pandas", color: "hover:text-[#150458]" },
  { icon: SiReact, label: "React", color: "hover:text-[#61DAFB]" },
  { icon: SiTypescript, label: "TypeScript", color: "hover:text-[#3178C6]" },
  { icon: SiNodedotjs, label: "Node.js", color: "hover:text-[#339933]" },
  { icon: SiPostgresql, label: "PostgreSQL", color: "hover:text-[#4169E1]" },
  { icon: SiTailwindcss, label: "Tailwind", color: "hover:text-[#06B6D4]" },
  { icon: SiFigma, label: "Figma", color: "hover:text-[#F24E1E]" },
];

export function Toolbox() {
  return (
    <section className="py-32 bg-black text-white relative z-10 border-t border-white/5" id="toolbox">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex-1"
          >
            <p className="text-[11px] uppercase tracking-[0.3em] text-gray-500 mb-6 font-semibold">Toolbox</p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight mb-6 leading-tight">
              The stack I reach for.
            </h2>
            <p className="text-xl text-gray-400 leading-relaxed max-w-md">
              Across data, frontend, and backend — these are the tools I build with daily to turn ideas into production-ready experiences.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex-1 w-full max-w-md relative aspect-square"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#181818] to-[#0a0a0a] rounded-full border border-white/10 flex items-center justify-center shadow-2xl overflow-hidden">
              <div className="absolute inset-0 bg-[url('/images/solutions-bg.png')] bg-cover bg-center opacity-20 mix-blend-screen grayscale" />
              
              <div className="w-16 h-16 bg-white text-black rounded-2xl flex items-center justify-center z-20 shadow-[0_0_40px_rgba(255,255,255,0.2)]">
                <Plus className="w-8 h-8" />
              </div>

              {/* Connecting Lines */}
              <div className="absolute inset-0 z-10">
                <svg className="w-full h-full text-white/5" viewBox="0 0 100 100" preserveAspectRatio="none">
                  {/* Lines radiating from center (50,50) */}
                  <line x1="50" y1="50" x2="50" y2="15" stroke="currentColor" strokeWidth="0.5" />
                  <line x1="50" y1="50" x2="85" y2="50" stroke="currentColor" strokeWidth="0.5" />
                  <line x1="50" y1="50" x2="50" y2="85" stroke="currentColor" strokeWidth="0.5" />
                  <line x1="50" y1="50" x2="15" y2="50" stroke="currentColor" strokeWidth="0.5" />
                  
                  <line x1="50" y1="50" x2="75" y2="25" stroke="currentColor" strokeWidth="0.5" />
                  <line x1="50" y1="50" x2="75" y2="75" stroke="currentColor" strokeWidth="0.5" />
                  <line x1="50" y1="50" x2="25" y2="75" stroke="currentColor" strokeWidth="0.5" />
                  <line x1="50" y1="50" x2="25" y2="25" stroke="currentColor" strokeWidth="0.5" />
                </svg>
              </div>

              {/* Floating Icons */}
              {tools.map((tool, i) => {
                const angle = (i * Math.PI * 2) / tools.length - Math.PI / 2;
                const radius = 38; // percentage
                const top = 50 + radius * Math.sin(angle);
                const left = 50 + radius * Math.cos(angle);
                const Icon = tool.icon;

                return (
                  <motion.div
                    key={tool.label}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 + 0.5 }}
                    style={{ top: `${top}%`, left: `${left}%` }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 z-20 group"
                  >
                    <div className="w-12 h-12 bg-[#0f0f0f] border border-white/10 rounded-xl flex items-center justify-center shadow-lg transition-transform group-hover:scale-110">
                      <Icon className={`w-6 h-6 text-gray-400 transition-colors ${tool.color}`} />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}