import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    coverage: {
      exclude: [
        'src/components/ErrorBoundary/**',
        'src/shared/data/**',
        'src/components/MockService/**',
      ],
    },
  },
});
