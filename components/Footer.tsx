"use client";

import { motion } from "framer-motion";
import { Github, Mail, Instagram, Phone } from "lucide-react";
import Link from "next/link";

const socialLinks = [
  {
    icon: Github,
    href: "https://github.com/Ramadeva1101",
    label: "GitHub"
  },
  {
    icon: Instagram,
    href: "https://instagram.com/rammdv_",
    label: "Instagram"
  },
  {
    icon: Mail,
    href: "mailto:ramadeva1101@gmail.com",
    label: "Email"
  }
];

const contactInfo = [
  {
    icon: Phone,
    text: "+6282146281627"
  }
];

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black/50 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="md:col-span-1"
          >
            <h3 className="text-xl font-semibold mb-4">I Gede Ramadeva</h3>
            <p className="text-muted-foreground mb-4">
              a human being who loves to code and learn new things
            </p>
            <div className="space-y-2">
              {contactInfo.map((item, index) => (
                <div key={index} className="flex items-center gap-2 text-muted-foreground">
                  <item.icon className="w-4 h-4" />
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="md:col-span-1"
          >
            <h3 className="text-xl font-semibold mb-4">Connect</h3>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  className="text-muted-foreground hover:text-white transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <social.icon className="w-5 h-5" />
                </Link>
              ))}
            </div>
          </motion.div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-white/10 text-center text-muted-foreground">
          <p>© {new Date().getFullYear()} I Gede Ramadeva. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
