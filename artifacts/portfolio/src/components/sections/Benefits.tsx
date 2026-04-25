import { motion } from "framer-motion";

export function Benefits() {
  return (
    <section className="py-32 bg-black text-white relative z-10">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex flex-col lg:flex-row items-start gap-16 lg:gap-32">
          
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex-1 sticky top-32"
          >
            <p className="text-[11px] uppercase tracking-[0.3em] text-gray-500 mb-6 font-semibold">By The Numbers</p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight leading-tight mb-6">
              Fast. Curious. Reliable.<br/>Welcome to my work.
            </h2>
          </motion.div>

          <div className="flex-1 w-full flex flex-col gap-6">
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative bg-white text-black rounded-3xl p-10 md:p-16 flex flex-col justify-center min-h-[300px] shadow-2xl overflow-hidden"
            >
              <h3 className="text-7xl md:text-8xl font-medium tracking-tighter mb-6">+47%</h3>
              <p className="text-xl md:text-2xl text-gray-600 font-medium">
                Faster reporting cycles for the teams I've worked with.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="relative bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-3xl p-10 md:p-16 flex flex-col justify-center min-h-[300px] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.6)] overflow-hidden"
            >
              <h3 className="text-7xl md:text-8xl font-medium tracking-tighter mb-6">100k+</h3>
              <p className="text-xl md:text-2xl text-gray-400 font-medium">
                Rows of real-world data analyzed and visualized.
              </p>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}