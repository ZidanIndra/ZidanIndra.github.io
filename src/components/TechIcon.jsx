import React from 'react';

export default function TechIcon({ name, className = 'w-6 h-6' }) {
  const norm = (name || '').toLowerCase();

  // React
  if (norm.includes('react')) {
    return (
      <svg className={className} viewBox="0 0 115.3 100" fill="none">
        <ellipse cx="57.65" cy="50" rx="16.7" ry="43.5" transform="rotate(30 57.65 50)" stroke="#61DAFB" strokeWidth="6" />
        <ellipse cx="57.65" cy="50" rx="16.7" ry="43.5" transform="rotate(90 57.65 50)" stroke="#61DAFB" strokeWidth="6" />
        <ellipse cx="57.65" cy="50" rx="16.7" ry="43.5" transform="rotate(150 57.65 50)" stroke="#61DAFB" strokeWidth="6" />
        <circle cx="57.65" cy="50" r="9" fill="#61DAFB" />
      </svg>
    );
  }

  // Next.js
  if (norm.includes('next')) {
    return (
      <svg className={className} viewBox="0 0 180 180" fill="none">
        <circle cx="90" cy="90" r="85" fill="#000000" stroke="#ffffff" strokeWidth="8" />
        <path d="M128 140L72 65H57V125H72V85L120 150H135L128 140Z" fill="#ffffff" />
        <path d="M122 65H137V105H122V65Z" fill="#ffffff" />
      </svg>
    );
  }

  // Tailwind CSS
  if (norm.includes('tailwind')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <path
          d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.336 6.182 14.975 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.336 13.382 8.975 12 6.001 12z"
          fill="#38BDF8"
        />
      </svg>
    );
  }

  // JavaScript
  if (norm.includes('javascript') || norm === 'js') {
    return (
      <svg className={className} viewBox="0 0 630 630" fill="none">
        <rect width="630" height="630" rx="90" fill="#F7DF1E" />
        <path d="M165.4 466.8l47.8-28.5c10.8 18.2 23.4 33.2 46.9 33.2 23.9 0 39.2-11.8 39.2-39.6V249.4h59.4v183.1c0 62.4-36.8 90.3-89.8 90.3-48.4 0-77.9-25.2-94.5-56zM375.4 457.7l48.3-27.9c13.7 22.4 31.4 39.1 58.7 39.1 24.5 0 40.2-12.3 40.2-29.4 0-20.2-16.1-27.4-43.2-39.1l-14.8-6.3c-42.6-18.2-70.6-41.2-70.6-89.8 0-44.5 34.6-78.4 89.2-78.4 39.1 0 67.2 14.3 86.8 48.3l-45.6 29.1c-9.8-17.7-22.9-24.8-41.2-24.8-19.1 0-31.9 12-31.9 26.6 0 18.5 12.3 25.7 37.6 36.5l14.8 6.3c49.8 21.3 77.3 43.7 77.3 93.6 0 53.6-41.7 82.7-97.4 82.7-52.9 0-87.8-24.8-108.4-66.7z" fill="#000000" />
      </svg>
    );
  }

  // HTML5 / CSS3
  if (norm.includes('html') || norm.includes('css')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <path d="M4 2l1.6 18 6.4 2 6.4-2 1.6-18H4zm13.1 5.5l-.2 2.5H9.6l.2 2.5h6.9l-.7 7.5-3.6 1.1-3.6-1.1-.3-3.6h2.5l.1 1.6 1.3.4 1.3-.4.2-2.1H7l-.5-7.9h10.6z" fill="#E44D26" />
      </svg>
    );
  }

  // Framer Motion
  if (norm.includes('framer')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <path d="M4 0h16v8h-8zM4 8h8l8 8H4zM4 16h8v8z" fill="#0055FF" />
      </svg>
    );
  }

  // Node.js
  if (norm.includes('node')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <path d="M12 2l10 5.8v11.5L12 25.1 2 19.3V7.8L12 2zm0 3.3L4.5 9.7v7.5L12 21.5l7.5-4.3V9.7L12 5.3z" fill="#539E43" />
        <circle cx="12" cy="13.5" r="3.5" fill="#539E43" />
      </svg>
    );
  }

  // Express.js
  if (norm.includes('express')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <rect x="2" y="4" width="20" height="16" rx="4" fill="#222" stroke="#fff" strokeWidth="1.5" />
        <text x="12" y="15" fill="#fff" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">EX</text>
      </svg>
    );
  }

  // Laravel
  if (norm.includes('laravel')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <path d="M12 2.5L20.5 7.5V17L12 22L3.5 17V7.5L12 2.5Z" fill="#FF2D20" fillOpacity="0.15" stroke="#FF2D20" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M7 9.5L12 6.5L17 9.5V15L12 18L7 15V9.5Z" stroke="#FF2D20" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M12 6.5V18M7 9.5L17 15M17 9.5L7 15" stroke="#FF2D20" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    );
  }

  // Flutter
  if (norm.includes('flutter')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <path d="M14.3 2.5L5.7 11.1l2.8 2.8 11.4-11.4h-5.6z" fill="#02569B" />
        <path d="M14.3 10.9L9.2 16l5.1 5.1h5.6L14.3 15.5l5.6-5.6h-5.6z" fill="#0175C2" />
        <path d="M9.2 16l2.8-2.8 3.5 3.5-2.8 2.8L9.2 16z" fill="#29B6F6" />
      </svg>
    );
  }

  // GetX
  if (norm.includes('getx')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <rect x="2" y="2" width="20" height="20" rx="5" fill="#8B5CF6" fillOpacity="0.15" stroke="#8B5CF6" strokeWidth="1.5" />
        <path d="M7 7l4 5-4 5h3l2.5-3.5L15 17h3l-4-5 4-5h-3l-2.5 3.5L10 7H7z" fill="#A78BFA" />
        <circle cx="17" cy="7" r="2" fill="#06B6D4" />
      </svg>
    );
  }

  // Firebase
  if (norm.includes('firebase')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <path d="M4.6 17.8L6.8 3.8a.7.7 0 0 1 1.3-.2l3.4 6.4-6.9 7.8z" fill="#FFA000" />
        <path d="M12.9 8.2l2.3-4.4a.7.7 0 0 1 1.2 0l4.9 14-8.4-9.6z" fill="#F57C00" />
        <path d="M3.7 18.5l8.3 4.7a1 1 0 0 0 .9 0l8.3-4.7-6.3-7.2-2.9-5.5a.7.7 0 0 0-1.3 0L3.7 18.5z" fill="#FFCA28" />
      </svg>
    );
  }

  // RESTful API
  if (norm.includes('rest') || norm.includes('api')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="6" cy="12" r="3" />
        <circle cx="18" cy="6" r="3" />
        <circle cx="18" cy="18" r="3" />
        <line x1="8.7" y1="10.7" x2="15.3" y2="7.3" />
        <line x1="8.7" y1="13.3" x2="15.3" y2="16.7" />
      </svg>
    );
  }

  // FastAPI / Python
  if (norm.includes('python') || norm.includes('fastapi')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <path d="M11.9 2c-3.1 0-5 .9-5 3v2.5h5v.8H4.6C2.5 8.3 2 9.8 2 12.3c0 2.9 1 4.7 4.9 4.7H8v-2.3c0-2.3 2-4.4 4.5-4.4h3.9c.7 0 1.2-.5 1.2-1.2V5c0-2.2-2.6-3-5.7-3zm-1.8 1.8a.9.9 0 1 1 0 1.8.9.9 0 0 1 0-1.8zm2 20.2c3.1 0 5-.9 5-3v-2.5h-5v-.8h7.3c2.1 0 2.6-1.5 2.6-4 0-2.9-1-4.7-4.9-4.7H16v2.3c0 2.3-2 4.4-4.5 4.4H7.6c-.7 0-1.2.5-1.2 1.2V19c0 2.2 2.6 3 5.7 3zm1.8-1.8a.9.9 0 1 1 0-1.8.9.9 0 0 1 0 1.8z" fill="#3776AB" />
      </svg>
    );
  }

  // PostgreSQL
  if (norm.includes('postgres')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="#336791" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2C6.5 2 2 6.5 2 12c0 4.5 3 8.3 7.2 9.5.4.1.8-.2.8-.6v-2.1c-2.8.6-3.4-1.2-3.4-1.2-.4-1.1-1.1-1.4-1.1-1.4-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.5 2.4 1.1 3 .8.1-.7.4-1.1.7-1.4-2.2-.2-4.6-1.1-4.6-5 0-1.1.4-2 1-2.7-.1-.3-.4-1.3.1-2.7 0 0 .9-.3 2.8 1.1.8-.2 1.7-.3 2.5-.3.8 0 1.7.1 2.5.3 1.9-1.4 2.8-1.1 2.8-1.1.5 1.4.2 2.4.1 2.7.6.7 1 1.6 1 2.7 0 3.9-2.4 4.8-4.6 5 .4.3.7.9.7 1.9v2.8c0 .4.4.7.8.6 4.2-1.2 7.2-5 7.2-9.5 0-5.5-4.5-10-10-10z" fill="#336791" fillOpacity="0.2" />
      </svg>
    );
  }

  // MongoDB
  if (norm.includes('mongo')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <path d="M12 1.5s-5.5 5.5-5.5 11c0 4.5 3.5 8.5 5.5 10 2-1.5 5.5-5.5 5.5-10 0-5.5-5.5-11-5.5-11z" fill="#47A248" />
        <path d="M12 2v19.5c.3-.2.6-.5.9-.8 1.8-1.7 4.6-5 4.6-8.7 0-4.5-4.2-9-5.5-10z" fill="#3FA037" />
        <path d="M12 22.5c-.2 0-.4-.1-.5-.2-.5-.4-1.1-.9-1.7-1.6V4.2c.7.9 1.4 1.9 1.9 2.9.2.4.3.8.3 1.3v14.1z" fill="#F8F8F8" opacity="0.3" />
      </svg>
    );
  }

  // MySQL
  if (norm.includes('mysql')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="#00758F" strokeWidth="2">
        <ellipse cx="12" cy="7" rx="9" ry="3" fill="#00758F" fillOpacity="0.2" />
        <path d="M3 7v10c0 1.66 4.03 3 9 3s9-1.34 9-3V7" />
        <path d="M3 12c0 1.66 4.03 3 9 3s9-1.34 9-3" />
      </svg>
    );
  }

  // PyTorch
  if (norm.includes('pytorch')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <path d="M12 2a1 1 0 0 1 .8.4l7 9a1 1 0 0 1-.2 1.4l-4.5 3.5a1 1 0 0 1-1.3-.1L12 14.5l-1.8 1.7a1 1 0 0 1-1.3.1L4.4 12.8a1 1 0 0 1-.2-1.4l7-9A1 1 0 0 1 12 2z" fill="#EE4C2C" />
        <circle cx="15.5" cy="5.5" r="1.5" fill="#EE4C2C" />
      </svg>
    );
  }

  // TensorFlow / Keras
  if (norm.includes('tensorflow') || norm.includes('keras')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <path d="M12 2l8 4.6v9.2L12 20.4l-8-4.6V6.6L12 2z" stroke="#FF6F00" strokeWidth="2" fill="#FF6F00" fillOpacity="0.2" />
        <path d="M12 6.5v9M7.5 9l9 5M16.5 9l-9 5" stroke="#FF6F00" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }

  // Scikit-Learn
  if (norm.includes('scikit')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <circle cx="9" cy="12" r="6" fill="#3499CD" fillOpacity="0.6" />
        <circle cx="15" cy="12" r="6" fill="#F89939" fillOpacity="0.7" />
        <path d="M12 6.8a6 6 0 0 1 0 10.4 6 6 0 0 1 0-10.4z" fill="#1B6094" />
      </svg>
    );
  }

  // NLP & Transformers (IndoBERT)
  if (norm.includes('nlp') || norm.includes('bert') || norm.includes('transformer')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        <circle cx="12" cy="12" r="3" fill="#F59E0B" fillOpacity="0.3" />
        <line x1="3.27" y1="6.96" x2="12" y2="12.01" />
        <line x1="12" y1="12.01" x2="20.73" y2="6.96" />
        <line x1="12" y1="22.08" x2="12" y2="12" />
      </svg>
    );
  }

  // Computer Vision (YOLO/CNN)
  if (norm.includes('vision') || norm.includes('yolo') || norm.includes('cnn')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="#06B6D4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
        <circle cx="12" cy="12" r="3" />
        <path d="M5 5l2 2m10-2l-2 2M5 19l2-2m10 2l-2-2" stroke="#F59E0B" />
      </svg>
    );
  }

  // Monte Carlo Simulation
  if (norm.includes('monte carlo') || norm.includes('simulation')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="#A855F7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="3" fill="#A855F7" fillOpacity="0.15" />
        <circle cx="8" cy="8" r="1.5" fill="#A855F7" />
        <circle cx="16" cy="8" r="1.5" fill="#A855F7" />
        <circle cx="12" cy="12" r="1.5" fill="#A855F7" />
        <circle cx="8" cy="16" r="1.5" fill="#A855F7" />
        <circle cx="16" cy="16" r="1.5" fill="#A855F7" />
      </svg>
    );
  }

  // Git & GitHub
  if (norm.includes('git')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <path d="M21.6 10.9L13.1 2.4a2 2 0 0 0-2.8 0L8.1 4.6l3.5 3.5a2.4 2.4 0 0 1 3 .6 2.4 2.4 0 0 1 .6 2.5l3.4 3.4a2.4 2.4 0 0 1 3-3.7z" fill="#F05032" />
        <circle cx="12" cy="18" r="2.5" fill="#F05032" />
        <circle cx="6" cy="12" r="2.5" fill="#F05032" />
        <path d="M6 12l5-5m1 11v-6" stroke="#F05032" strokeWidth="2" />
      </svg>
    );
  }

  // Docker
  if (norm.includes('docker')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <path d="M22.5 11c-.5-.4-1.6-.4-2.3 0-.3-1.6-1.5-2.7-3.2-2.7h-.5c-.6-1.7-2.2-2.8-4-2.8-.4 0-.8.1-1.2.2V5H8.7v2.2C8 7.5 7.4 8 7 8.7H5V11H2.5C1.7 11 1 11.7 1 12.5 1 16.6 4.4 20 8.5 20c7.2 0 11.5-4.4 12.4-9.3.6-.3 1.2-.5 1.6-.7z" fill="#2496ED" />
        <rect x="5.5" y="8.5" width="2" height="2" fill="#fff" />
        <rect x="8.5" y="8.5" width="2" height="2" fill="#fff" />
        <rect x="11.5" y="8.5" width="2" height="2" fill="#fff" />
      </svg>
    );
  }

  // Postman
  if (norm.includes('postman')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" fill="#FF6C37" />
        <path d="M12 7l4 4-4 4m3-4H8" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  // Linux / Bash
  if (norm.includes('linux') || norm.includes('bash')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="#FCC624" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="3" fill="#18181b" />
        <path d="M6 9l3 3-3 3m5 0h4" stroke="#FCC624" />
      </svg>
    );
  }

  // Figma
  if (norm.includes('figma')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <path d="M8 2a3 3 0 0 0-3 3v3h3a3 3 0 1 0 0-6z" fill="#F24E1E" />
        <path d="M8 8a3 3 0 1 0 0 6h3V8H8z" fill="#0ACF83" />
        <path d="M11 2h3a3 3 0 1 1 0 6h-3V2z" fill="#FF7262" />
        <path d="M11 8h3a3 3 0 1 1 0 6h-3V8z" fill="#1ABCFE" />
        <path d="M8 14a3 3 0 1 0 3 3v-3H8z" fill="#A259FF" />
      </svg>
    );
  }

  // Vite
  if (norm.includes('vite')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <path d="M21.5 4.5L12.7 21a1 1 0 0 1-1.8 0L2.5 4.5A1 1 0 0 1 3.4 3h17.2a1 1 0 0 1 .9 1.5z" fill="#646CFF" fillOpacity="0.2" stroke="#646CFF" strokeWidth="1.5" />
        <path d="M13 2.5l-5 8h4.5l-2.5 8 7-9.5h-4.5z" fill="#FFD21E" />
      </svg>
    );
  }

  // Fallback
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="#E5A93B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4m0-4h.01" />
    </svg>
  );
}
