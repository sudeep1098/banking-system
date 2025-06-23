import path from "path";
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: { '@': path.resolve(__dirname, 'src') },
  },
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: assetInfo => {
          const name = assetInfo.name ?? '';
          if (/\.(png|jpe?g|gif|svg|webp)$/.test(name)) {
            return `assets/images/[name][extname]`;
          }
          return `assets/css/[name]-[hash][extname]`;
        },
        chunkFileNames: chunk => {
          const groups = ['react', 'mui', 'recharts', 'lucide-react'];
          for (const g of groups) {
            if (chunk.name?.startsWith(g)) return `assets/js/${chunk.name}.js`;
          }
          return `assets/js/${chunk.name}-[hash].js`;
        },
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        }
      }
    }
  }
});
