import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
	root: './src',

	build: {
		chunkSizeWarningLimit: 2068, // the size of acronymWords.json

		rollupOptions: {
			maxParallelFileReads: 512,
			output: {
				generatedCode: {
					preset: 'es2015'
				}
			}
		},

		outDir: '../dist'
	},

	server: {
		port: 8086,
		fs: {
			allow: ['..']
		}
	},

	plugins: [
		vue({
			isProduction: true
		})
	]
})
