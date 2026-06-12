"use client";

import { motion } from "framer-motion";

const stats = [
  { id: 1, label: "Workflows Automated", value: "10M+", icon: "account_tree", color: "text-blue-400", bgColor: "bg-blue-500/10" },
  { id: 2, label: "Time Saved (Hours)", value: "500k", icon: "schedule", color: "text-purple-400", bgColor: "bg-purple-500/10" },
  { id: 3, label: "AI Models Supported", value: "50+", icon: "hub", color: "text-green-400", bgColor: "bg-green-500/10" },
  { id: 4, label: "Enterprise Security", value: "100%", icon: "shield", color: "text-orange-400", bgColor: "bg-orange-500/10" },
];

export function Metrics() {
  return (
    <section className="py-16 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-row items-center sm:items-start gap-4 text-center sm:text-left hover:bg-white/10 transition-colors"
            >
              <div className={`w-12 h-12 rounded-full ${stat.bgColor} flex items-center justify-center shrink-0`}>
                <span className={`material-symbols-outlined ${stat.color}`}>{stat.icon}</span>
              </div>
              <div>
                <div className="text-2xl md:text-3xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
