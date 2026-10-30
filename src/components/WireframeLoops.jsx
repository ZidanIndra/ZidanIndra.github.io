import React from 'react';
import { motion } from 'framer-motion';

export default function WireframeLoops() {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
      {/* Organic radial ambient glow that naturally fades smoothly to 0% opacity */}
      <div
        className="absolute -inset-12 sm:-inset-16 md:-inset-24 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(229, 169, 59, 0.22) 0%, rgba(245, 158, 11, 0.10) 32%, rgba(99, 102, 241, 0.05) 52%, transparent 72%)',
          filter: 'blur(20px)',
        }}
      />

      {/* SVG Geometric wireframe loops */}
      <motion.svg
        animate={{ rotate: 360 }}
        transition={{ duration: 45, repeat: Infinity, ease: 'linear' }}
        className="w-[300px] h-[300px] md:w-[440px] md:h-[440px] opacity-75"
        viewBox="0 0 400 400"
        fill="none"
      >
        {/* Ring 1 - Outer Gold Ellipse */}
        <ellipse
          cx="200"
          cy="200"
          rx="185"
          ry="90"
          stroke="#e5a93b"
          strokeWidth="1.5"
          strokeDasharray="8 6"
          className="opacity-70"
        />

        {/* Ring 2 - Angled Ellipse */}
        <ellipse
          cx="200"
          cy="200"
          rx="175"
          ry="95"
          transform="rotate(60 200 200)"
          stroke="#fbbf24"
          strokeWidth="1.2"
          className="opacity-50"
        />

        {/* Ring 3 - Counter-angled Ellipse */}
        <ellipse
          cx="200"
          cy="200"
          rx="180"
          ry="80"
          transform="rotate(-55 200 200)"
          stroke="#e5a93b"
          strokeWidth="1"
          strokeDasharray="4 8"
          className="opacity-60"
        />

        {/* Outer Circular Ring with tick marks */}
        <circle
          cx="200"
          cy="200"
          r="192"
          stroke="rgba(255, 255, 255, 0.12)"
          strokeWidth="1"
        />

        {/* Orbital dots */}
        <circle cx="200" cy="15" r="3.5" fill="#e5a93b" />
        <circle cx="200" cy="385" r="3.5" fill="#e5a93b" />
        <circle cx="15" cy="200" r="2.5" fill="#fbbf24" />
        <circle cx="385" cy="200" r="2.5" fill="#fbbf24" />
      </motion.svg>
    </div>
  );
}
