"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const steps = [
  { id: 1, label: "Data Source" },
  { id: 2, label: "AI Model" },
  { id: 3, label: "Action" },
  { id: 4, label: "Deploy" },
];

const cards = [
  { id: "postgres", icon: "database", title: "PostgreSQL", desc: "Connect your database", color: "text-blue-400", bg: "bg-blue-500/10" },
  { id: "stripe", icon: "payments", title: "Stripe", desc: "Billing & Subscriptions", color: "text-purple-400", bg: "bg-purple-500/10" },
  { id: "slack", icon: "forum", title: "Slack", desc: "Team Communication", color: "text-green-400", bg: "bg-green-500/10" },
  { id: "github", icon: "code", title: "GitHub", desc: "Repositories & Commits", color: "text-gray-200", bg: "bg-gray-500/10" },
];

export function Features() {
  const [activeStep, setActiveStep] = useState(1);
  const [selectedCard, setSelectedCard] = useState("postgres");

  return (
    <section className="py-24 relative">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Build Your <span className="text-blue-500">Workflow</span>
          </h2>
          <p className="text-gray-400 text-lg">Connect your tools, select your AI, and deploy in seconds.</p>
        </div>

        <div className="bg-[#0F172A] border border-blue-500/20 rounded-3xl p-8 shadow-[0_0_40px_rgba(37,99,235,0.1)] relative">
          
          {/* Stepper */}
          <div className="flex items-center justify-between mb-12 relative">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-[1px] bg-white/10 z-0"></div>
            {steps.map((step) => {
              const isActive = activeStep >= step.id;
              const isCurrent = activeStep === step.id;
              return (
                <div key={step.id} className="relative z-10 flex flex-col items-center gap-2 bg-[#0F172A] px-2 md:px-4 cursor-pointer" onClick={() => setActiveStep(step.id)}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${isActive ? 'bg-blue-600 text-white shadow-[0_0_15px_rgba(37,99,235,0.6)]' : 'bg-white/5 text-gray-500 border border-white/10'}`}>
                    {step.id}
                  </div>
                  <span className={`text-xs md:text-sm font-medium ${isCurrent ? 'text-blue-400' : 'text-gray-500'}`}>{step.label}</span>
                </div>
              );
            })}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-white mb-2">
                  {activeStep === 1 && "Which data source do you want to connect?"}
                  {activeStep === 2 && "Choose an AI Model for processing"}
                  {activeStep === 3 && "What action should trigger?"}
                  {activeStep === 4 && "Review & Deploy"}
                </h3>
                <p className="text-gray-400 text-sm">Select the primary integration for this workflow.</p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {cards.map((card) => {
                  const isSelected = selectedCard === card.id;
                  return (
                    <div 
                      key={card.id}
                      onClick={() => setSelectedCard(card.id)}
                      className={`cursor-pointer rounded-2xl p-6 transition-all duration-300 border relative ${
                        isSelected 
                          ? 'bg-blue-600/10 border-blue-500 shadow-[0_0_20px_rgba(37,99,235,0.2)]' 
                          : 'bg-white/5 border-white/10 hover:border-white/20'
                      }`}
                    >
                      {isSelected && (
                        <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center">
                          <span className="material-symbols-outlined text-white text-[12px]">check</span>
                        </div>
                      )}
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${card.bg}`}>
                        <span className={`material-symbols-outlined ${card.color}`}>{card.icon}</span>
                      </div>
                      <div className="text-white font-semibold mb-1">{card.title}</div>
                      <div className="text-gray-400 text-xs leading-relaxed">{card.desc}</div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-end mt-8 border-t border-white/10 pt-6">
            <button 
              onClick={() => setActiveStep(prev => Math.min(prev + 1, 4))}
              className="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-xl transition-all shadow-[0_0_15px_rgba(37,99,235,0.4)] flex items-center gap-2"
            >
              Next Step
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>

          {/* Bottom Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {[1, 2, 3, 4].map((dot) => (
              <div 
                key={dot} 
                className={`w-2 h-2 rounded-full transition-all ${dot === activeStep ? 'bg-blue-500 w-4' : 'bg-white/20'}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
