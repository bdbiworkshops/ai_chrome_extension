import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react(), // Use the React plugin to handle React files
  ],
  build: {
    outDir: 'dist', // Specify the output directory for the build files
    rollupOptions: {
      input: {
        background: 'src/background.ts', // Entry point for the background script
        content: 'src/content.ts', // Entry point for the content script
        popup: 'index.html' // Entry point for the popup HTML file
      },
      output: {
        entryFileNames: '[name].js', // Naming pattern for the output files
        format: 'esm' // Output format as ES modules
      }
    }
  }
});

// ES modules are the default output format for Vite, which is why we don't need to specify it in the build configuration. 