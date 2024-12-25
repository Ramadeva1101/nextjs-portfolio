"use client";

import { motion } from "framer-motion";

export default function About() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-6xl mx-auto px-6 relative z-10 pt-24"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Text Content - Left Side */}
        <div className="space-y-6">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500"
          >
            About Me
          </motion.h1>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-4 text-gray-300/80"
          >
            <p className="text-base">
              I am a student at SMK Negeri 1 Denpasar, majoring in Software Engineering. I am passionate about creating innovative digital solutions.
            </p>
            <p className="text-base">
              I specialize in web development using modern frameworks and technologies such as Laravel, React, Next.js, and more. I enjoy building responsive and user-friendly applications.
            </p>
            <p className="text-base">
              If you&apos;re interested in collaborating or need a website built, feel free to get in touch with me. I&apos;m always excited to work on new projects and challenges.
            </p>
          </motion.div>
        </div>

        {/* Image - Right Side */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex justify-end items-center"
        >
          <img 
            src="https://images.unsplash.com/photo-1537432376769-00f5c2f4c8d2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
            alt="Workspace" 
            className="rounded-2xl w-full max-w-md object-cover opacity-90"
          />
        </motion.div>
      </div>
    </motion.div>
  );
}