import { defineConfig } from 'vite';
import { resolve } from 'path';
import path from 'node:path';

/**
 * Vite Configuration for Orchard Front-end Test
 * Simple, production-ready configuration with sensible defaults
 */
export default defineConfig({

  // Public directory for static assets
  publicDir: 'src/assets',

  // Build configuration
  build: {
    outDir: 'dist',
    
    // Rollup options for production optimization
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html')
      },
      output: {
        // Organize assets into folders
        assetFileNames: ({ name }) => {
          const ext = path.extname(name);
          // Images
          if (/\.(gif|jpe?g|png|svg)$/.test(ext ?? '')) {
            return 'assets/images/[name]-[hash][extname]';
          }
          // CSS
          if (ext === '.css') {
            return 'assets/css/[name].[hash][extname]';
          }

          // Fonts
          if (/woff2?|eot|ttf|otf/i.test(ext)) {
            return 'assets/fonts/[name].[hash][extname]';
          }
          
          return 'assets/[name].[hash][extname]';
        },
        // JavaScript chunks
        chunkFileNames: 'assets/js/[name].[hash].js',
        entryFileNames: 'assets/js/[name].[hash].js'
      }
    },
    emptyOutDir: true
  },

  // Development server
  server: {
    port: 8080,
    open: true
  },

  // Preview server (for testing production builds)
  preview: {
    port: 8080,
    open: true
  },

  // Path aliases for cleaner imports
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@styles': resolve(__dirname, 'src/styles'),
      '@scripts': resolve(__dirname, 'src/scripts'),
      '@assets': resolve(__dirname, 'src/assets')
    }
  }
});