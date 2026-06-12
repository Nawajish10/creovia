"use client";

import { motion } from "framer-motion";

const floatingVariants = {
  animate: (i: number) => ({
    y: [0, -10, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut" as const,
      delay: i * 0.5,
    },
  }),
};

export function ProductShowcase() {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="relative h-[600px] w-full flex items-center justify-center">
          {/* Central Hub */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            className="w-32 h-32 rounded-3xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-[0_0_50px_rgba(37,99,235,0.5)] z-20"
          >
            <span className="material-symbols-outlined text-5xl text-white">memory</span>
          </motion.div>

          {/* Floating Card 1 */}
          <motion.div
            custom={0}
            variants={floatingVariants}
            animate="animate"
            className="absolute top-[10%] left-[10%] md:left-[20%] w-64 bg-[#0F172A] border border-blue-500/30 rounded-2xl p-4 shadow-lg backdrop-blur-xl"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                <span className="material-symbols-outlined text-blue-400">database</span>
              </div>
              <div>
                <div className="text-sm font-semibold text-white">Data Pipeline</div>
                <div className="text-xs text-green-400">Processing: 99.9%</div>
              </div>
            </div>
            <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-blue-500 w-[85%]" />
            </div>
          </motion.div>

          {/* Floating Card 2 */}
          <motion.div
            custom={1}
            variants={floatingVariants}
            animate="animate"
            className="absolute bottom-[20%] left-[5%] md:left-[15%] w-56 bg-[#0F172A] border border-blue-500/20 rounded-2xl p-4 shadow-lg backdrop-blur-xl z-30"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center">
                <span className="material-symbols-outlined text-purple-400 text-sm">smart_toy</span>
              </div>
              <div className="text-sm font-semibold text-white">Agent Alpha</div>
            </div>
            <div className="text-xs text-gray-400">Status: <span className="text-blue-400">Active</span></div>
            <div className="text-xs text-gray-400">Tasks: 1,240</div>
          </motion.div>

          {/* Floating Card 3 */}
          <motion.div
            custom={2}
            variants={floatingVariants}
            animate="animate"
            className="absolute top-[20%] right-[5%] md:right-[15%] w-72 bg-[#0F172A] border border-white/10 rounded-2xl p-5 shadow-lg backdrop-blur-xl"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-orange-500/20 flex items-center justify-center">
                  <span className="material-symbols-outlined text-orange-400">monitoring</span>
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">Analytics Engine</div>
                  <div className="text-xs text-gray-400">Real-time metrics</div>
                </div>
              </div>
              <span className="material-symbols-outlined text-gray-500">more_horiz</span>
            </div>
            <div className="flex justify-between items-end">
              <div>
                <div className="text-xs text-gray-400 mb-1">Total Processed</div>
                <div className="text-xl font-bold text-white">2.4M</div>
              </div>
              <div className="text-xs text-green-400 flex items-center">
                <span className="material-symbols-outlined text-xs">trending_up</span>
                12.5%
              </div>
            </div>
          </motion.div>

          {/* Connecting lines SVG background */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20" xmlns="http://www.w3.org/2000/svg">
            <path d="M50% 50% L25% 20%" stroke="#3B82F6" strokeWidth="2" strokeDasharray="5,5" fill="none" />
            <path d="M50% 50% L20% 75%" stroke="#3B82F6" strokeWidth="2" strokeDasharray="5,5" fill="none" />
            <path d="M50% 50% L75% 30%" stroke="#3B82F6" strokeWidth="2" strokeDasharray="5,5" fill="none" />
          </svg>
        </div>
      </div>
    </section>
  );
}
