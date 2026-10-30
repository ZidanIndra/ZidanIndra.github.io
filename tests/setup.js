import { MotionGlobalConfig } from 'framer-motion';

MotionGlobalConfig.skipAnimations = true;

// Mock IntersectionObserver for JSDOM / Framer Motion
globalThis.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  unobserve() {}
  takeRecords() { return []; }
};
