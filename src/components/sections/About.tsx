"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";

// ── Animated Counter ──────────────────────────────────────
function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 2000;
    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * value));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, value]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

const stats = [
  { label: "Projects Shipped", value: 28, suffix: "+" },
  { label: "Technologies", value: 20, suffix: "+" },
  { label: "Years Experience", value: 5, suffix: "y" },
  { label: "Happy Clients", value: 15, suffix: "+" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" },
  }),
};

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-28 px-6 overflow-hidden"
      style={{ background: "#0B0B0B" }}
    >
      {/* Background glow */}
      <div
        className="absolute top-0 left-0 w-[600px] h-[600px] blur-[180px] pointer-events-none opacity-20"
        style={{ background: "radial-gradient(circle, #C89B3C 0%, transparent 70%)" }}
      />

      <div className="max-w-6xl mx-auto">
        {/* Section label */}
        <motion.div
          className="flex items-center gap-3 mb-4"
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <span className="h-px w-8 bg-[#C89B3C]" />
          <span className="text-xs tracking-[0.25em] text-[#C89B3C] uppercase">About Me</span>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-14 items-center">
          {/* Text card */}
          <motion.div
            className="glass rounded-2xl p-8 md:p-10"
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <h2
              className="text-4xl md:text-5xl font-bold mb-6 leading-tight"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              <span className="text-[#EDEDED]">Crafting the{" "}</span>
              <span className="gradient-text">Future</span>
              <br />
              <span className="text-[#EDEDED]">One Line at a Time</span>
            </h2>

            <p className="text-[#A0A0A0] leading-relaxed mb-4">
              I&apos;m a{" "}
              <span className="text-[#C89B3C] font-semibold">Full Stack Developer</span>{" "}
              with a passion for building{" "}
              <span className="text-[#C89B3C] font-semibold">beautiful, performant</span>{" "}
              web applications that users love.
            </p>
            <p className="text-[#A0A0A0] leading-relaxed mb-4">
              Specializing in{" "}
              <span className="text-[#C89B3C] font-semibold">React & Next.js</span> on
              the frontend and{" "}
              <span className="text-[#C89B3C] font-semibold">Node.js & PostgreSQL</span>{" "}
              on the backend, I turn complex problems into{" "}
              <span className="text-[#EDEDED]">elegant solutions</span>.
            </p>
            <p className="text-[#A0A0A0] leading-relaxed">
              When I&apos;m not coding, you&apos;ll find me exploring{" "}
              <span className="text-[#C89B3C] font-semibold">design systems</span>,
              contributing to{" "}
              <span className="text-[#C89B3C] font-semibold">open source</span>, or
              sipping coffee while reading about the latest{" "}
              <span className="text-[#EDEDED]">tech trends</span>.
            </p>
          </motion.div>

          {/* Stats grid */}
          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                className="glass rounded-xl p-6 group hover:border-[#C89B3C]/40 transition-all duration-300"
                custom={i}
                variants={fadeUp}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                whileHover={{ scale: 1.03 }}
              >
                <div
                  className="text-4xl font-bold gradient-text mb-2 glow-gold-text"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  <Counter value={stat.value} suffix={stat.suffix} />
                </div>
                <p className="text-xs text-[#A0A0A0] tracking-wide uppercase">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
