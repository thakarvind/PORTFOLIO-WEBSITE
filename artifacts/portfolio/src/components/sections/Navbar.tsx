import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;

    const handleScroll = () => {
      const currentY = window.scrollY;
      setScrolled(currentY > 50);

      // Toolbar animation behavior: hide while scrolling down, show while scrolling up.
      if (currentY <= 24) {
        setHidden(false);
      } else if (currentY > lastY && currentY > 120) {
        setHidden(true);
      } else if (currentY < lastY) {
        setHidden(false);
      }

      lastY = currentY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Experience", href: "#experience" },
    { name: "Projects", href: "#projects" },
    { name: "Skills", href: "#skills" },
    { name: "Certifications", href: "#certifications" },
  ];

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: hidden ? -120 : 0, opacity: hidden ? 0 : 1 }}
      transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-3 left-0 right-0 z-50 flex justify-center px-3 sm:top-4 sm:px-4"
    >
      <div
        className={`flex w-full max-w-5xl flex-col gap-1.5 rounded-2xl border px-1.5 py-1.5 transition-all duration-300 sm:flex-row sm:items-center sm:justify-between sm:gap-3 sm:px-4 sm:py-2 ${
          scrolled
            ? "bg-black/82 backdrop-blur-xl border-white/10 shadow-[0_16px_50px_-24px_rgba(0,0,0,0.9)]"
            : "bg-black/52 backdrop-blur-lg border-white/10 shadow-[0_10px_35px_-28px_rgba(0,0,0,0.7)]"
        }`}
      >
        <div className="flex items-center justify-between gap-2 sm:shrink-0">
          <a href="#" className="text-white font-medium text-[11px] sm:text-base lg:text-lg tracking-tight px-1 sm:px-2 whitespace-nowrap shrink-0">
            THAK ARAVIND
          </a>

          <a
            href="#contact"
            className="group inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-white px-2.5 py-1.5 text-[9px] font-medium text-black transition-transform hover:scale-105 sm:hidden"
          >
            Contact
            <div className="rounded-full bg-black p-0.5 text-white transition-transform group-hover:translate-x-0.5">
              <ArrowRight className="h-2.5 w-2.5" />
            </div>
          </a>
        </div>

        <div className="flex min-w-0 flex-1 items-center justify-center overflow-x-auto no-scrollbar sm:overflow-visible">
          <div className="flex min-w-0 flex-wrap items-center justify-center gap-x-0.5 gap-y-0.5 rounded-xl border border-white/10 bg-white/5 px-1 py-0.5 backdrop-blur-md sm:min-w-0 sm:flex-nowrap sm:gap-1 sm:px-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="whitespace-nowrap rounded-lg px-1.5 py-1 text-[10px] font-medium text-gray-300 transition-colors hover:text-white sm:px-3 sm:text-sm"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>

        <a
          href="#contact"
          className="hidden shrink-0 items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-medium text-black transition-transform hover:scale-105 sm:inline-flex"
        >
          Contact
          <div className="rounded-full bg-black p-1 text-white transition-transform group-hover:translate-x-1">
            <ArrowRight className="h-3 w-3" />
          </div>
        </a>
      </div>
    </motion.nav>
  );
}