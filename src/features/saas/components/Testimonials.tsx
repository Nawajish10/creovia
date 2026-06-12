"use client";

import { motion } from "framer-motion";

const testimonials = [
  {
    quote: "NexAI has completely transformed how we process inbound leads. What used to take our sales team 4 hours a day now happens instantly.",
    author: "Sarah Jenkins",
    role: "VP of Sales, TechFlow",
    avatar: "person"
  },
  {
    quote: "The ability to chain multiple AI models together visually without writing Python scripts is a game-changer for our data engineering team.",
    author: "David Chen",
    role: "Lead Engineer, DataSense",
    avatar: "engineering"
  },
  {
    quote: "We deployed a customer support agent in 2 days that handles 60% of our tickets. The ROI was immediate.",
    author: "Elena Rodriguez",
    role: "Director of CS, OmniCloud",
    avatar: "support_agent"
  }
];

export function Testimonials() {
  return (
    <section className="py-24 relative bg-[#0a0e17]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Trusted by <span className="text-blue-500">Industry Leaders</span>
          </h2>
        </div>

        <div className="grid grid-cols-3 gap-8">
          {testimonials.map((t, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:border-blue-500/30 transition-colors"
            >
              <div className="flex text-blue-500 mb-6">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                ))}
              </div>
              <p className="text-gray-300 mb-8 leading-relaxed">"{t.quote}"</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-900/50 flex items-center justify-center">
                  <span className="material-symbols-outlined text-blue-400">{t.avatar}</span>
                </div>
                <div>
                  <div className="text-white font-semibold">{t.author}</div>
                  <div className="text-gray-400 text-sm">{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
