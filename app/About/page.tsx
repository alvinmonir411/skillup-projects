"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="w-full bg-white pt-24 pb-32">
      {/* HERO */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-3xl mx-auto px-6"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
          About Us
        </h1>
        <p className="text-gray-600 text-lg md:text-xl mt-4">
          Built for dreamers. Powered by teachers. Designed for world-class
          learning.
        </p>
      </motion.div>

      {/* WHO WE ARE */}
      <div className="max-w-6xl mx-auto mt-20 px-6 grid grid-cols-1 md:grid-cols-2 gap-14 items-center">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Who We Are</h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            We’re a forward-thinking learning platform rooted in tradition —
            because some classics never go out of style. Our mission? Simple.
            Connect passionate mentors with ambitious learners, and build a
            space where knowledge flows like fresh air.
            <br />
            <br />
            We're here for the ones who want to grow, create, achieve, and
            rewrite their story with skill and confidence.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Image
            src="/team.jpg"
            width={550}
            height={350}
            alt="team"
            className="rounded-2xl shadow-xl"
          />
        </motion.div>
      </div>

      {/* OUR VALUES */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto mt-28 px-6"
      >
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-10">
          Our Core Values
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            {
              title: "Innovation Meets Tradition",
              desc: "We push boundaries with modern tools but never forget the roots that shaped learning.",
            },
            {
              title: "People First",
              desc: "Every decision starts with empathy. Every feature is built for humans, not numbers.",
            },
            {
              title: "Growth is the Goal",
              desc: "Whether you're teaching or learning, we exist to amplify your journey.",
            },
          ].map((val, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-gray-50 p-8 rounded-2xl shadow-sm hover:shadow-md transition-all"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {val.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">{val.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* OUR STORY */}
      <div className="max-w-6xl mx-auto mt-28 px-6 grid grid-cols-1 md:grid-cols-2 gap-14 items-center">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Image
            src="/story.jpg"
            width={550}
            height={350}
            alt="story"
            className="rounded-2xl shadow-xl"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Story</h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            We started with a simple idea:
            <span className="font-semibold text-gray-900">
              “Learning shouldn’t be complicated.”
            </span>
            <br />
            <br />
            From there, the vision grew — a platform where teachers earn with
            dignity, and learners grow with clarity. A place where you don’t
            just “finish a course”… You evolve. You level up. You transform.
          </p>
        </motion.div>
      </div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="mt-32 text-center"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
          Join the Movement
        </h2>
        <p className="text-gray-600 mt-3 mb-8 text-lg max-w-xl mx-auto">
          Learning isn’t just a task — it’s a legacy. Step in, grow deep, and
          make your mark.
        </p>
        <a
          href="/signup"
          className="px-7 py-3 bg-gray-900 text-white rounded-xl hover:bg-gray-700 transition-all"
        >
          Get Started
        </a>
      </motion.div>
    </div>
  );
}
