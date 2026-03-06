import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    base: '/voice-leading-fretboard/',
    plugins: [react()],
    test: {
        environment: 'jsdom',
        globals: true,
    }
})
