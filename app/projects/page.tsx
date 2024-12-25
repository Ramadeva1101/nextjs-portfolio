"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink } from "lucide-react";

const projects = [
  {
    title: "Data Management Application",
    company: "PT HOOKI GLOBAL KREASI",
    date: "Feb 2024",
    description: "Application for managing data in the school",
    tasks: [
      "Laravel development",
      "Database management",
      "API integration"
    ],
    image: "/image/poto1.png"
  },
  {
    title: "Clinical practice system",
    company: "PT BAMBOO MEDIA CIPTA PERSADA",
    date: "September 2024",
    description: "Application for managing data in the Clinic",
    tasks: [
      "Laravel development",
      "Filament development",
      "Database management",
      "Responsive design"
    ],
    image: "/image/poto2.png"
  },
  {
    title: "Personal Website",
    company: "Personal Project",
    date: "January 2024",
    description: "Personal website for displaying my Portfolio",
    tasks: [
      "Next.js development",
      "Responsive design",
      "Tailwind CSS",
      "Grid"
    ],
    image: "/image/poto3.png",
    link: "https://rammdev.vercel.app/"
  }
];

export default function Projects() {
  return (
    <div className="min-h-screen pt-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h1
          className="text-4xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          My Projects
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="overflow-hidden backdrop-blur-sm bg-white/5 relative">
                <div className="relative h-48 w-full">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-semibold">{project.title}</h3>
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-full hover:bg-white/10 transition-colors group"
                      >
                        <ExternalLink 
                          size={18} 
                          className="text-primary/70 group-hover:text-primary group-hover:scale-110 transition-all duration-300" 
                        />
                      </a>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">{project.company}</p>
                  <p className="text-sm text-muted-foreground mb-4">{project.date}</p>
                  <p className="text-sm text-muted-foreground mb-4">{project.description}</p>
                  <div className="space-y-2">
                    {project.tasks.map((task, taskIndex) => (
                      <div key={taskIndex} className="flex items-center">
                        <span className="w-2 h-2 bg-primary rounded-full mr-2" />
                        <span className="text-sm text-muted-foreground">{task}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}