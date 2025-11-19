"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "How do I update my course?",
    answer:
      "Go to your dashboard, select your course, and hit the Edit button. Update anything you want and save.",
  },
  {
    question: "Do students see changes instantly?",
    answer:
      "Yep, everything updates in real-time. No approval or review required unless specified.",
  },
  {
    question: "Do I need to upload my thumbnail again?",
    answer:
      "Nope. If you don’t upload a new one, your old thumbnail stays as is.",
  },
  {
    question: "Can any teacher edit any course?",
    answer:
      "Absolutely not. Only the original course creator can edit their own course.",
  },
  {
    question: "What if I make a mistake after updating?",
    answer:
      "You can edit your course anytime. Just jump back into the edit panel and fix it.",
  },
];

export default function AnimatedFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="container mx-auto bg-white p-10 rounded-2xl shadow-xl mt-14 border">
      <h2 className="text-3xl font-bold text-indigo-700 mb-10 text-center">
        Frequently Asked Questions
      </h2>

      <div className="space-y-5">
        {faqs.map((item, index) => {
          const isOpen = openIndex === index;

          return (
            <div
              key={index}
              className="border border-gray-200 rounded-xl p-5 cursor-pointer shadow-sm hover:shadow-md transition"
              onClick={() => setOpenIndex(isOpen ? null : index)}
            >
              {/* Question Row */}
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900">
                  {item.question}
                </h3>

                <motion.div
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="w-5 h-5 text-gray-700" />
                </motion.div>
              </div>

              {/* Animated Answer */}
              <AnimatePresence>
                {isOpen && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.35, ease: "easeInOut" }}
                    className="mt-3 text-gray-600 leading-relaxed"
                  >
                    {item.answer}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
