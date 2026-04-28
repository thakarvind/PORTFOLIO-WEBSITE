import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  CarFront,
  KanbanSquare,
  Music4,
  Shield,
} from "lucide-react";
import { useState } from "react";

const projects = [
  {
    id: 1,
    title: "Uber Pickup Data Analysis (NCR Region)",
    desc: "End-to-end EDA and dashboard for 100k+ NCR ride bookings.",
    link: "https://github.com/thakarvind/UBER-NCR-data-analysis",
    icon: CarFront,
  },
  {
    id: 2,
    title: "Spotify Listening Dashboard",
    desc: "Personal listening-history explorer surfacing top artists, mood swings, and listening peaks.",
    link: "https://github.com/thakarvind/spotify-analysis-dashboard-",
    icon: Music4,
  },
  {
    id: 3,
    title: "LearnQuest",
    desc: "Static web app with provided dedicated chatbot using Azure chatbot service.",
    link: "https://github.com/thakarvind/FRT-PROJECT---LearnQuest",
    icon: KanbanSquare,
  },
  {
    id: 4,
    title: "Network Traffic Analysis Cyber Security Project (Wireshark)",
    desc: "Captured and analyzed live network traffic in Wireshark to study DNS, TCP/IP, TLS, and QUIC behavior.",
    link: "https://github.com/thakarvind/wireshark-network-traffic-analysis",
    icon: Shield,
  },
];

export function Projects() {
  const [active, setActive] = useState(0);

  const next = () => setActive((current) => (current + 1) % projects.length);
  const prev = () => setActive((current) => (current - 1 + projects.length) % projects.length);

  const ActiveIcon = projects[active].icon;

  return (
    <section className="relative z-10 bg-black py-24 text-white lg:py-28" id="projects">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="flex flex-col items-center gap-12 lg:flex-row lg:gap-14">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative aspect-[4/5] w-full overflow-hidden rounded-[2rem] border border-white/10 shadow-2xl lg:w-[48%]"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.16),transparent_30%),radial-gradient(circle_at_80%_15%,rgba(255,255,255,0.08),transparent_24%),linear-gradient(180deg,rgba(255,255,255,0.08),rgba(0,0,0,0.92))]" />
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:56px_56px] opacity-25" />
            <div className="absolute inset-x-0 top-1/2 h-px bg-white/10" />
            <div className="absolute inset-y-0 left-1/2 w-px bg-white/10" />

            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, scale: 1.05, y: 18 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 1.02, y: -18 }}
                transition={{ duration: 0.45 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="relative flex h-64 w-64 items-center justify-center rounded-full border border-white/15 bg-white/5 shadow-[0_0_80px_rgba(255,255,255,0.08)] backdrop-blur-xl sm:h-72 sm:w-72">
                  <div className="absolute inset-6 rounded-full bg-gradient-to-br from-white/25 via-white/10 to-transparent blur-2xl opacity-80" />
                  <div className="absolute inset-12 rounded-full border border-white/10" />
                  <div className="relative flex flex-col items-center gap-4 px-6 text-center">
                    <div className="flex h-20 w-20 items-center justify-center rounded-full border border-white/15 bg-black/35 text-white shadow-[0_0_40px_rgba(255,255,255,0.08)]">
                      <ActiveIcon className="h-10 w-10" />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.45em] text-white/50">
                        {active === 0 ? "Uber" : active === 1 ? "Spotify" : active === 2 ? "LearnQuest" : "Wireshark"}
                      </p>
                      <p className="mt-2 text-xl font-medium tracking-tight text-white sm:text-[1.6rem]">
                        {projects[active].title}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
              <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-gray-400">
                Now showing
              </p>
              <AnimatePresence mode="wait">
                <motion.h4
                  key={active}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3 }}
                  className="text-lg font-medium tracking-tight text-white sm:text-xl"
                >
                  {projects[active].title}
                </motion.h4>
              </AnimatePresence>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-[52%]"
          >
            <p className="mb-6 text-[11px] font-semibold uppercase tracking-[0.3em] text-gray-500">
              Projects
            </p>
            <h2 className="mb-8 text-3xl font-medium leading-tight tracking-tight md:text-4xl lg:text-5xl">
              Bigger, clearer project stories.
            </h2>

            <div className="relative min-h-[280px] overflow-hidden rounded-[1.75rem] border border-white/15 bg-white/[0.04] p-7 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8),inset_0_1px_0_0_rgba(255,255,255,0.15)] backdrop-blur-[40px] backdrop-saturate-150 md:p-9">
              <div className="pointer-events-none absolute -top-px inset-x-8 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
              <div className="pointer-events-none absolute inset-0 rounded-[2rem] bg-gradient-to-br from-white/[0.08] via-transparent to-white/[0.02]" />

              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col gap-4"
                >
                  <h3 className="text-xl font-medium tracking-tight sm:text-2xl">
                    {projects[active].title}
                  </h3>
                  <p className="mb-5 max-w-xl text-base leading-relaxed text-gray-400 sm:text-lg">
                    {projects[active].desc}
                  </p>
                  <a
                    href={projects[active].link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-fit items-center gap-2 font-medium text-white transition-colors hover:text-gray-300"
                  >
                    View on GitHub <ArrowRight className="h-4 w-4" />
                  </a>
                </motion.div>
              </AnimatePresence>

              <div className="mt-8 flex items-center justify-between border-t border-white/5 pt-6">
                <div className="flex gap-2">
                  {projects.map((_, index) => (
                    <div
                      key={index}
                      className={`h-1.5 rounded-full transition-all duration-300 ${index === active ? "w-8 bg-white" : "w-2 bg-white/20"}`}
                    />
                  ))}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={prev}
                    className="rounded-full border border-white/10 p-3 transition-colors hover:bg-white/5"
                  >
                    <ArrowLeft className="h-4 w-4" />
                  </button>
                  <button
                    onClick={next}
                    className="rounded-full border border-white/10 p-3 transition-colors hover:bg-white/5"
                  >
                    <ArrowRight className="h-4 w-4" />
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