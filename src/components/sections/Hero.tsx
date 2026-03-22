"use client";

import { useRef, useEffect, useMemo } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { ArrowDown } from "lucide-react";

// ── Particle Field ────────────────────────────────────────
function ParticleField() {
  const particles = useMemo(
    () =>
      Array.from({ length: 60 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        opacity: Math.random() * 0.5 + 0.1,
        delay: Math.random() * 4,
        duration: Math.random() * 4 + 3,
      })),
    []
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-[#C89B3C]"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            opacity: p.opacity,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [p.opacity, p.opacity * 2, p.opacity],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

// ── Light Streaks ─────────────────────────────────────────
function LightStreaks() {
  const streaks = useMemo(
    () =>
      Array.from({ length: 6 }, (_, i) => ({
        id: i,
        x: 10 + i * 15,
        delay: i * 0.8,
        opacity: 0.04 + i * 0.01,
        width: 1 + Math.random(),
        height: 150 + Math.random() * 200,
        rotate: -35 + Math.random() * 15,
      })),
    []
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {streaks.map((s) => (
        <motion.div
          key={s.id}
          className="absolute bg-gradient-to-b from-transparent via-[#C89B3C] to-transparent"
          style={{
            left: `${s.x}%`,
            top: "10%",
            width: s.width,
            height: s.height,
            rotate: s.rotate,
            opacity: s.opacity,
          }}
          animate={{ opacity: [s.opacity, s.opacity * 3, s.opacity] }}
          transition={{
            duration: 4,
            delay: s.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

// ── Hero Section ──────────────────────────────────────────
export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const handleScroll = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={ref}
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: "#0B0B0B" }}
    >
      {/* Layer 1: Radial glow background */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ y: bgY }}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 60% 50%, rgba(200,155,60,0.12) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 40% 40% at 20% 20%, rgba(200,155,60,0.06) 0%, transparent 60%)",
          }}
        />
      </motion.div>

      {/* Layer 2: Particle field */}
      <ParticleField />

      {/* Layer 3: Light streaks */}
      <LightStreaks />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(200,155,60,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(200,155,60,0.5) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* Main content */}
      <motion.div
        className="relative z-10 max-w-7xl mx-auto px-6 w-full pt-20 flex flex-col lg:flex-row items-center justify-between gap-12"
        style={{ y: textY, opacity }}
      >
        {/* Text side */}
        <div className="flex-1 flex flex-col gap-6 text-center lg:text-left">
          {/* Badge */}
          <motion.div
            className="flex items-center justify-center lg:justify-start gap-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.6, duration: 0.6 }}
          >
            <span className="h-px w-8 bg-[#C89B3C]" />
            <span className="text-xs tracking-[0.25em] text-[#C89B3C] uppercase">
              Available for work
            </span>
            <span className="w-2 h-2 rounded-full bg-[#C89B3C] animate-pulse" />
          </motion.div>

          {/* Main heading */}
          <motion.h1
            className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight"
            style={{ fontFamily: "var(--font-playfair)" }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.8, duration: 0.8 }}
          >
            <span className="text-[#EDEDED]">Hi, I&apos;m{" "}</span>
            <span className="gradient-text glow-gold-text">
              Alex Morgan
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="text-lg md:text-xl text-[#A0A0A0] max-w-lg mx-auto lg:mx-0 leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3.0, duration: 0.7 }}
          >
            Full Stack Developer &bull; Problem Solver
            <br />
            <span className="text-[#EDEDED]/60 text-base">
              Crafting digital experiences that leave a mark.
            </span>
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3.2, duration: 0.7 }}
          >
            <button
              onClick={() => handleScroll("#projects")}
              className="px-8 py-3.5 font-semibold text-sm tracking-wider rounded-full relative overflow-hidden group"
              style={{
                background: "linear-gradient(135deg, #C89B3C, #A97142)",
                color: "#0B0B0B",
              }}
            >
              <span className="relative z-10">View Projects</span>
              <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 skew-x-12" />
            </button>
            <button
              onClick={() => handleScroll("#contact")}
              className="px-8 py-3.5 font-semibold text-sm tracking-wider rounded-full border border-[#C89B3C]/40 text-[#C89B3C] hover:border-[#C89B3C] hover:bg-[#C89B3C]/10 transition-all duration-300"
            >
              Contact Me
            </button>
          </motion.div>
        </div>

        {/* Portrait image side */}
        <motion.div
          className="flex-1 flex justify-center lg:justify-end items-end relative"
          style={{ y: imageY }}
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 2.9, duration: 1, ease: "easeOut" }}
        >
          {/* Glow behind portrait */}
          <div
            className="absolute bottom-0 w-[320px] h-[380px] blur-[80px] pointer-events-none"
            style={{ background: "rgba(200,155,60,0.15)" }}
          />
          {/* Portrait */}
          <div className="relative w-[280px] md:w-[340px] lg:w-[400px]">
            <Image
              src="/portrait.png"
              alt="Alex Morgan - Full Stack Developer"
              width={400}
              height={500}
              priority
              style={{ objectFit: "contain", filter: "drop-shadow(0 0 40px rgba(200,155,60,0.25))" }}
            />
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.button
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-[#C89B3C]/60 hover:text-[#C89B3C] transition-colors"
        onClick={() => handleScroll("#about")}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.5 }}
      >
        <span className="text-xs tracking-[0.2em] uppercase">Scroll</span>
        <ArrowDown size={16} className="animate-scroll-bounce" />
      </motion.button>
    </section>
  );
}
