import React, { useState } from 'react';
import { Mail, MapPin, Send, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useLanguage } from '../context/LanguageContext.jsx';

export default function Contact({ profile }) {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    // Trigger celebration confetti
    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#e5a93b', '#fbbf24', '#ffffff', '#6366f1']
      });
    } catch (e) {}

    setIsSent(true);

    // Open user's email client
    const mailto = `mailto:${profile?.email || 'zidanindra@gmail.com'}?subject=${encodeURIComponent(formData.subject || 'Portfolio Contact from ' + formData.name)}&body=${encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    )}`;
    window.location.href = mailto;

    setTimeout(() => {
      setFormData({ name: '', email: '', subject: '', message: '' });
      setIsSent(false);
    }, 4000);
  };

  return (
    <section id="contact" className="py-24 relative">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <span className="text-amber-400 font-semibold text-xs tracking-widest uppercase mb-2">
            {t('contact.badge')}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            {t('contact.title')}
          </h2>
          <div className="w-12 h-1 bg-gradient-to-r from-amber-500 to-amber-300 rounded-full mt-3" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Info Panel */}
          <div className="lg:col-span-5 glass-panel p-8 rounded-3xl border border-white/10 space-y-6">
            <h3 className="text-xl font-bold text-white mb-2">{t('contact.title')}</h3>
            <p className="text-neutral-300 text-sm leading-relaxed mb-6">
              {t('contact.subtitle')}
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[11px] text-neutral-400 uppercase font-semibold">Email</p>
                  <a href={`mailto:${profile?.email || 'zidanindra@gmail.com'}`} className="text-sm font-medium text-neutral-200 hover:text-amber-400 transition-colors">
                    {profile?.email || 'zidanindra@gmail.com'}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[11px] text-neutral-400 uppercase font-semibold">Location</p>
                  <p className="text-sm font-medium text-neutral-200">{t('contact.location')}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Contact Form */}
          <form onSubmit={handleSubmit} className="lg:col-span-7 glass-panel p-8 rounded-3xl border border-white/10 space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-2">
                  {t('contact.nameLabel')} <span className="text-amber-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder={t('contact.namePlaceholder')}
                  className="w-full px-4 py-3 rounded-xl bg-neutral-900/60 border border-white/10 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-amber-500/60 focus:ring-1 focus:ring-amber-500/60 transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-2">
                  {t('contact.emailLabel')} <span className="text-amber-400">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder={t('contact.emailPlaceholder')}
                  className="w-full px-4 py-3 rounded-xl bg-neutral-900/60 border border-white/10 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-amber-500/60 focus:ring-1 focus:ring-amber-500/60 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-2">
                {t('contact.subjectLabel')}
              </label>
              <input
                type="text"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                placeholder={t('contact.subjectPlaceholder')}
                className="w-full px-4 py-3 rounded-xl bg-neutral-900/60 border border-white/10 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-amber-500/60 focus:ring-1 focus:ring-amber-500/60 transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-2">
                {t('contact.messageLabel')} <span className="text-amber-400">*</span>
              </label>
              <textarea
                rows={4}
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder={t('contact.messagePlaceholder')}
                className="w-full px-4 py-3 rounded-xl bg-neutral-900/60 border border-white/10 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-amber-500/60 focus:ring-1 focus:ring-amber-500/60 transition-all resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={isSent}
              className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-neutral-950 font-bold text-sm shadow-lg shadow-amber-500/25 transition-all duration-200 flex items-center justify-center gap-2 active:scale-98 disabled:opacity-70 cursor-pointer"
            >
              {isSent ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-neutral-950" />
                  <span>Pesan Terkirim!</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>{t('contact.submitBtn')}</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
