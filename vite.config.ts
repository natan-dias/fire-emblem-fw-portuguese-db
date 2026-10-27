import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/fire-emblem-fw-portuguese-db/',
  plugins: [react()],
})
