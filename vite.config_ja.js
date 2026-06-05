import { defineConfig } from 'vite'
import { viteSingleFile } from 'vite-plugin-singlefile'

export default defineConfig({
  plugins: [viteSingleFile()],
  root: 'src',
  build: {
    outDir: '../dist_ja',
    emptyOutDir: true,
    target: 'es2022',
    rollupOptions: {
      input: 'src/EasyReply_JP.html'
    }
  }
})
