import react from '@vitejs/plugin-react';
import { glob } from 'glob';
import { extname, relative, resolve } from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [react(), dts({ include: ['lib'] })],
  build: {
    lib: {
      entry: resolve(__dirname, 'lib/main.ts'),
      formats: ['es']
    },
    copyPublicDir: false,
    rollupOptions: {
      external: [
        'react',
        'react-dom',
        'react/jsx-runtime',
        /^@mui.*/,
        /^@emotion.*/,
      ],
      input: Object.fromEntries(
        glob
          .sync('lib/**/*.{ts,tsx}')
          .map((file: any) => [
            relative('lib', file.slice(0, file.length - extname(file).length)),
            fileURLToPath(new URL(file, import.meta.url))
          ])
      ),
      output: {
        assetFileNames: 'assets/[name][extname]',
        entryFileNames: '[name].js'
      }
    }
  }
})
