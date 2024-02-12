import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'https://zany-adventure-vr7pwrvvvvfx6xx-3000.app.github.dev',
        secure: false,
      },
    }
  },
  plugins: [react()],
})
