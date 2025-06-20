import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  server: {
    allowedHosts: ['2f1b-2402-800-6388-fa3-1c62-dd04-8053-b0b0.ngrok-free.app']
  }
})  
