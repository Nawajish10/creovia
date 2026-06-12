"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    q: "How does the AI automation work?",
    a: "Our platform connects to your existing tools via APIs, and uses advanced LLMs to interpret data, make decisions, and trigger actions based on the parameters you define in the workflow builder."
  },
  {
    q: "Do I need coding experience to use NexAI?",
    a: "Not at all. NexAI features a drag-and-drop visual interface. If you can map out a process on a whiteboard, you can build it in our platform."
  },
  {
    q: "Is my data secure?",
    a: "Security is our top priority. All data is encrypted at rest and in transit. Enterprise customers also get options for VPC peering and single-tenant deployments."
  },
  {
    q: "What AI models do you support?",
    a: "We are model-agnostic. You can use OpenAI's GPT-4, Anthropic's Claude 3.5, Google's Gemini, or even bring your own fine-tuned open-source models."
  }
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 relative">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Frequently Asked <span className="text-blue-500">Questions</span>
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div 
                key={index} 
                className={`border rounded-2xl overflow-hidden transition-colors ${isOpen ? 'bg-white/5 border-blue-500/30' : 'bg-[#0B0F19] border-white/10'}`}
              >
                <button
                  className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                >
                  <span className="font-medium text-white text-lg">{faq.q}</span>
                  <span className={`material-symbols-outlined text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180 text-blue-500' : ''}`}>
                    expand_more
                  </span>
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-6 pb-5 text-gray-400 leading-relaxed">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
