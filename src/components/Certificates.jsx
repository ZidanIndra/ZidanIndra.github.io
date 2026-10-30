import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, X, ExternalLink, ZoomIn, BookOpen } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext.jsx';

export default function Certificates({ certificates }) {
  const { t } = useLanguage();
  const [selectedCert, setSelectedCert] = useState(null);

  if (!certificates) return null;

  return (
    <section id="certificates" className="py-24 relative bg-neutral-950/40">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <span className="text-amber-400 font-semibold text-xs tracking-widest uppercase mb-2">
            {t('certificates.badge')}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            {t('certificates.title')}
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 mt-2 max-w-xl text-center">
            {t('certificates.subtitle')}
          </p>
          <div className="w-12 h-1 bg-gradient-to-r from-amber-500 to-amber-300 rounded-full mt-3" />
        </div>

        {/* Certificates Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificates.map((cert) => (
            <motion.div
              key={cert.id}
              whileHover={{ y: -4 }}
              className="glass-card rounded-2xl overflow-hidden border border-white/5 hover:border-amber-500/30 transition-all duration-300 group flex flex-col justify-between"
            >
              {/* Image Thumbnail with Zoom Overlay */}
              <div
                onClick={() => setSelectedCert(cert)}
                className="relative h-48 bg-neutral-900 overflow-hidden flex items-center justify-center cursor-pointer"
              >
                <img
                  src={cert.image}
                  alt={cert.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
                <div className="absolute inset-0 bg-neutral-950/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-xs">
                  <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500 text-neutral-950 font-semibold text-xs shadow-lg">
                    <ZoomIn className="w-3.5 h-3.5" />
                    <span>{t('certificates.viewDetails')}</span>
                  </span>
                </div>
              </div>

              {/* Info Body */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs text-neutral-400 mb-2">
                    <span className="text-amber-400 font-semibold truncate max-w-[200px]">
                      {cert.issuer}
                    </span>
                    <span className="flex items-center gap-1 shrink-0">
                      <Calendar className="w-3 h-3" />
                      {cert.year}
                    </span>
                  </div>
                  <h3 className="font-bold text-neutral-100 text-sm group-hover:text-amber-400 transition-colors line-clamp-2 mb-2 leading-snug">
                    {cert.title}
                  </h3>
                  {cert.description && (
                    <p className="text-xs text-neutral-400 line-clamp-3 leading-relaxed mb-4">
                      {cert.description}
                    </p>
                  )}
                </div>

                {/* Direct Action Link if paper / DOI exists */}
                {cert.link && (
                  <div className="pt-3 border-t border-white/5">
                    <a
                      href={cert.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-300 hover:text-amber-400 hover:underline transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>{t('certificates.viewPublication')}</span>
                    </a>
                  </div>
                )}
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

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-semibold text-amber-400">
                    {selectedCert.issuer} • {selectedCert.year}
                  </span>
                  <h3 className="text-lg font-bold text-white mt-1">
                    {selectedCert.title}
                  </h3>
                  {selectedCert.description && (
                    <p className="text-xs text-neutral-300 mt-2">
                      {selectedCert.description}
                    </p>
                  )}
                </div>

                {selectedCert.link && (
                  <a
                    href={selectedCert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-semibold text-xs shrink-0 shadow-md transition-colors"
                  >
                    <span>{t('certificates.viewPublication')}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
