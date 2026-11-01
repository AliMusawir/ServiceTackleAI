import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: false,
    hmr: true,
    watch: {
      usePolling: true,
    },
    proxy: {
      // Forward all /api requests to the PHP built-in server
      // Run: php -S localhost:8080 -t . (from project root)
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'esbuild',
  },
});
