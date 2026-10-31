import React, { createContext, useContext, useState, useEffect } from 'react';

export const translations = {
  id: {
    nav: {
      home: 'Beranda',
      about: 'Tentang',
      skills: 'Keahlian',
      work: 'Proyek',
      certificates: 'Publikasi',
      activities: 'Aktivitas',
      contact: 'Kontak',
      downloadCV: 'Unduh CV',
    },
    hero: {
      greeting: "Halo, Saya",
      title: "Full-Stack Developer & Machine Learning / AI Enthusiast",
      bio: "Membangun arsitektur web modern end-to-end yang tangguh serta mengintegrasikan algoritma kecerdasan buatan cerdas untuk memecahkan masalah nyata. Berpengalaman dalam web modern, deep learning, NLP, dan computer vision.",
      portfolioDeck: "Portofolio Deck",
      exploreWork: "Jelajahi Karya",
      connect: "Terhubung:"
    },
    about: {
      badge: "Tentang Saya",
      title: "Rekayasa Perangkat Lunak & Kecerdasan Buatan Terapan",
      summary: "Saya adalah seorang Full-Stack Developer dengan ketertarikan mendalam pada Machine Learning & Artificial Intelligence. Berpengalaman dalam merancang dan mengembangkan aplikasi web yang scalable, responsif, dan interaktif, sekaligus mengimplementasikan model machine learning mutakhir (Computer Vision, NLP dengan IndoBERT, dan simulasi prediktif).",
      stats: {
        experience: "Tahun Pengalaman",
        projects: "Proyek Selesai",
        publications: "Publikasi & Sertifikat",
        satisfaction: "Kepuasan Klien"
      },
      highlightsTitle: "Sorotan Keahlian",
      highlights: [
        "Aplikasi web full-stack end-to-end (React, Node.js, Express, MongoDB, PostgreSQL, Laravel)",
        "Pengembangan Aplikasi Mobile: Aplikasi cross-platform responsif dengan Flutter, GetX state management, dan Firebase",
        "Deep Learning & NLP: fine-tuning IndoBERT klasifikasi teks, PyTorch & CNN untuk klasifikasi sampah",
        "Simulasi & Algoritma: Simulasi antrean pemrosesan sampah TPA dengan metode probabilistik Monte Carlo",
        "Komitmen tinggi pada Clean Code, UI/UX Glassmorphism modern, dan performa tinggi"
      ]
    },
    skills: {
      badge: "Kemampuan Teknis",
      title: "Keahlian & Teknologi",
      categories: {
        "Frontend": "Frontend",
        "Backend": "Backend",
        "Mobile Development": "Mobile Development",
        "Machine Learning & AI": "Machine Learning & AI",
        "Tools & DevOps": "Tools & DevOps"
      },
      levels: {
        "Advanced": "Mahir",
        "Intermediate": "Menengah"
      }
    },
    projects: {
      badge: "Karya Unggulan",
      title: "Proyek & Solusi Rekayasa",
      filterAll: "Semua",
      liveDemo: "Kunjungi Website",
      behance: "Behance Case Study",
      github: "Kode Sumber GitHub"
    },
    certificates: {
      badge: "Karya Ilmiah & Prestasi",
      title: "Publikasi Ilmiah & Prestasi",
      subtitle: "Jurnal ilmiah terakreditasi, publikasi buku ber-HKI, dan kontribusi riset terpublikasi",
      viewPublication: "Buka Publikasi Ilmiah",
      viewDetails: "Lihat Bukti & Detail"
    },
    activities: {
      badge: "Aktivitas & Komunitas",
      title: "Organisasi & Pengabdian Masyarakat",
      subtitle: "Kegiatan pengabdian kepada masyarakat, komunitas pengembang Google, dan pelatihan",
      viewDetails: "Lihat Dokumentasi"
    },
    contact: {
      badge: "Mari Terhubung",
      title: "Hubungi Saya",
      subtitle: "Punya ide proyek menarik, riset AI, atau peluang kolaborasi? Mari diskusikan bersama.",
      nameLabel: "Nama Lengkap",
      namePlaceholder: "cth. Budi Santoso",
      emailLabel: "Alamat Email",
      emailPlaceholder: "nama@domain.com",
      subjectLabel: "Subjek Pesan",
      subjectPlaceholder: "Tawaran Proyek / Kolaborasi AI",
      messageLabel: "Pesan Anda",
      messagePlaceholder: "Tuliskan rincian kebutuhan atau ide proyek Anda di sini...",
      submitBtn: "Kirim Pesan Sekarang",
      directEmail: "Kirim Email Langsung",
      location: "Medan, Sumatera Utara, Indonesia"
    },
    footer: {
      rights: "Hak Cipta Dilindungi.",
      builtWith: "Dibangun dengan React, Tailwind CSS, & Framer Motion."
    }
  },
  en: {
    nav: {
      home: 'Home',
      about: 'About',
      skills: 'Skills',
      work: 'Projects',
      certificates: 'Publications',
      activities: 'Activities',
      contact: 'Contact',
      downloadCV: 'Download CV',
    },
    hero: {
      greeting: "Hello, I'm",
      title: "Full-Stack Developer & Machine Learning / AI Enthusiast",
      bio: "Building robust end-to-end web architectures and integrating intelligent algorithms to solve real-world problems. Experienced in modern web development, deep learning, NLP, and computer vision.",
      portfolioDeck: "Portfolio Deck",
      exploreWork: "Explore Works",
      connect: "Connect:"
    },
    about: {
      badge: "About Me",
      title: "Engineering Scalable Software & Applied Intelligence",
      summary: "I am a Full-Stack Developer with a deep passion for Machine Learning & Artificial Intelligence. Experienced in architecting scalable, responsive, and interactive web applications while applying cutting-edge machine learning models (Computer Vision, NLP with IndoBERT, and stochastic predictive simulations).",
      stats: {
        experience: "Years Experience",
        projects: "Completed Projects",
        publications: "Publications & Certs",
        satisfaction: "Client Satisfaction"
      },
      highlightsTitle: "Core Competencies",
      highlights: [
        "End-to-end full-stack web applications (React, Node.js, Express, MongoDB, PostgreSQL, Laravel)",
        "Mobile App Development: Responsive cross-platform applications with Flutter, GetX state management, and Firebase",
        "Deep Learning & NLP: fine-tuning IndoBERT for text classification, PyTorch & CNN for waste classification",
        "Simulation & Algorithms: Waste processing queue simulation in landfills using Monte Carlo probabilistic method",
        "Strong commitment to Clean Code, modern Glassmorphism UI/UX, and optimal performance"
      ]
    },
    skills: {
      badge: "Capabilities",
      title: "Skills & Technologies",
      categories: {
        "Frontend": "Frontend",
        "Backend": "Backend",
        "Mobile Development": "Mobile Development",
        "Machine Learning & AI": "Machine Learning & AI",
        "Tools & DevOps": "Tools & DevOps"
      },
      levels: {
        "Advanced": "Advanced",
        "Intermediate": "Intermediate"
      }
    },
    projects: {
      badge: "Featured Works",
      title: "Projects & Engineering Solutions",
      filterAll: "All",
      liveDemo: "Live Website",
      behance: "Behance Case Study",
      github: "GitHub Repository"
    },
    certificates: {
      badge: "Credentials & Research",
      title: "Publications & Achievements",
      subtitle: "Peer-reviewed scientific journals, copyrighted books, and research contributions",
      viewPublication: "Open Scientific Publication",
      viewDetails: "View Details & Verification"
    },
    activities: {
      badge: "Community & Impact",
      title: "Organization & Community Outreach",
      subtitle: "Community service programs, developer conferences, and educational initiatives",
      viewDetails: "View Documentation"
    },
    contact: {
      badge: "Get In Touch",
      title: "Contact Me",
      subtitle: "Have an exciting project, AI research endeavor, or collaboration opportunity? Let's discuss.",
      nameLabel: "Full Name",
      namePlaceholder: "e.g. John Doe",
      emailLabel: "Email Address",
      emailPlaceholder: "name@domain.com",
      subjectLabel: "Subject",
      subjectPlaceholder: "Project Proposal / AI Collaboration",
      messageLabel: "Your Message",
      messagePlaceholder: "Write your project details or inquiries here...",
      submitBtn: "Send Message Now",
      directEmail: "Direct Email Inquiry",
      location: "Medan, North Sumatra, Indonesia"
    },
    footer: {
      rights: "All rights reserved.",
      builtWith: "Engineered with React, Tailwind CSS, & Framer Motion."
    }
  }
};

const resolveTranslation = (path, lang = 'id') => {
  const keys = path.split('.');
  let current = translations[lang] || translations.id;
  for (const key of keys) {
    if (current && typeof current === 'object' && key in current) {
      current = current[key];
    } else {
      return path;
    }
  }
  return current;
};

const LanguageContext = createContext({
  lang: 'id',
  setLang: () => {},
  toggleLang: () => {},
  t: (path) => resolveTranslation(path, 'id'),
});

export function LanguageProvider({ children, initialLang }) {
  const [lang, setLang] = useState(() => {
    if (initialLang) return initialLang;
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('portfolio_lang');
      if (saved === 'en' || saved === 'id') return saved;
    }
    return 'id';
  });

  useEffect(() => {
    try {
      localStorage.setItem('portfolio_lang', lang);
      document.documentElement.lang = lang;
    } catch {
      // ignore
    }
  }, [lang]);

  const toggleLang = () => {
    setLang((prev) => (prev === 'id' ? 'en' : 'id'));
  };

  const t = (path) => resolveTranslation(path, lang);

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
