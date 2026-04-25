import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const services = [
  {
    title: "Data Analysis",
    desc: "Clean, explore, and visualize your data so you can act on it.",
    bullets: ["Exploratory data analysis", "Custom Jupyter / Python pipelines", "Insight reports & decks", "Stakeholder walkthroughs"],
    inverted: false
  },
  {
    title: "Dashboards & Apps",
    desc: "Production-ready interactive dashboards and internal tools.",
    bullets: ["React + Recharts dashboards", "Streamlit prototypes", "Real-time data refresh", "User auth & access control"],
    inverted: true
  },
  {
    title: "Full-Stack Builds",
    desc: "Complete web products, from API to UI.",
    bullets: ["React + TypeScript front-end", "Node / Express APIs", "PostgreSQL + Drizzle", "Deployment & monitoring"],
    inverted: false
  }
];

export function Services() {
  return (
    <section className="py-32 bg-black text-white relative z-10" id="services">
      <div className="container mx-auto px-4 max-w-6xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-24"
        >
          <p className="text-[11px] uppercase tracking-[0.3em] text-gray-500 mb-6 font-semibold">Services</p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight leading-tight">
            How we can work together.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className={`rounded-3xl p-8 flex flex-col h-full border ${
                service.inverted 
                  ? "bg-white text-black border-transparent shadow-xl" 
                  : "bg-gradient-to-b from-[#181818] to-[#0a0a0a] border-white/5"
              }`}
            >
              <h3 className="text-2xl font-medium mb-4 tracking-tight">{service.title}</h3>
              <p className={`mb-8 ${service.inverted ? "text-gray-600" : "text-gray-400"}`}>
                {service.desc}
              </p>
              
              <ul className="space-y-4 mb-12 flex-1">
                {service.bullets.map((bullet, j) => (
                  <li key={j} className="flex items-start gap-3">
                    <span className="text-sm mt-1">✦</span>
                    <span className={service.inverted ? "text-black" : "text-gray-300"}>{bullet}</span>
                  </li>
                ))}
              </ul>

              <a
                href="#contact"
                className={`group flex items-center justify-between gap-4 px-6 py-3 rounded-full font-medium text-sm transition-transform hover:scale-105 mt-auto w-full ${
                  service.inverted
                    ? "bg-black text-white"
                    : "bg-white text-black"
                }`}
              >
                Get in Touch
                <div className={`rounded-full p-1 transition-transform group-hover:translate-x-1 ${
                  service.inverted ? "bg-white text-black" : "bg-black text-white"
                }`}>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}