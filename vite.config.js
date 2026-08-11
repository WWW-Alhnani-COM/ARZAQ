import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Vite configuration for ARZAQ (أرزاق) — React SPA, Firebase-backed.
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
  },
});
