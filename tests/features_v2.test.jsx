import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import TechIcon from '../src/components/TechIcon.jsx';
import Activities from '../src/components/Activities.jsx';
import Certificates from '../src/components/Certificates.jsx';
import ProjectCard from '../src/components/ProjectCard.jsx';
import { LanguageProvider, useLanguage } from '../src/context/LanguageContext.jsx';

function LangTestComponent() {
  const { lang, toggleLang, t } = useLanguage();
  return (
    <div>
      <span data-testid="current-lang">{lang}</span>
      <button onClick={toggleLang}>Toggle</button>
      <span data-testid="nav-work">{t('nav.work')}</span>
    </div>
  );
}

describe('V2 Features & Updates', () => {
  it('TechIcon renders proper SVG for various tech stacks', () => {
    const { container: r1 } = render(<TechIcon name="React.js" />);
    expect(r1.querySelector('svg')).toBeDefined();

    const { container: r2 } = render(<TechIcon name="PyTorch" />);
    expect(r2.querySelector('svg')).toBeDefined();

    const { container: r3 } = render(<TechIcon name="Docker" />);
    expect(r3.querySelector('svg')).toBeDefined();
  });

  it('LanguageProvider toggles language between ID and EN', () => {
    render(
      <LanguageProvider initialLang="id">
        <LangTestComponent />
      </LanguageProvider>
    );

    expect(screen.getByTestId('current-lang').textContent).toBe('id');
    expect(screen.getByTestId('nav-work').textContent).toBe('Proyek');

    fireEvent.click(screen.getByText('Toggle'));

    expect(screen.getByTestId('current-lang').textContent).toBe('en');
    expect(screen.getByTestId('nav-work').textContent).toBe('Projects');
  });

  it('Activities section renders organization and community activities', () => {
    const mockActivities = [
      {
        id: 'act1',
        title: 'Google DevFest 2023',
        issuer: 'Google Developer Group',
        year: '2023',
        description: 'Developer conference',
        image: './assets/devfest 2023.png'
      }
    ];

    render(
      <LanguageProvider>
        <Activities activities={mockActivities} />
      </LanguageProvider>
    );

    expect(screen.getByText('Google DevFest 2023')).toBeDefined();
    expect(screen.getByText('Google Developer Group')).toBeDefined();
  });

  it('ProjectCard displays Behance link for Behance projects', () => {
    const behanceProject = {
      id: 'p-behance',
      title: 'EduPredict LMS & Analytics',
      category: 'Full-Stack',
      description: 'Analytics platform',
      image: './assets/EduPredict.png',
      tags: ['Node.js', 'React'],
      behanceUrl: 'https://www.behance.net/gallery/214290481/EduPredict'
    };

    render(
      <LanguageProvider initialLang="id">
        <ProjectCard project={behanceProject} />
      </LanguageProvider>
    );

    expect(screen.getByText('EduPredict LMS & Analytics')).toBeDefined();
    const behanceLink = screen.getByRole('link', { name: /Behance/i });
    expect(behanceLink.getAttribute('href')).toBe('https://www.behance.net/gallery/214290481/EduPredict');
  });

  it('Certificates displays scientific publication link when present', () => {
    const mockPublication = [
      {
        id: 'cert-pub',
        title: 'IMPLEMENTASI ALGORITMA CNN',
        issuer: 'Jurnal MISI',
        year: '2024',
        link: 'https://doi.org/10.36595/misi.v8i1.1355',
        image: './assets/jurnal misi.png'
      }
    ];

    render(
      <LanguageProvider initialLang="id">
        <Certificates certificates={mockPublication} />
      </LanguageProvider>
    );

    expect(screen.getByText('IMPLEMENTASI ALGORITMA CNN')).toBeDefined();
    const pubLink = screen.getByRole('link', { name: /Publikasi Ilmiah/i });
    expect(pubLink.getAttribute('href')).toBe('https://doi.org/10.36595/misi.v8i1.1355');
  });
});
