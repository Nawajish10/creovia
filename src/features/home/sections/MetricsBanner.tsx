"use client";

import { motion } from "framer-motion";

const metrics = [
  {
    icon: "groups",
    color: "bg-[#1E40AF]", // Deep Blue
    value: "5,000+",
    label: "Assets Valued"
  },
  {
    icon: "trending_up",
    color: "bg-[#581C87]", // Deep Purple
    value: "$248M+",
    label: "Total Asset Value Analyzed"
  },
  {
    icon: "hub",
    color: "bg-[#064E3B]", // Deep Emerald
    value: "12+",
    label: "Platforms Supported"
  },
  {
    icon: "local_police",
    color: "bg-[#78350F]", // Deep Amber
    value: "99%",
    label: "Valuation Accuracy"
  }
];

export function MetricsBanner() {
  return (
    <section className="bg-[#020617] py-16 px-6 md:px-12 relative z-20 border-y border-white/5">
      <div className="max-w-[clamp(420px,109.375vw,1400px)] mx-auto flex flex-row items-start md:items-center justify-between gap-10 md:gap-4">
        {metrics.map((metric, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.1, ease: "easeOut" }}
            whileHover={{ y: -5, scale: 1.02 }}
            className="flex items-center gap-5 cursor-default group"
          >
            <div className={`w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center ${metric.color} shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]`}>
              <span className="material-symbols-outlined text-white text-[clamp(11.2px,2.1875vw,28px)] md:text-[clamp(12.8px,2.5vw,32px)]">{metric.icon}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-white text-[clamp(10.4px,2.03125vw,26px)] md:text-[clamp(12.8px,2.5vw,32px)] leading-tight font-inter font-[800] tracking-tight">{metric.value}</span>
              <span className="text-gray-400 text-[clamp(5.6px,1.09375vw,14px)] md:text-[clamp(6px,1.171875vw,15px)] font-inter font-medium">{metric.label}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
