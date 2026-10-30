import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('Project Configuration', () => {
  it('should have package.json with required dependencies and scripts', () => {
    const pkgPath = path.resolve(process.cwd(), 'package.json');
    expect(fs.existsSync(pkgPath)).toBe(true);
    const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));
    expect(pkg.scripts).toBeDefined();
    expect(pkg.scripts.build).toBeDefined();
    expect(pkg.dependencies.react).toBeDefined();
    expect(pkg.dependencies['lucide-react']).toBeDefined();
    expect(pkg.dependencies['framer-motion']).toBeDefined();
  });

  it('should have vite.config.js with base url configured for GitHub Pages', () => {
    const viteConfigPath = path.resolve(process.cwd(), 'vite.config.js');
    expect(fs.existsSync(viteConfigPath)).toBe(true);
    const content = fs.readFileSync(viteConfigPath, 'utf-8');
    expect(content).toContain("base: './'");
  });
});
