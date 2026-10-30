import initialData from '../data/portfolioData.json';

const STORAGE_KEY = 'zidan_portfolio_custom_data_v1';

function getStorage() {
  if (typeof window !== 'undefined' && window.localStorage) {
    return window.localStorage;
  }
  if (typeof globalThis !== 'undefined' && globalThis.localStorage) {
    return globalThis.localStorage;
  }
  return null;
}

export function getPortfolioData() {
  const storage = getStorage();
  if (storage) {
    try {
      const stored = storage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed && parsed.profile && parsed.projects) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Failed to read custom portfolio data from storage:', e);
    }
  }
  return initialData;
}

export function savePortfolioDataLocally(data) {
  const storage = getStorage();
  if (storage) {
    storage.setItem(STORAGE_KEY, JSON.stringify(data));
  }
}

export function resetPortfolioData() {
  const storage = getStorage();
  if (storage) {
    storage.removeItem(STORAGE_KEY);
  }
}
