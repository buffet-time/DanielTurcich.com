import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'node:path'
import legacy from '@vitejs/plugin-legacy'

// Gzip importing
import gzipPlugin from 'rollup-plugin-gzip'

export default defineConfig({
	build: {
		chunkSizeWarningLimit: 150,
		target: 'es2021',
		outDir: './dist',
	},

	plugins: [
		vue(), // Testing to see if this ends up delivering Brotli compression
		gzipPlugin(),

		legacy({
			targets: [
				'baseline widely available',
				'fully supports es6-module-dynamic-import',
				'fully supports dialog',
				'not dead',
			],
		}),
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
