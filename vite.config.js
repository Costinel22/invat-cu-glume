import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
    plugins: [react()],
    base: process.env.NODE_ENV === 'production' ?
        '/NUME_REPO/' // Pentru GitHub Pages
        :
        '/', // Pentru Netlify/development
    build: {
        rollupOptions: {
            external: [
                // Adaugă module pe care vrei să le excludem din bundle
                'react',
                'react-dom',
                'react-router-dom'
            ]
        }
    }
})