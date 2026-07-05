'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

export function AnimatedSection({ children, delay = 0, className = "" }: { children: ReactNode, delay?: number, className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay, type: "spring", bounce: 0.3 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function AnimatedCard({ children, delay = 0, className = "" }: { children: ReactNode, delay?: number, className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ y: -8, scale: 1.03, boxShadow: "0 20px 40px -15px rgba(143, 58, 29, 0.2)" }}
      transition={{ duration: 0.5, delay, type: "spring", stiffness: 200, damping: 20 }}
      className={`relative group ${className}`}
    >
      {/* Subtle glow effect behind the card */}
      <div className="absolute -inset-0.5 bg-gradient-to-br from-shakti-rust/20 to-shakti-sarson/20 rounded-[2rem] blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
      <div className="relative h-full w-full bg-white rounded-[2rem]">
        {children}
      </div>
    </motion.div>
  );
}
