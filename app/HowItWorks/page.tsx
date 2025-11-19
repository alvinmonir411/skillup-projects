"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function HowItWorksPage() {
  const steps = [
    {
      id: 1,
      title: "Create Your Account",
      desc: "Set up your profile in minutes. Tell us who you are, what you bring to the table, and where you're headed.",
      img: "/account.png",
    },
    {
      id: 2,
      title: "Browse Skills & Instructors",
      desc: "Explore thousands of curated skill categories. Find teachers who vibe with your learning style.",
      img: "/browse.png",
    },
    {
      id: 3,
      title: "Book Your Session",
      desc: "Schedule your lesson at your pace. No messy calls, no confusion — just a clean and seamless workflow.",
      img: "/book.png",
    },
    {
      id: 4,
      title: "Start Learning & Grow",
      desc: "Join your session, learn the craft, level up your skills, and push your goals forward.",
      img: "/learn.png",
    },
  ];

  return (
    <div className="w-full bg-white pt-24 pb-32">
      {/* HERO SECTION */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-3xl mx-auto px-6"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
          How It Works
        </h1>
        <p className="text-gray-600 mt-4 text-lg md:text-xl">
          Smooth onboarding. Stress-free learning. A platform built to empower
          learners and teachers alike.
        </p>
      </motion.div>

      {/* STEP SECTIONS */}
      <div className="max-w-6xl mx-auto mt-20 px-6 space-y-24">
        {steps.map((step, index) => (
          <motion.div
            key={step.id}
            initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className={`grid grid-cols-1 md:grid-cols-2 items-center gap-10 ${
              index % 2 !== 0 ? "md:flex-row-reverse" : ""
            }`}
          >
            {/* IMAGE */}
            <div className="w-full flex justify-center">
              <Image
                src={step.img}
                alt={step.title}
                width={520}
                height={350}
                className="rounded-2xl shadow-xl"
              />
            </div>

            {/* TEXT */}
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-4">
                {step.title}
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                {step.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* CTA SECTION */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mt-32 text-center"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
          Ready to Get Started?
        </h2>
        <p className="text-gray-600 mt-3 mb-8 text-lg">
          Your next skill is one click away. Let’s move.
        </p>
        <a
          href="/signup"
          className="px-7 py-3 bg-gray-900 text-white rounded-xl hover:bg-gray-700 transition-all"
        >
          Create an Account
        </a>
      </motion.div>
    </div>
  );
}
