"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 2400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100000] flex items-center justify-center"
          style={{ background: "#0B0B0B" }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          {/* Outer ring */}
          <motion.div
            className="absolute rounded-full border border-yellow-600/20"
            style={{ width: 160, height: 160 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 3, ease: "linear", repeat: Infinity }}
          />
          {/* Inner spinning ring */}
          <motion.div
            className="absolute rounded-full"
            style={{
              width: 120,
              height: 120,
              border: "1px solid transparent",
              borderTopColor: "#C89B3C",
              borderRightColor: "rgba(200,155,60,0.3)",
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 1.5, ease: "linear", repeat: Infinity }}
          />
          {/* Logo text */}
          <motion.div
            className="flex flex-col items-center gap-1"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <span
              className="text-3xl font-bold tracking-widest gradient-text"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              AM
            </span>
            <motion.div
              className="h-px w-12 bg-gradient-to-r from-transparent via-[#C89B3C] to-transparent"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            />
            <motion.p
              className="text-xs tracking-[0.3em] text-[#C89B3C]/60 uppercase mt-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
            >
              Portfolio
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
