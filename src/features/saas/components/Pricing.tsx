"use client";

import { motion } from "framer-motion";

const tiers = [
  {
    name: "Starter",
    price: "$49",
    desc: "Perfect for individuals and small teams.",
    features: ["Up to 5 workflows", "10,000 tasks/month", "Basic AI Models", "Community Support"],
    highlighted: false,
  },
  {
    name: "Pro",
    price: "$149",
    desc: "For growing companies needing more power.",
    features: ["Unlimited workflows", "100,000 tasks/month", "Advanced AI Models (GPT-4, Claude 3.5)", "Priority 24/7 Support", "Custom integrations"],
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    desc: "Dedicated infrastructure and support.",
    features: ["Unlimited tasks", "Custom model fine-tuning", "Dedicated account manager", "On-premise deployment options", "SLA guarantee"],
    highlighted: false,
  }
];

export function Pricing() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Simple, Transparent <span className="text-blue-500">Pricing</span>
          </h2>
          <p className="text-gray-400 text-lg">Scale your AI workflows without breaking the bank.</p>
        </div>

        <div className="grid grid-cols-3 gap-8">
          {tiers.map((tier, index) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className={`rounded-3xl p-8 relative flex flex-col h-full ${
                tier.highlighted
                  ? "bg-gradient-to-b from-blue-600/20 to-blue-900/10 border-2 border-blue-500 shadow-[0_0_30px_rgba(37,99,235,0.2)]"
                  : "bg-white/5 border border-white/10"
              }`}
            >
              {tier.highlighted && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-500 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                  Most Popular
                </div>
              )}
              
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-white mb-2">{tier.name}</h3>
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-4xl font-bold text-white">{tier.price}</span>
                  {tier.price !== "Custom" && <span className="text-gray-400">/mo</span>}
                </div>
                <p className="text-gray-400 text-sm">{tier.desc}</p>
              </div>

              <ul className="space-y-4 mb-8 flex-1">
                {tier.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-blue-500 text-[20px] shrink-0">check_circle</span>
                    <span className="text-gray-300 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <button className={`w-full py-4 rounded-xl font-medium transition-all ${
                tier.highlighted
                  ? "bg-blue-600 hover:bg-blue-500 text-white shadow-[0_0_15px_rgba(37,99,235,0.4)]"
                  : "bg-white/10 hover:bg-white/20 text-white"
              }`}>
                {tier.price === "Custom" ? "Contact Sales" : "Get Started"}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
