import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
	build: {
		chunkSizeWarningLimit: 100,
		target: 'es2021',

		rollupOptions: {
			maxParallelFileOps: 512
		},

		outDir: './dist'
	},

	plugins: [vue()],
	resolve: {
		alias: {
			'#root': resolve(__dirname),
			'#assets': resolve(__dirname, './src/assets'),
			'#types': resolve(__dirname, './src/types/Typings.ts')
		}
	}
})
