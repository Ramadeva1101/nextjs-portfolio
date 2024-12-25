"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Briefcase, GraduationCap } from "lucide-react";

const workExperiences = [
  {
    company: "PT HOOKI GLOBAL KREASI",
    position: "Website and Application Testing",
    date: "Feb 2024",
    description: "Conducted comprehensive testing of websites and applications to ensure functionality and user experience.",
    tasks: [
      "Testing web applications",
      "QA processes",
      "Bug reporting",
      "Performance testing"
    ]
  },
  {
    company: "PT BAMBOO MEDIA CIPTA PERSADA",
    position: "Management Data Application",
    date: "September 2024",
    description: "Developed and maintained data management applications for efficient business operations.",
    tasks: [
      "Laravel development",
      "Database management",
      "React.js frontend",
      "API integration"
    ]
  }
];

const educationHistory = [
  {
    year: "2021 - Present",
    school: "SMK Negeri 1 Denpasar",
    program: "Software Engineering",
    achievements: [
      "Mastered HTML, CSS, and JavaScript fundamentals",
      "Built responsive web applications using React.js",
      "Developed backend systems with Laravel",
      "Learned database management with MySQL",
      "Created RESTful APIs and handled integrations",
      "Practiced version control using Git",
      "Studied UI/UX design principles"
    ]
  }
];

export default function Experience() {
  return (
    <div className="min-h-screen pt-16 pb-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h1
          className="text-4xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          My Journey
        </motion.h1>

        {/* Education Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-12"
        >
          <div className="flex items-center mb-6">
            <GraduationCap className="w-6 h-6 mr-2 text-primary" />
            <h2 className="text-2xl font-semibold">Education</h2>
          </div>
          <div className="space-y-6">
            {educationHistory.map((edu, index) => (
              <motion.div
                key={edu.year}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2 }}
              >
                <Card className="p-6 backdrop-blur-sm bg-white/5">
                  <div className="space-y-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-semibold">{edu.school}</h3>
                        <p className="text-primary">{edu.program}</p>
                      </div>
                      <span className="text-sm text-muted-foreground">{edu.year}</span>
                    </div>
                    <ul className="grid grid-cols-1 gap-2">
                      {edu.achievements.map((achievement) => (
                        <li key={achievement} className="text-sm text-muted-foreground">
                          • {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Work Experience Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center mb-6">
            <Briefcase className="w-6 h-6 mr-2 text-primary" />
            <h2 className="text-2xl font-semibold">Work Experience</h2>
          </div>
          <div className="space-y-6">
            {workExperiences.map((exp, index) => (
              <motion.div
                key={exp.company}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2 }}
              >
                <Card className="p-6 backdrop-blur-sm bg-white/5">
                  <div className="flex items-start gap-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-2">{exp.position}</h3>
                      <p className="text-primary mb-2">{exp.company}</p>
                      <p className="text-sm text-muted-foreground mb-4">{exp.date}</p>
                      <p className="text-muted-foreground mb-4">{exp.description}</p>
                      <ul className="grid grid-cols-2 gap-2">
                        {exp.tasks.map((task) => (
                          <li key={task} className="text-sm text-muted-foreground">
                            • {task}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}