import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Send, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function Contact({ profile }) {
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
          <span className="text-amber-400 font-semibold text-xs tracking-widest uppercase mb-2">Connect</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Get In Touch</h2>
          <div className="w-12 h-1 bg-gradient-to-r from-amber-500 to-amber-300 rounded-full mt-3" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Info Panel */}
          <div className="lg:col-span-5 glass-panel p-8 rounded-3xl border border-white/10 space-y-6">
            <h3 className="text-xl font-bold text-white mb-2">Let's build something exceptional</h3>
            <p className="text-neutral-300 text-sm leading-relaxed mb-6">
              Terbuka untuk kolaborasi proyek Full-Stack, konsultasi AI/Machine Learning, maupun peluang karir. Silakan kirimkan pesan langsung melalui formulir atau email.
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
                  <p className="text-sm font-medium text-neutral-200">
                    {profile?.location || 'Medan, Indonesia'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Form */}
          <div className="lg:col-span-7 glass-panel p-8 rounded-3xl border border-white/10">
            {isSent ? (
              <div className="py-12 flex flex-col items-center justify-center text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-amber-400" />
                <h4 className="text-lg font-bold text-white">Pesan Anda Siap Dikirim!</h4>
                <p className="text-xs text-neutral-300 max-w-sm">
                  Email client Anda terbuka untuk mengirimkan pesan ini langsung ke inbox Zidan.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1.5">Nama Anda</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Recruiter / Client Name"
                      className="w-full px-4 py-2.5 rounded-xl bg-neutral-900/60 border border-white/10 text-neutral-100 text-sm focus:outline-none focus:border-amber-500/50 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1.5">Email Anda</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@company.com"
                      className="w-full px-4 py-2.5 rounded-xl bg-neutral-900/60 border border-white/10 text-neutral-100 text-sm focus:outline-none focus:border-amber-500/50 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1.5">Subjek</label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="Project Inquiry / Job Opportunity"
                    className="w-full px-4 py-2.5 rounded-xl bg-neutral-900/60 border border-white/10 text-neutral-100 text-sm focus:outline-none focus:border-amber-500/50 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1.5">Pesan</label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tuliskan pesan atau detail penawaran Anda..."
                    className="w-full px-4 py-2.5 rounded-xl bg-neutral-900/60 border border-white/10 text-neutral-100 text-sm focus:outline-none focus:border-amber-500/50 transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-neutral-950 font-bold text-sm hover:from-amber-400 hover:to-amber-500 shadow-lg shadow-amber-500/20 active:scale-98 transition-all"
                >
                  <Send className="w-4 h-4" />
                  <span>Kirim Pesan</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
