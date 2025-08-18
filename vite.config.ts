import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import { fileURLToPath, URL } from 'url'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./", import.meta.url)),
      "figma:asset": fileURLToPath(new URL("./src/assets", import.meta.url))
    },
  },
  server: {
    port: 3000,
    open: true
  },
  build: {
    // Make the build more portable for GitHub Pages
    rollupOptions: {
      output: {
        // Ensure consistent file names for easier deployment
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]'
      }
    },
    // Generate source maps for easier debugging
    sourcemap: false, // Disable for production
    // Optimize for static deployment
    target: 'esnext',
    minify: 'esbuild',
    // Ensure all assets are included in the build
    assetsInlineLimit: 4096
  },
  // Configure for GitHub Pages deployment
  base: process.env.NODE_ENV === 'production' ? '/Varenizer-test2/' : '/',
  assetsInclude: ['**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.gif', '**/*.svg']
})