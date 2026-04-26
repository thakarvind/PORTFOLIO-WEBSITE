import { motion } from "framer-motion";

const experience = [
  {
    period: "NOV 2024 - JUNE 2025",
    role: "BUSINESS DEVELOPMENT (Web3 Ecosystem Partnership)",
    org: "MEXC (KOL)",
    points: [
      "Conducted market and ecosystem research to identify strategic partnership opportunities within the Web3 community.",
      "Engaged and onboarded 4 Key Opinion Leaders (KOLs) to support community growth and partnership initiatives.",
      "Analyzed engagement metrics and coordinated with internal teams to monitor collaboration performance and partnership outcomes.",
    ],
  },
  {
    period: "JAN 2025 - FEB 2025",
    role: "DATA ANALYTICS INTERNSHIP",
    org: "EXCELERATE",
    points: [
      "Conducted data-driven analysis of multiple Superhero U ad campaigns, evaluating reach, engagement, CTR, and conversion metrics.",
      "Created visual comparisons across campaign performance metrics and identified cost-effectiveness patterns.",
      "Recommended discontinuation of two underperforming campaigns, resulting in approximately 30% cost reduction.",
    ],
  },
  {
    period: "MAY 2024 - JUN 2024",
    role: "INTERNSHIP",
    org: "MICROSOFT - FUTURE READY TALENT",
    points: [
      "Architected a cloud-based chatbot solution using Azure Bot Service and NLP, improving customer response time by 40%.",
      "Developed a serverless static web application using Azure Static Web Apps, reducing page loading time by 50%.",
      "Implemented Azure Storage Accounts to optimize retrieval speed and reduce infrastructure costs.",
    ],
  },
];

export function Experience() {
  return (
    <section className="relative z-10 bg-black py-28 text-white" id="experience">
      <div className="container mx-auto max-w-6xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.7 }}
          className="mb-14"
        >
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.32em] text-gray-500">Experience</p>
          <h2 className="text-4xl font-medium tracking-tight text-white md:text-5xl lg:text-6xl">
            Professional experience.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {experience.map((item, index) => (
            <motion.article
              key={`${item.role}-${index}`}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-120px" }}
              transition={{ duration: 0.6, delay: index * 0.08 }}
              className="relative overflow-hidden rounded-3xl border border-white/15 bg-white/[0.04] p-8 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8),inset_0_1px_0_0_rgba(255,255,255,0.15)] backdrop-blur-[36px]"
            >
              <div className="pointer-events-none absolute -top-px inset-x-8 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
              <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br from-white/[0.08] via-transparent to-white/[0.02]" />

              <div className="relative z-10">
                <p className="text-xs uppercase tracking-[0.28em] text-gray-500">{item.period}</p>
                <h3 className="mt-3 text-2xl font-medium tracking-tight text-white">{item.role}</h3>
                <p className="mt-1 text-sm text-gray-300">{item.org}</p>
                <ul className="mt-6 space-y-3 text-gray-300">
                  {item.points.map((point) => (
                    <li key={point} className="flex items-start gap-2">
                      <span className="mt-1 text-white/70">✦</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
