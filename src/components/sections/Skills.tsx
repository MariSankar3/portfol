"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  SiReact, SiNextdotjs, SiTypescript, SiNodedotjs,
  SiPostgresql, SiMongodb, SiTailwindcss, SiDocker,
  SiGit, SiPython, SiGraphql, SiRedis,
} from "react-icons/si";

const skills = [
  { name: "React", icon: SiReact, level: 95, color: "#61DAFB" },
  { name: "Next.js", icon: SiNextdotjs, level: 90, color: "#EDEDED" },
  { name: "TypeScript", icon: SiTypescript, level: 88, color: "#3178C6" },
  { name: "Node.js", icon: SiNodedotjs, level: 85, color: "#68A063" },
  { name: "PostgreSQL", icon: SiPostgresql, level: 80, color: "#336791" },
  { name: "MongoDB", icon: SiMongodb, level: 78, color: "#47A248" },
  { name: "Tailwind CSS", icon: SiTailwindcss, level: 93, color: "#06B6D4" },
  { name: "Docker", icon: SiDocker, level: 72, color: "#2496ED" },
  { name: "Git", icon: SiGit, level: 90, color: "#F05032" },
  { name: "Python", icon: SiPython, level: 75, color: "#3776AB" },
  { name: "GraphQL", icon: SiGraphql, level: 70, color: "#E10098" },
  { name: "Redis", icon: SiRedis, level: 68, color: "#DC382D" },
];

function SkillCard({ skill, index, inView }: {
  skill: typeof skills[0];
  index: number;
  inView: boolean;
}) {
  const Icon = skill.icon;
  const circumference = 2 * Math.PI * 28; // r=28
  const offset = circumference - (skill.level / 100) * circumference;

  return (
    <motion.div
      className="glass rounded-xl p-5 group relative overflow-hidden cursor-default"
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.06, duration: 0.5 }}
      whileHover={{ scale: 1.04, y: -4 }}
    >
      {/* Glow ring on hover */}
      <div
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          boxShadow: `inset 0 0 0 1px rgba(200,155,60,0.5), 0 0 30px rgba(200,155,60,0.15)`,
        }}
      />

      <div className="flex items-center gap-4">
        {/* Circular progress */}
        <div className="relative shrink-0 w-[68px] h-[68px]">
          <svg width="68" height="68" className="rotate-[-90deg]">
            {/* Track */}
            <circle
              cx="34" cy="34" r="28"
              fill="none"
              stroke="rgba(255,255,255,0.06)"
              strokeWidth="4"
            />
            {/* Progress */}
            <motion.circle
              cx="34" cy="34" r="28"
              fill="none"
              stroke="#C89B3C"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={circumference}
              animate={inView ? { strokeDashoffset: offset } : {}}
              transition={{ delay: index * 0.06 + 0.3, duration: 1.2, ease: "easeOut" }}
            />
          </svg>
          {/* Icon in center */}
          <div className="absolute inset-0 flex items-center justify-center">
            <Icon
              size={22}
              style={{ color: skill.color }}
              className="group-hover:scale-110 transition-transform duration-300"
            />
          </div>
        </div>

        {/* Name & percentage */}
        <div className="flex-1 min-w-0">
          <p className="text-[#EDEDED] font-medium text-sm mb-1 truncate">{skill.name}</p>
          <div className="flex items-center gap-2">
            <div className="flex-1 h-1.5 rounded-full bg-white/5 overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ background: "linear-gradient(90deg, #A97142, #C89B3C)" }}
                initial={{ width: 0 }}
                animate={inView ? { width: `${skill.level}%` } : {}}
                transition={{ delay: index * 0.06 + 0.4, duration: 1, ease: "easeOut" }}
              />
            </div>
            <span className="text-xs text-[#C89B3C] font-semibold shrink-0">
              {skill.level}%
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative py-28 px-6 overflow-hidden"
      style={{ background: "#111111" }}
    >
      {/* Grid bg */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(200,155,60,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(200,155,60,0.5) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            className="flex items-center justify-center gap-3 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
          >
            <span className="h-px w-8 bg-[#C89B3C]" />
            <span className="text-xs tracking-[0.25em] text-[#C89B3C] uppercase">
              My Toolkit
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
            <span className="text-[#EDEDED]">Technologies &amp; </span>
            <span className="gradient-text">Skills</span>
          </motion.h2>
        </div>

        {/* Skills grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {skills.map((skill, i) => (
            <SkillCard key={skill.name} skill={skill} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}
