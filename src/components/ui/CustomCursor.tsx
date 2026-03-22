"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);
  const rafRef = useRef<number | null>(null);
  const targetRef = useRef({ x: -100, y: -100 });
  const currentRef = useRef({ x: -100, y: -100 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      targetRef.current = { x: e.clientX, y: e.clientY };
      if (!visible) setVisible(true);
    };

    const animate = () => {
      const dx = targetRef.current.x - currentRef.current.x;
      const dy = targetRef.current.y - currentRef.current.y;
      currentRef.current.x += dx * 0.12;
      currentRef.current.y += dy * 0.12;
      setPos({ x: currentRef.current.x, y: currentRef.current.y });
      rafRef.current = requestAnimationFrame(animate);
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.getAttribute("data-cursor-hover") === "true"
      ) {
        setHovered(true);
      } else {
        setHovered(false);
      }
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <>
      {/* Dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[99999] rounded-full"
        style={{
          width: hovered ? 40 : 10,
          height: hovered ? 40 : 10,
          background: hovered
            ? "rgba(200,155,60,0.2)"
            : "#C89B3C",
          border: hovered ? "1px solid #C89B3C" : "none",
          boxShadow: hovered
            ? "0 0 20px rgba(200,155,60,0.4)"
            : "0 0 8px rgba(200,155,60,0.6)",
          translateX: pos.x - (hovered ? 20 : 5),
          translateY: pos.y - (hovered ? 20 : 5),
          transition: "width 0.2s, height 0.2s, background 0.2s, border 0.2s",
        }}
      />
      {/* Glow */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[99998] rounded-full blur-xl"
        style={{
          width: 80,
          height: 80,
          background: "rgba(200,155,60,0.08)",
          translateX: pos.x - 40,
          translateY: pos.y - 40,
        }}
      />
    </>
  );
}
