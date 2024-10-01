import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'node:path'

// @ts-expect-error
import { minify } from 'rollup-plugin-swc-minify'

// Gzip importing
import gzipPlugin from 'rollup-plugin-gzip'

export default defineConfig({
	build: {
		chunkSizeWarningLimit: 150,
		target: 'es2021',

		rollupOptions: {
			maxParallelFileOps: 512,
			plugins: [minify()],
		},

		outDir: './dist',
	},

	plugins: [
		vue(), // Testing to see if this ends up delivering Brotli compression
		gzipPlugin(),
	],
	resolve: {
		alias: {
			'#root': resolve(__dirname),
			'#assets': resolve(__dirname, './src/assets'),
			'#types': resolve(__dirname, './src/types/Typings.ts'),
			'#stores': resolve(__dirname, './src/stores'),
		},
	},
})
