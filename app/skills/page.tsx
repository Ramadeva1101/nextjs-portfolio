"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { 
  SiLaravel, 
  SiMysql, 
  SiReact, 
  SiNextdotjs, 
  SiJavascript, 
  SiPhp 
} from "react-icons/si";

const skills = [
  { 
    name: "Laravel", 
    icon: SiLaravel, 
    color: "text-red-600",
    description: "Framework PHP untuk web development"
  },
  { 
    name: "MySQL", 
    icon: SiMysql, 
    color: "text-blue-600",
    description: "Database management system"
  },
  { 
    name: "React.js", 
    icon: SiReact, 
    color: "text-cyan-400",
    description: "Library JavaScript untuk UI"
  },
  { 
    name: "Next.js", 
    icon: SiNextdotjs, 
    color: "text-black dark:text-white",
    description: "Framework React untuk production"
  },
  { 
    name: "JavaScript", 
    icon: SiJavascript, 
    color: "text-yellow-400",
    description: "Bahasa pemrograman web"
  },
  { 
    name: "PHP", 
    icon: SiPhp, 
    color: "text-purple-600",
    description: "Bahasa pemrograman server-side"
  }
];

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: "easeOut"
    }
  })
};

const iconVariants = {
  hidden: { scale: 0 },
  visible: {
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 10
    }
  }
};

export default function Skills() {
  return (
    <div className="min-h-screen pt-16 pb-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h1
          className="text-4xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Skills & Expertise
        </motion.h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              custom={index}
              initial="hidden"
              animate="visible"
              variants={cardVariants}
              whileHover={{ scale: 1.05 }}
              className="relative"
            >
              <Card className="p-6 h-full flex flex-col items-center justify-center space-y-4 backdrop-blur-sm bg-white/50 dark:bg-gray-950/50">
                <motion.div
                  variants={iconVariants}
                  className={`text-5xl ${skill.color}`}
                >
                  <skill.icon />
                </motion.div>
                <h3 className="text-xl font-semibold text-center">{skill.name}</h3>
                <p className="text-sm text-muted-foreground text-center">
                  {skill.description}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}