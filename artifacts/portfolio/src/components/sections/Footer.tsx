import { SiGithub } from "react-icons/si";
import { Mail, Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-black border-t border-white/10 text-white py-12 relative z-10">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 border-b border-white/5 pb-12 mb-8">
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-semibold tracking-tight mb-2">Arvind Thakkar</h3>
            <p className="text-gray-400 text-sm">Data Analyst & Full-Stack Developer · India</p>
          </div>
          
          <div className="flex items-center gap-4">
            <a href="https://github.com/thakarvind" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-[#111] hover:bg-[#222] border border-white/5 transition-colors group">
              <SiGithub className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
            </a>
            <a href="https://www.linkedin.com/in/arvind-thak/" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-[#111] hover:bg-[#222] border border-white/5 transition-colors group">
              <Linkedin className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
            </a>
            <a href="mailto:arvind.thakkar@example.com" className="p-3 rounded-full bg-[#111] hover:bg-[#222] border border-white/5 transition-colors group">
              <Mail className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
            </a>
          </div>
        </div>

        <div className="text-center md:text-left text-xs text-gray-600 font-medium">
          © {new Date().getFullYear()} Arvind Thakkar. Built with curiosity.
        </div>
      </div>
    </footer>
  );
}