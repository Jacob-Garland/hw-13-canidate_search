import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  envDir: './enviroment',
  plugins: [react()],
  server: {
    port: 5000,
  },
});
