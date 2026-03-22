"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import Image from "next/image";
import { ExternalLink, Github } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "Aura E-Commerce",
    description: "A premium headless e-commerce platform built with Next.js, Shopify Storefront API, and Framer Motion. Features a custom cart, real-time inventory, and cinematic product reveals.",
    image: "/project1.jpg", // placeholder
    tags: ["Next.js", "Shopify", "Tailwind", "Framer Motion"],
    demoUrl: "#",
    githubUrl: "#",
  },
  {
    id: 2,
    title: "Nexus Dashboard",
    description: "Enterprise analytics dashboard with real-time data visualization. Implemented complex charting with Recharts, drag-and-drop widgets, and dark mode theming.",
    image: "/project2.jpg",
    tags: ["React", "TypeScript", "Recharts", "Zustand"],
    demoUrl: "#",
    githubUrl: "#",
  },
  {
    id: 3,
    title: "Lumina AI SaaS",
    description: "An AI-powered content generation tool integrating OpenAI's GPT-4. Features a rich text editor, subscription management with Stripe, and user authentication with NextAuth.",
    image: "/project3.jpg",
    tags: ["Next.js", "OpenAI", "Stripe", "Prisma"],
    demoUrl: "#",
    githubUrl: "#",
  },
  {
    id: 4,
    title: "Echo Social",
    description: "Mobile-first social networking app focusing on audio interactions. Built with React Native and Node.js microservices handling real-time WebRTC audio streaming.",
    image: "/project4.jpg",
    tags: ["React Native", "Node.js", "WebRTC", "Socket.io"],
    demoUrl: "#",
    githubUrl: "#",
  },
];

function DefaultImagePlaceholder({ title }: { title: string }) {
  return (
    <div className="absolute inset-0 bg-gradient-to-br from-[#111111] to-[#0B0B0B] flex items-center justify-center p-8 text-center border border-[#C89B3C]/10">
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#C89B3C] via-transparent to-transparent" />
      <span className="text-xl font-bold text-[#EDEDED]/40 tracking-widest uppercase relative z-10" style={{ fontFamily: "var(--font-playfair)" }}>
        {title}<br/>Screenshot
      </span>
    </div>
  );
}

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  
  // 3D Tilt effect
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Max rotation is 10 degrees
    const rotateXValue = ((y - centerY) / centerY) * -10;
    const rotateYValue = ((x - centerX) / centerX) * 10;
    
    setRotateX(rotateXValue);
    setRotateY(rotateYValue);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setHovered(false);
  };

  return (
    <motion.div
      ref={cardRef}
      className="shrink-0 w-[85vw] md:w-[600px] h-[480px] md:h-[600px] relative group [perspective:1000px] cursor-none"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      data-cursor-hover="true"
    >
      <motion.div
        className="w-full h-full glass rounded-3xl overflow-hidden relative border border-[#C89B3C]/10"
        animate={{
          rotateX,
          rotateY,
          scale: hovered ? 1.02 : 1,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Animated border glow */}
        <div 
          className="absolute inset-0 z-20 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-500"
          style={{
            boxShadow: 'inset 0 0 0 1px rgba(200,155,60,0.4), inset 0 0 20px rgba(200,155,60,0.1)'
          }}
        />

        {/* Image / Placeholder Container */}
        <div 
          className="h-[50%] md:h-[60%] w-full relative overflow-hidden bg-[#0a0a0a]"
          style={{ transform: "translateZ(40px)" }}
        >
          {/* We'll use a placeholder instead of Image to prevent 404s since we don't have the images */}
          <DefaultImagePlaceholder title={project.title} />
          
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B] via-transparent to-transparent z-10" />
        </div>

        {/* Content Container */}
        <div 
          className="p-6 md:p-8 flex flex-col justify-between h-[50%] md:h-[40%] bg-[#0B0B0B]/80 backdrop-blur-xl"
          style={{ transform: "translateZ(60px)" }}
        >
          <div>
            <h3 className="text-2xl md:text-3xl font-bold text-[#EDEDED] mb-3 transition-colors group-hover:text-[#C89B3C]">
              {project.title}
            </h3>
            <p className="text-sm md:text-base text-[#A0A0A0] line-clamp-2 leading-relaxed">
              {project.description}
            </p>
          </div>

          <div className="flex items-end justify-between mt-auto">
            {/* Tags */}
            <div className="flex flex-wrap gap-2 gap-y-2 max-w-[70%]">
              {project.tags.map((tag) => (
                <span 
                  key={tag} 
                  className="px-3 py-1 text-xs font-medium rounded-full bg-white/5 text-[#EDEDED] border border-white/10"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Links */}
            <div className="flex gap-3 shrink-0">
              <a 
                href={project.githubUrl}
                className="w-10 h-10 rounded-full flex items-center justify-center bg-white/5 hover:bg-[#C89B3C] hover:text-black transition-colors"
                aria-label="GitHub"
              >
                <Github size={18} />
              </a>
              <a 
                href={project.demoUrl}
                className="w-10 h-10 rounded-full flex items-center justify-center bg-white/5 hover:bg-[#C89B3C] hover:text-black transition-colors"
                aria-label="Live Demo"
              >
                <ExternalLink size={18} />
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const x = useTransform(scrollYProgress, [0.2, 0.8], ["10%", "-40%"]);

  return (
    <section 
      id="projects" 
      ref={sectionRef} 
      className="relative min-h-[150vh] bg-[#0B0B0B] py-32"
    >
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        
        {/* Header */}
        <div className="max-w-7xl mx-auto px-6 w-full mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <motion.div 
              className="flex items-center gap-3 mb-4"
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
            >
              <span className="h-px w-8 bg-[#C89B3C]" />
              <span className="text-xs tracking-[0.25em] text-[#C89B3C] uppercase">
                Selected Works
              </span>
            </motion.div>
            <motion.h2 
              className="text-4xl md:text-6xl font-bold leading-tight"
              style={{ fontFamily: "var(--font-playfair)" }}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 }}
            >
              <span className="text-[#EDEDED]">Featured{" "}</span>
              <span className="gradient-text glow-gold-text">Projects</span>
            </motion.h2>
          </div>
          
          <motion.p 
            className="text-[#A0A0A0] max-w-sm text-sm leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
          >
            A curated selection of my recent work. Exploring new technologies and pushing boundaries in web development.
          </motion.p>
        </div>

        {/* Horizontal Scroll Track */}
        <div className="w-full relative">
          <motion.div 
            ref={scrollContainerRef}
            className="flex gap-8 px-6 md:px-[10vw]"
            style={{ x }}
          >
            {projects.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
            
            {/* View More Card */}
            <div className="shrink-0 w-[300px] h-[480px] md:h-[600px] flex items-center justify-center relative group cursor-none" data-cursor-hover="true">
              <div className="w-40 h-40 rounded-full border border-[#C89B3C]/20 flex items-center justify-center group-hover:bg-[#C89B3C]/5 group-hover:border-[#C89B3C] transition-all duration-500">
                <span className="text-sm tracking-widest text-[#C89B3C] uppercase font-medium">View All</span>
              </div>
            </div>
          </motion.div>
        </div>
        
      </div>
    </section>
  );
}
