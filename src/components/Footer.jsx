import React from 'react';
import { Lock, Heart } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './SocialIcons.jsx';

export default function Footer({ profile }) {
  return (
    <footer className="py-12 border-t border-white/5 bg-neutral-950/80 relative z-10">
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <p className="text-sm font-semibold text-white">
            Zidan Indra Nugraha
          </p>
          <p className="text-xs text-neutral-400 mt-1">
            © {new Date().getFullYear()} All rights reserved. Crafted with clean architecture & modern AI.
          </p>
        </div>

        <div className="flex items-center gap-4">
          {profile?.linkedin && (
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-400 hover:text-amber-400 transition-colors"
              aria-label="LinkedIn"
            >
              <LinkedinIcon className="w-4 h-4" />
            </a>
          )}
          {profile?.github && (
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-400 hover:text-amber-400 transition-colors"
              aria-label="GitHub"
            >
              <GithubIcon className="w-4 h-4" />
            </a>
          )}

          {/* Discreet Admin Link */}
          <a
            href="#/admin"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-900 border border-white/5 text-neutral-400 hover:text-amber-400 text-xs font-medium hover:border-amber-500/20 transition-all"
            title="Admin CMS"
          >
            <Lock className="w-3 h-3" />
            <span>Admin</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
