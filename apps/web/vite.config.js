import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Vite builds the SPA into dist/ (embr.yaml -> static.build.outputDirectory: dist),
// which Embr uploads to the CDN. Assets land in dist/assets/ (auto-detected as immutable).
export default defineConfig({
  plugins: [react()],
});
