import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['assets/favicon.svg','assets/luma.svg'],
      manifest: {
        name: 'Loma_Application',
        short_name: 'Loma',
        description: 'Application éducative pastel (Lecture • Français • Maths)',
        theme_color: '#fef9c3',
        background_color: '#fef9c3',
        icons: [
          { src: 'assets/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'assets/icon-512.png', sizes: '512x512', type: 'image/png' }
        ]
      }
    })
  ],
  server: { port: 5173 }
})
