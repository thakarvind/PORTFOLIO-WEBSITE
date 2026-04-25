import { motion } from "framer-motion";
import { ArrowRight, Menu } from "lucide-react";
import { useState, useEffect } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Work", href: "#work" },
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4"
    >
      <div
        className={`flex items-center justify-between w-full max-w-5xl rounded-full border px-4 py-2 transition-all duration-300 ${
          scrolled
            ? "bg-black/80 backdrop-blur-xl border-white/10 shadow-2xl"
            : "bg-transparent border-transparent"
        }`}
      >
        <a href="#" className="text-white font-medium text-lg tracking-tight px-2">
          Arvind Thakkar
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1 bg-white/5 rounded-full px-2 py-1 border border-white/10 backdrop-blur-md">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-gray-400 hover:text-white px-4 py-2 rounded-full transition-colors"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Let's Talk Button */}
        <div className="hidden md:block">
          <a
            href="#contact"
            className="group flex items-center gap-2 bg-white text-black px-4 py-2 rounded-full font-medium text-sm transition-transform hover:scale-105"
          >
            Let's Talk
            <div className="bg-black text-white rounded-full p-1 transition-transform group-hover:translate-x-1">
              <ArrowRight className="w-3 h-3" />
            </div>
          </a>
        </div>

        {/* Mobile Nav */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <button className="text-white p-2">
                <Menu className="w-6 h-6" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-black/95 backdrop-blur-xl border-white/10 pt-20">
              <div className="flex flex-col gap-6">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="text-2xl font-medium text-gray-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </a>
                ))}
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center gap-2 bg-white text-black px-6 py-3 rounded-full font-medium text-lg mt-8"
                >
                  Let's Talk
                  <ArrowRight className="w-5 h-5" />
                </a>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.nav>
  );
}