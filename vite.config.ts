import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
	build: {
		chunkSizeWarningLimit: 100,
		target: 'es2021',

		rollupOptions: {
			maxParallelFileOps: 512
		},

		outDir: './dist'
	},

	plugins: [vue()]
})
