import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
    plugins: [react()],
    base: process.env.NETLIFY ? '/' : '/invat-cu-glume/',
    build: {
        rollupOptions: {
            external: [
                'react',
                'react-dom',
                'react-router-dom'
            ]
        }
    }
})