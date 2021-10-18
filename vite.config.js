import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
	root: './src',

	build: {
		chunkSizeWarningLimit: 2068, // the size of acronymWords.json

		rollupOptions: {
			maxParallelFileReads: 512,
			output: {
				minifyInternalExports: true,
				generatedCode: {
					arrowFunctions: true,
					constBindings: true,
					objectShorthand: true,
					preset: 'es2015'
				}
			}
		},

		terserOptions: {
			ecma: 2018,
			module: true,
			toplevel: true
		}
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
