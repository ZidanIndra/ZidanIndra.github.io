import React from 'react';
import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Footer from '../src/components/Footer.jsx';
import AdminCMS from '../src/components/AdminCMS.jsx';
import Navbar from '../src/components/Navbar.jsx';
import { LanguageProvider } from '../src/context/LanguageContext.jsx';

describe('V3 Modifications', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('Footer does not render Admin link button', () => {
    const mockProfile = { linkedin: 'https://linkedin.com', github: 'https://github.com' };
    render(
      <LanguageProvider>
        <Footer profile={mockProfile} />
      </LanguageProvider>
    );

    expect(screen.queryByRole('link', { name: /Admin/i })).toBeNull();
  });

  it('AdminCMS requires new default password #Zidanindra990', () => {
    render(<AdminCMS onExit={() => {}} />);

    const input = screen.getByPlaceholderText(/Password \(Default: #Zidanindra990\)/i);
    const submitBtn = screen.getByRole('button', { name: /Buka CMS/i });

    // Wrong password
    fireEvent.change(input, { target: { value: '123456' } });
    fireEvent.click(submitBtn);
    expect(screen.getByText(/Password salah/i)).toBeDefined();

    // Correct password
    fireEvent.change(input, { target: { value: '#Zidanindra990' } });
    fireEvent.click(submitBtn);

    // Should now enter CMS dashboard
    expect(screen.getByText(/Zidan Portfolio CMS/i)).toBeDefined();
  });

  it('Navbar renders brand image and opens CV modal upon clicking CV button', () => {
    render(
      <LanguageProvider>
        <Navbar cvPath="./assets/CV_Zidan_Indra_Nugraha_Fullstack.pdf" />
      </LanguageProvider>
    );

    // Brand image
    const brandImg = screen.getByAltText('Zidan Indra Brand');
    expect(brandImg).toBeDefined();
    expect(brandImg.getAttribute('src')).toBe('./assets/brand image.png');

    // Click CV button
    const cvBtn = screen.getByRole('link', { name: /(Download CV|Unduh CV)/i });
    fireEvent.click(cvBtn);

    // CV Modal should appear
    expect(screen.getByText(/Curriculum Vitae/i)).toBeDefined();
    expect(screen.getByTitle('Curriculum Vitae Preview')).toBeDefined();

    // Close CV modal
    const closeBtn = screen.getByRole('button', { name: /Close modal/i });
    fireEvent.click(closeBtn);
  });
});
