"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Send, Github, Linkedin, Twitter } from "lucide-react";

export default function Contact() {
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setFormState({ name: "", email: "", message: "" });
      alert("Message sent successfully!");
    }, 1500);
  };

  return (
    <section 
      id="contact" 
      className="relative py-32 px-6 overflow-hidden"
      style={{ background: "#0B0B0B" }}
    >
      {/* Background Glow */}
      <div 
        className="absolute bottom-0 right-0 w-[500px] h-[500px] blur-[150px] pointer-events-none opacity-20"
        style={{ background: "radial-gradient(circle, #C89B3C 0%, transparent 70%)" }}
      />
      
      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div 
            className="flex items-center justify-center gap-3 mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="h-px w-8 bg-[#C89B3C]" />
            <span className="text-xs tracking-[0.25em] text-[#C89B3C] uppercase">
              Get In Touch
            </span>
            <span className="h-px w-8 bg-[#C89B3C]" />
          </motion.div>
          <motion.h2 
            className="text-4xl md:text-5xl font-bold"
            style={{ fontFamily: "var(--font-playfair)" }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <span className="text-[#EDEDED]">Let&apos;s work{" "}</span>
            <span className="gradient-text glow-gold-text">together</span>
          </motion.h2>
        </div>

        <div className="grid lg:grid-cols-5 gap-12 lg:gap-20">
          
          {/* Contact Info */}
          <motion.div 
            className="lg:col-span-2 flex flex-col gap-10"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div>
              <p className="text-[#A0A0A0] leading-relaxed mb-8">
                I&apos;m currently looking for new opportunities. Whether you have a question or just want to say hi, I&apos;ll try my best to get back to you!
              </p>
              
              <div className="flex flex-col gap-6">
                <div className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-full glass flex items-center justify-center text-[#C89B3C] group-hover:bg-[#C89B3C] group-hover:text-[#0B0B0B] transition-colors duration-300">
                    <Mail size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-[#A0A0A0] mb-1">Email</p>
                    <a href="mailto:hello@example.com" className="text-[#EDEDED] hover:text-[#C89B3C] transition-colors">hello@example.com</a>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-full glass flex items-center justify-center text-[#C89B3C] group-hover:bg-[#C89B3C] group-hover:text-[#0B0B0B] transition-colors duration-300">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-[#A0A0A0] mb-1">Location</p>
                    <p className="text-[#EDEDED]">San Francisco, CA</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Socials */}
            <div>
              <p className="text-sm text-[#A0A0A0] mb-4 uppercase tracking-widest font-semibold">Connect</p>
              <div className="flex gap-4">
                {[
                  { icon: Github, href: "#" },
                  { icon: Linkedin, href: "#" },
                  { icon: Twitter, href: "#" },
                ].map((social, i) => (
                  <a 
                    key={i}
                    href={social.href}
                    className="w-10 h-10 rounded-full border border-[#C89B3C]/20 flex items-center justify-center text-[#EDEDED] hover:text-black hover:bg-[#C89B3C] hover:border-[#C89B3C] transition-all duration-300 hover:-translate-y-1"
                  >
                    <social.icon size={18} />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div 
            className="lg:col-span-3 glass rounded-3xl p-8 md:p-10"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="floating-label-group">
                  <input 
                    type="text" 
                    id="name"
                    placeholder=" "
                    required
                    value={formState.name}
                    onChange={e => setFormState(s => ({ ...s, name: e.target.value }))}
                  />
                  <label htmlFor="name">Your Name</label>
                </div>
                <div className="floating-label-group">
                  <input 
                    type="email" 
                    id="email"
                    placeholder=" "
                    required
                    value={formState.email}
                    onChange={e => setFormState(s => ({ ...s, email: e.target.value }))}
                  />
                  <label htmlFor="email">Email Address</label>
                </div>
              </div>
              
              <div className="floating-label-group">
                <textarea 
                  id="message"
                  placeholder=" "
                  required
                  rows={5}
                  value={formState.message}
                  onChange={e => setFormState(s => ({ ...s, message: e.target.value }))}
                  className="resize-none"
                />
                <label htmlFor="message">Your Message</label>
              </div>
              
              <button 
                type="submit"
                disabled={isSubmitting}
                className="mt-4 w-full py-4 rounded-xl flex items-center justify-center gap-2 font-semibold text-sm tracking-widest uppercase transition-all duration-300 relative overflow-hidden group disabled:opacity-70"
                style={{
                  background: "linear-gradient(135deg, #C89B3C, #A97142)",
                  color: "#0B0B0B",
                }}
              >
                <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12" />
                <span className="relative z-10 flex items-center gap-2">
                  {isSubmitting ? "Sending..." : "Send Message"}
                  {!isSubmitting && <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
                </span>
              </button>
            </form>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
