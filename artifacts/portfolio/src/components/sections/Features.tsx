import { motion } from "framer-motion";

const cards = [
  {
    num: "01",
    title: "Data Analysis & Storytelling",
    body: "Cleaning, exploring, and visualizing real-world datasets to surface stories that drive decisions.",
    image: "/images/shape-1.png"
  },
  {
    num: "02",
    title: "Interactive Dashboards",
    body: "Power BI, Excel, and custom dashboards that make complex data feel obvious.",
    image: "/images/shape-2.png"
  },
  {
    num: "03",
    title: "Prompt Engineering & Gen AI",
    body: "Designing prompts and Gen AI workflows with ChatGPT and Gemini to ship faster, smarter outputs.",
    image: "/images/shape-3.png"
  }
];

export function Features() {
  return (
    <section className="py-32 bg-black text-white relative z-10" id="skills">
      <div className="container px-4 mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-24"
        >
          <p className="text-[11px] uppercase tracking-[0.3em] text-gray-500 mb-6 font-semibold">What I Do</p>
          <h2 className="text-4xl md:text-6xl font-medium tracking-tight mb-6">
            Where data meets design.
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            I work across the full stack — from messy CSVs to production dashboards.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((card, i) => (
            <motion.div
              key={card.num}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group bg-white/[0.04] backdrop-blur-[40px] backdrop-saturate-150 rounded-3xl border border-white/15 p-8 relative overflow-hidden hover:-translate-y-1 hover:bg-white/[0.06] hover:border-white/25 transition-all duration-500 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8),inset_0_1px_0_0_rgba(255,255,255,0.15)]"
            >
              {/* Glass specular highlights */}
              <div className="absolute -top-px inset-x-8 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.08] via-transparent to-white/[0.02] pointer-events-none rounded-3xl" />
              <div className="relative z-10 flex flex-col h-full">
                <span className="text-sm font-medium text-gray-500 mb-8">{card.num}</span>
                <div className="w-full aspect-square mb-8 rounded-2xl overflow-hidden bg-white/[0.02] backdrop-blur-xl border border-white/10 relative">
                   <img src={card.image} alt={card.title} className="absolute inset-0 w-full h-full object-cover opacity-80 mix-blend-screen" />
                </div>
                <h3 className="text-2xl font-medium mb-4 tracking-tight">{card.title}</h3>
                <p className="text-gray-400 leading-relaxed mt-auto">
                  {card.body}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}