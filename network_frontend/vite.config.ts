import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import WindiCSS from 'vite-plugin-windicss';
const path = require('path');

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
  },
  server: {
    port: 8080,
  },
  plugins: [vue(), ...WindiCSS(), VitePWA()],
});
