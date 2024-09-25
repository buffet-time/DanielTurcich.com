/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import vue from 'eslint-plugin-vue'
import typescriptEslint from '@typescript-eslint/eslint-plugin'
import prettier from 'eslint-plugin-prettier'
import globals from 'globals'
import parser from 'vue-eslint-parser'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import js from '@eslint/js'
import { FlatCompat } from '@eslint/eslintrc'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const compat = new FlatCompat({
	baseDirectory: __dirname,
	recommendedConfig: js.configs.recommended,
	allConfig: js.configs.all
})

export default [
	{
		ignores: ['src/assets/*', 'dist/*', '**/acronymWords.json', '**/index.html']
	},
	...compat.extends(
		'prettier',
		'eslint:recommended',
		'plugin:vue/vue3-recommended',
		'@vue/typescript/recommended',
		'plugin:@typescript-eslint/recommended-type-checked',
		'plugin:@typescript-eslint/stylistic-type-checked'
	),
	{
		plugins: {
			vue,
			'@typescript-eslint': typescriptEslint,
			prettier
		},

		languageOptions: {
			globals: {
				...globals.browser
			},

			parser: parser,
			ecmaVersion: 'latest',
			sourceType: 'module',

			parserOptions: {
				parser: '@typescript-eslint/parser',
				project: true
			}
		},

		rules: {
			'no-fallthrough': 'off',
			'prefer-const': 'error',
			'no-mixed-spaces-and-tabs': 'off',
			'prettier/prettier': 'error',
			'vue/max-attributes-per-line': 'off',
			'vue/html-indent': 'off',
			'vue/html-self-closing': 'off',
			'vue/singleline-html-element-content-newline': 'off',
			'vue/multi-word-component-names': 'off',
			'@typescript-eslint/no-extra-semi': 'off',
			'@typescript-eslint/no-explicit-any': 'off',
			'@typescript-eslint/ban-ts-comment': 'off'
		}
	}
]
