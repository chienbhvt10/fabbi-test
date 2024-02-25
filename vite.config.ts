import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    build: {
        outDir: 'build', // Specify the output directory
        assetsDir: 'assets', // Specify the directory for assets (like images, fonts, etc.)
        rollupOptions: {
            // Output options for Rollup
            output: {
                // Customize the name of the output file
                entryFileNames: '[name]-[hash].js',
                chunkFileNames: '[name]-[hash].js',
                assetFileNames: '[name]-[hash].[ext]',
            },
        },
    },
});
