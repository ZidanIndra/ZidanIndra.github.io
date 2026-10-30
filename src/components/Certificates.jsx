import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, Calendar, X, ExternalLink, ZoomIn } from 'lucide-react';

export default function Certificates({ certificates }) {
  const [selectedCert, setSelectedCert] = useState(null);

  if (!certificates) return null;

  return (
    <section id="certificates" className="py-24 relative bg-neutral-950/40">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <span className="text-amber-400 font-semibold text-xs tracking-widest uppercase mb-2">Credentials</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Certificates & Achievements</h2>
          <div className="w-12 h-1 bg-gradient-to-r from-amber-500 to-amber-300 rounded-full mt-3" />
        </div>

        {/* Certificates Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificates.map((cert) => (
            <motion.div
              key={cert.id}
              whileHover={{ y: -4 }}
              onClick={() => setSelectedCert(cert)}
              className="glass-card rounded-2xl overflow-hidden border border-white/5 hover:border-amber-500/30 transition-all duration-300 cursor-pointer group flex flex-col justify-between"
            >
              {/* Image Thumbnail with Zoom Overlay */}
              <div className="relative h-44 bg-neutral-900 overflow-hidden flex items-center justify-center">
                <img
                  src={cert.image}
                  alt={cert.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
                <div className="absolute inset-0 bg-neutral-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-xs">
                  <span className="p-2.5 rounded-full bg-amber-500 text-neutral-950 shadow-lg">
                    <ZoomIn className="w-4 h-4" />
                  </span>
                </div>
              </div>

              {/* Info Body */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs text-neutral-400 mb-2">
                    <span className="text-amber-400 font-semibold">{cert.issuer}</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {cert.year}
                    </span>
                  </div>
                  <h3 className="font-bold text-neutral-100 text-sm group-hover:text-amber-400 transition-colors line-clamp-2 mb-2">
                    {cert.title}
                  </h3>
                  {cert.description && (
                    <p className="text-xs text-neutral-400 line-clamp-2">
                      {cert.description}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedCert && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative max-w-3xl w-full glass-panel rounded-3xl overflow-hidden border border-white/20 p-6 shadow-2xl"
            >
              <button
                onClick={() => setSelectedCert(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-neutral-800 text-neutral-300 hover:text-white hover:bg-neutral-700 transition-colors z-20"
                aria-label="Close Modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="rounded-2xl overflow-hidden bg-neutral-950 mb-4 max-h-[60vh] flex items-center justify-center">
                <img
                  src={selectedCert.image}
                  alt={selectedCert.title}
                  className="max-h-[60vh] w-auto object-contain"
                />
              </div>

              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="text-xs font-semibold text-amber-400">{selectedCert.issuer} • {selectedCert.year}</span>
                  <h3 className="text-lg font-bold text-white mt-1">{selectedCert.title}</h3>
                  {selectedCert.description && (
                    <p className="text-xs text-neutral-300 mt-2">{selectedCert.description}</p>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
