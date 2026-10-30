import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Projects from '../src/components/Projects.jsx';
import Certificates from '../src/components/Certificates.jsx';
import About from '../src/components/About.jsx';

describe('Interactive Sections', () => {
  const mockProjects = [
    {
      id: 'p1',
      title: 'EcoSort AI',
      category: 'AI / ML',
      description: 'Waste classification',
      tags: ['PyTorch', 'React'],
      liveUrl: 'https://demo1.com',
      githubUrl: 'https://github.com/demo1',
      image: './assets/ecosortAi.png'
    },
    {
      id: 'p2',
      title: 'EduPredict LMS',
      category: 'Full-Stack',
      description: 'Student prediction',
      tags: ['Node.js', 'React'],
      liveUrl: 'https://demo2.com',
      githubUrl: 'https://github.com/demo2',
      image: './assets/EduPredict.png'
    }
  ];

  const mockCertificates = [
    {
      id: 'c1',
      title: 'DevFest 2023',
      issuer: 'Google',
      year: '2023',
      description: 'DevFest conference',
      image: './assets/devfest 2023.png'
    }
  ];

  it('Projects section filters projects when category tab clicked', async () => {
    render(<Projects projects={mockProjects} />);
    expect(screen.getByText('EcoSort AI')).toBeDefined();
    expect(screen.getByText('EduPredict LMS')).toBeDefined();

    // Click 'AI / ML' category button
    const aiTab = screen.getByRole('button', { name: /AI \/ ML/i });
    fireEvent.click(aiTab);

    expect(screen.getByText('EcoSort AI')).toBeDefined();
    await waitFor(() => {
      expect(screen.queryByText('EduPredict LMS')).toBeNull();
    });
  });

  it('Certificates section renders certificates list', () => {
    render(<Certificates certificates={mockCertificates} />);
    expect(screen.getByText('DevFest 2023')).toBeDefined();
    expect(screen.getByText('Google')).toBeDefined();
  });

  it('About section renders stats and summary', () => {
    const mockAbout = {
      summary: 'Summary test content',
      stats: [{ label: 'Years', value: '2+' }],
      highlights: ['Highlight 1']
    };
    render(<About about={mockAbout} />);
    expect(screen.getByText('Summary test content')).toBeDefined();
    expect(screen.getByText('2+')).toBeDefined();
  });
});
