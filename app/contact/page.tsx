"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Instagram, Github, Mail, Send } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { toast } from "sonner";

export default function Contact() {
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    
    try {
      const response = await fetch('/api/send', {
        method: 'POST',
        body: JSON.stringify({
          name: formData.get('name'),
          email: formData.get('email'),
          message: formData.get('message'),
        }),
      });

      if (!response.ok) throw new Error();
      toast.success('Message sent successfully!');
      (e.target as HTMLFormElement).reset();
    } catch (error) {
      toast.error('Failed to send message');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen pt-16 pb-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h1
          className="text-4xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Get in Touch
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="p-6 backdrop-blur-sm bg-white/5">
              <h2 className="text-xl font-semibold mb-4">Connect With Me</h2>
              <div className="space-y-4">
                <Link 
                  href="https://instagram.com/rammdv_" 
                  target="_blank"
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-primary/10 transition-colors"
                >
                  <Instagram className="h-5 w-5 text-pink-500" />
                  <span>@rammdv_</span>
                </Link>
                <Link 
                  href="https://github.com/Ramadeva1101" 
                  target="_blank"
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-primary/10 transition-colors"
                >
                  <Github className="h-5 w-5 text-gray-400" />
                  <span>Ramadeva1101</span>
                </Link>
                <div className="flex items-center space-x-3 p-3">
                  <Mail className="h-5 w-5 text-blue-500" />
                  <span>ramadeva1101@gmail.com</span>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="p-6 backdrop-blur-sm bg-white/5">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Input
                    placeholder="Your Name"
                    name="name"
                    required
                    disabled={isLoading}
                  />
                </div>
                <div>
                  <Input
                    type="email"
                    placeholder="Your Email"
                    name="email"
                    required
                    disabled={isLoading}
                  />
                </div>
                <div>
                  <Textarea
                    placeholder="Your Message"
                    name="message"
                    required
                    className="min-h-[120px]"
                    disabled={isLoading}
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full"
                  disabled={isLoading}
                >
                  <Send className="mr-2 h-4 w-4" />
                  {isLoading ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}