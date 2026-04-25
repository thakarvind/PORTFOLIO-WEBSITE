import { motion } from "framer-motion";
import { Plus, Database, BarChart3, FileSpreadsheet } from "lucide-react";
import { SiOpenai, SiJira, SiGooglegemini } from "react-icons/si";

const tools = [
  { icon: Database, label: "SQL" },
  { icon: BarChart3, label: "Power BI" },
  { icon: FileSpreadsheet, label: "Excel" },
  { icon: SiOpenai, label: "ChatGPT" },
  { icon: SiJira, label: "Jira" },
  { icon: SiGooglegemini, label: "Gemini" },
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
            className="flex-1 w-full max-w-md mx-auto relative aspect-square"
          >
            {/* Blurred background image */}
            <div className="absolute inset-[-10%] rounded-full overflow-hidden">
              <div className="absolute inset-0 bg-[url('/images/solutions-bg.png')] bg-cover bg-center opacity-40 grayscale blur-2xl scale-110" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,black_70%)]" />
            </div>

            <div className="absolute inset-0 bg-white/[0.04] backdrop-blur-[40px] backdrop-saturate-150 rounded-full border border-white/15 flex items-center justify-center shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8),inset_0_1px_0_0_rgba(255,255,255,0.15)] overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.08] via-transparent to-white/[0.02] pointer-events-none" />
              <div className="w-16 h-16 bg-white text-black rounded-2xl flex items-center justify-center z-20 shadow-[0_0_40px_rgba(255,255,255,0.3)]">
                <Plus className="w-8 h-8" />
              </div>

              {/* Connecting Lines */}
              <div className="absolute inset-0 z-10">
                <svg className="w-full h-full text-white/10" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <line x1="50" y1="50" x2="50" y2="15" stroke="currentColor" strokeWidth="0.3" strokeDasharray="1,1" />
                  <line x1="50" y1="50" x2="85" y2="50" stroke="currentColor" strokeWidth="0.3" strokeDasharray="1,1" />
                  <line x1="50" y1="50" x2="50" y2="85" stroke="currentColor" strokeWidth="0.3" strokeDasharray="1,1" />
                  <line x1="50" y1="50" x2="15" y2="50" stroke="currentColor" strokeWidth="0.3" strokeDasharray="1,1" />
                  <line x1="50" y1="50" x2="75" y2="25" stroke="currentColor" strokeWidth="0.3" strokeDasharray="1,1" />
                  <line x1="50" y1="50" x2="75" y2="75" stroke="currentColor" strokeWidth="0.3" strokeDasharray="1,1" />
                  <line x1="50" y1="50" x2="25" y2="75" stroke="currentColor" strokeWidth="0.3" strokeDasharray="1,1" />
                  <line x1="50" y1="50" x2="25" y2="25" stroke="currentColor" strokeWidth="0.3" strokeDasharray="1,1" />
                </svg>
              </div>

              {/* Floating Glass Icons */}
              {tools.map((tool, i) => {
                const angle = (i * Math.PI * 2) / tools.length - Math.PI / 2;
                const radius = 38;
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
                    <div className="flex flex-col items-center gap-1.5">
                      <div className="relative w-12 h-12 sm:w-14 sm:h-14 bg-white/[0.06] backdrop-blur-[40px] backdrop-saturate-150 border border-white/20 rounded-2xl flex items-center justify-center shadow-[0_12px_36px_rgba(0,0,0,0.6),inset_0_1px_0_0_rgba(255,255,255,0.25)] transition-all group-hover:scale-110 group-hover:bg-white/[0.12] group-hover:border-white/35 overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-white/15 via-transparent to-white/5 pointer-events-none" />
                        <div className="absolute -top-px inset-x-2 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent pointer-events-none" />
                        <Icon className="relative w-5 h-5 sm:w-6 sm:h-6 text-white/90 transition-colors group-hover:text-white" />
                      </div>
                      <span className="text-[10px] uppercase tracking-wider text-gray-300 font-semibold opacity-0 group-hover:opacity-100 transition-opacity">{tool.label}</span>
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