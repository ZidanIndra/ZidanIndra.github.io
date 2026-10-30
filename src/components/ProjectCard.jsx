import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Sparkles } from 'lucide-react';
import { GithubIcon } from './SocialIcons.jsx';

export default function ProjectCard({ project, onSelect }) {
  const cardRef = useRef(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rX = ((y - centerY) / centerY) * -7;
    const rY = ((x - centerX) / centerX) * 7;

    setRotateX(rX);
    setRotateY(rY);
    setGlarePos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.15,
    });
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setGlarePos((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: 'preserve-3d',
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
      }}
      className="glass-card rounded-2xl overflow-hidden border border-white/10 hover:border-amber-500/40 transition-all duration-300 flex flex-col group relative"
    >
      {/* Dynamic Cursor Spotlight / Glare */}
      <div
        style={{
          background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(229,169,59, ${glarePos.opacity}), transparent 60%)`,
        }}
        className="absolute inset-0 pointer-events-none z-10 transition-opacity duration-300"
      />

      {/* Image Thumbnail Header */}
      <div className="relative h-48 sm:h-52 overflow-hidden bg-neutral-950 flex items-center justify-center">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            e.target.style.display = 'none';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0c10] via-transparent to-transparent opacity-80" />

        {/* Category Pill Tag */}
        <div className="absolute top-3 left-3 z-20">
          <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-neutral-900/80 backdrop-blur-md text-amber-300 border border-amber-500/30 shadow-md">
            {project.category}
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-bold text-neutral-100 group-hover:text-amber-400 transition-colors mb-2">
            {project.title}
          </h3>
          <p className="text-xs sm:text-sm text-neutral-300 line-clamp-3 mb-4 leading-relaxed">
            {project.description}
          </p>
        </div>

        <div>
          {/* Tech Badges */}
          <div className="flex flex-wrap gap-1.5 mb-5">
            {project.tags?.map((tag, idx) => (
              <span
                key={idx}
                className="text-[10px] px-2 py-0.5 rounded-md bg-white/5 text-neutral-400 font-medium border border-white/5"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Action Links */}
          <div className="flex items-center gap-2 pt-3 border-t border-white/5">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 text-xs font-semibold border border-amber-500/20 hover:border-amber-500/40 transition-all duration-200"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Live Demo</span>
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg glass-card text-neutral-400 hover:text-white hover:border-amber-500/30 transition-all duration-200"
                aria-label="GitHub Repository"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
