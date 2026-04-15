import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), babel({ presets: [reactCompilerPreset()] })],
  server: {
    port: 5173, // Se especifica el puerto para desarrollo
    open: true,
    host: true,
  },
  preview: {
    port: 8080, // Se especifica el puerto para producción local
  },
})
