"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

const experiences = [
  {
    id: 1,
    role: "Senior Full Stack Engineer",
    company: "TechNova Inc.",
    period: "2023 - Present",
    description: "Leading the frontend architecture for an enterprise SaaS platform serving 50k+ users. Migrated legacy React app to Next.js 14 App Router, improving performance scores by 40%.",
    tech: ["Next.js", "TypeScript", "Tailwind HTML", "GraphQL", "Prisma"],
  },
  {
    id: 2,
    role: "Frontend Developer",
    company: "Creative Digital Agency",
    period: "2021 - 2023",
    description: "Developed award-winning marketing websites and e-commerce platforms for high-profile clients. Spearheaded the adoption of Framer Motion and modern Tailwind practices.",
    tech: ["React", "Gatsby", "Shopify", "Framer Motion", "GSAP"],
  },
  {
    id: 3,
    role: "Web Developer",
    company: "Startup Hub",
    period: "2019 - 2021",
    description: "Built and maintained multiple internal tools and customer-facing dashboards. Collaborated closely with designers to implement pixel-perfect UIs.",
    tech: ["JavaScript", "React", "Node.js", "Express", "MongoDB"],
  },
];

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section 
      id="experience" 
      ref={sectionRef} 
      className="relative py-32 px-6 overflow-hidden"
      style={{ background: "#111111" }}
    >
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-24">
          <motion.div 
            className="flex items-center justify-center gap-3 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
          >
            <span className="h-px w-8 bg-[#C89B3C]" />
            <span className="text-xs tracking-[0.25em] text-[#C89B3C] uppercase">
              Career Path
            </span>
            <span className="h-px w-8 bg-[#C89B3C]" />
          </motion.div>
          <motion.h2 
            className="text-4xl md:text-5xl font-bold"
            style={{ fontFamily: "var(--font-playfair)" }}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
          >
            <span className="text-[#EDEDED]">Professional{" "}</span>
            <span className="gradient-text">Experience</span>
          </motion.h2>
        </div>

        {/* Timeline Container */}
        <div ref={containerRef} className="relative">
          
          {/* Central Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-white/5 -translate-x-1/2 rounded-full overflow-hidden">
            <motion.div 
              className="absolute top-0 w-full bg-gradient-to-b from-[#C89B3C] via-[#E8B84B] to-transparent origin-top"
              style={{ bottom: "0%", scaleY }}
            />
          </div>

          {/* Experience Items */}
          <div className="flex flex-col gap-16 md:gap-24 relative z-10">
            {experiences.map((exp, index) => {
              const isEven = index % 2 === 0;
              
              return (
                <div 
                  key={exp.id}
                  className={`flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-0 ${
                    isEven ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-8 h-8 flex items-center justify-center mt-2 md:mt-0">
                    <motion.div 
                      className="w-3 h-3 rounded-full bg-[#0B0B0B] border-2 border-[#C89B3C] shadow-[0_0_15px_rgba(200,155,60,0.5)]"
                      initial={{ scale: 0, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    />
                    <div className="absolute inset-0 rounded-full animate-ping border border-[#C89B3C]/40" />
                  </div>

                  {/* Content Card */}
                  <div className={`w-full md:w-1/2 ${isEven ? "md:pr-16 pl-12 md:pl-0" : "md:pl-16 pl-12 md:pl-12"}`}>
                    <motion.div 
                      className="glass rounded-2xl p-8 hover:border-[#C89B3C]/30 transition-colors duration-300"
                      initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                      whileHover={{ y: -5 }}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                        <h3 className="text-2xl font-bold text-[#EDEDED]">{exp.role}</h3>
                        <span className="px-3 py-1 text-xs font-semibold tracking-wider text-[#C89B3C] bg-[#C89B3C]/10 rounded-full whitespace-nowrap w-fit">
                          {exp.period}
                        </span>
                      </div>
                      
                      <h4 className="text-lg text-[#EDEDED]/80 font-medium mb-4 flex items-center gap-2">
                        {exp.company}
                      </h4>
                      
                      <p className="text-[#A0A0A0] leading-relaxed mb-6 text-sm md:text-base">
                        {exp.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-2">
                        {exp.tech.map(tech => (
                          <span key={tech} className="text-xs text-[#A0A0A0] opacity-80">
                            {tech} {tech !== exp.tech[exp.tech.length-1] && "•"}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  </div>
                  
                  {/* Empty half for layout */}
                  <div className="hidden md:block w-1/2" />
                </div>
              );
            })}
          </div>
          
        </div>
      </div>
    </section>
  );
}
