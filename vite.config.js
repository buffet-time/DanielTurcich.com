import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import eslintPlugin from '@nabla/vite-plugin-eslint'

export default defineConfig({
	plugins: [
		vue({
			isProduction: true
		}),
		eslintPlugin()
	]
})
