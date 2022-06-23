import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
	root: './src',
	base: './',

	build: {
		chunkSizeWarningLimit: 2068, // the size of acronymWords.json

		rollupOptions: {
			maxParallelFileReads: 512
		},

		outDir: '../dist'
	},

	plugins: [
		vue({
			isProduction: true
		})
	]
})
