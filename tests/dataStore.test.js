import { describe, it, expect, beforeEach } from 'vitest';
import { getPortfolioData, savePortfolioDataLocally, resetPortfolioData } from '../src/utils/dataStore.js';

describe('DataStore layer', () => {
  beforeEach(() => {
    // Reset mock localStorage
    globalThis.localStorage = {
      store: {},
      getItem(key) { return this.store[key] || null; },
      setItem(key, value) { this.store[key] = String(value); },
      removeItem(key) { delete this.store[key]; },
      clear() { this.store = {}; }
    };
  });

  it('should return initial portfolio data with profile, projects, skills, certificates', () => {
    const data = getPortfolioData();
    expect(data.profile).toBeDefined();
    expect(data.profile.name).toBe('Zidan Indra Nugraha');
    expect(data.profile.cvPath).toContain('CV_Zidan_Indra_Nugraha_Fullstack.pdf');
    expect(data.profile.figmaDeckUrl).toBe('https://shorturl.at/Wz8De');
    expect(Array.isArray(data.projects)).toBe(true);
    expect(data.projects.length).toBeGreaterThan(0);
    expect(Array.isArray(data.certificates)).toBe(true);
    expect(data.certificates.length).toBeGreaterThan(0);
    expect(data.skills).toBeDefined();
  });

  it('should save and retrieve locally updated portfolio data', () => {
    const initial = getPortfolioData();
    const updated = {
      ...initial,
      profile: { ...initial.profile, headline: 'Updated ML Engineer' }
    };
    savePortfolioDataLocally(updated);
    const retrieved = getPortfolioData();
    expect(retrieved.profile.headline).toBe('Updated ML Engineer');
  });

  it('should reset back to initial bundled data', () => {
    const initial = getPortfolioData();
    savePortfolioDataLocally({ ...initial, profile: { ...initial.profile, headline: 'Temp' } });
    resetPortfolioData();
    const retrieved = getPortfolioData();
    expect(retrieved.profile.name).toBe('Zidan Indra Nugraha');
    expect(retrieved.profile.headline).not.toBe('Temp');
  });
});
