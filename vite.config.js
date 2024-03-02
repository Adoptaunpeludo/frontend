import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';

import path from 'path';
const __dirname = path.dirname(new URL(import.meta.url).pathname);


// https://vitejs.dev/config/
export default defineConfig({
  
  plugins: [react(), svgr()],
  resolve: {
      alias: {
        '@assets': path.resolve(__dirname, './src/assets'),
        '@pages': path.resolve(__dirname, './src/pages'),
        '@Layout': path.resolve(__dirname, './src/pages/Layout'),
        '@shared': path.resolve(__dirname, './src/pages/shared'),
      },
  },
});

