module.exports = {
	env: {
		browser: true,
		es6: true,
		node: true
	},
	extends: [
		'plugin:@typescript-eslint/recommended',
		'plugin:@typescript-eslint/recommended-requiring-type-checking',
		'prettier',
		'prettier/@typescript-eslint'
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		project: 'tsconfig.json',
		sourceType: 'module'
	},
	plugins: [
		'eslint-plugin-import',
		'eslint-plugin-jsdoc',
		'eslint-plugin-prefer-arrow',
		'eslint-plugin-react',
		'@typescript-eslint',
		'@typescript-eslint/tslint'
	],
	rules: {
		'@typescript-eslint/adjacent-overload-signatures': 'warn',
		'@typescript-eslint/array-type': [
			'warn',
			{
				default: 'array-simple'
			}
		],
		'@typescript-eslint/ban-types': [
			'warn',
			{
				types: {
					Object: {
						message: 'Avoid using the `Object` type. Did you mean `object`?'
					},
					Function: {
						message:
							'Avoid using the `Function` type. Prefer a specific function type, like `() => void`.'
					},
					Boolean: {
						message: 'Avoid using the `Boolean` type. Did you mean `boolean`?'
					},
					Number: {
						message: 'Avoid using the `Number` type. Did you mean `number`?'
					},
					String: {
						message: 'Avoid using the `String` type. Did you mean `string`?'
					},
					Symbol: {
						message: 'Avoid using the `Symbol` type. Did you mean `symbol`?'
					}
				}
			}
		],
		'@typescript-eslint/consistent-type-assertions': 'warn',
		'@typescript-eslint/consistent-type-definitions': 'warn',
		'@typescript-eslint/dot-notation': 'warn',
		'@typescript-eslint/explicit-member-accessibility': [
			'warn',
			{
				accessibility: 'explicit'
			}
		],

		'@typescript-eslint/explicit-module-boundary-types': 'off',
		'@typescript-eslint/indent': ['warn', 'tab'],
		'@typescript-eslint/member-delimiter-style': [
			'warn',
			{
				multiline: {
					delimiter: 'none',
					requireLast: true
				},
				singleline: {
					delimiter: 'semi',
					requireLast: false
				}
			}
		],
		'@typescript-eslint/member-ordering': 'warn',
		'@typescript-eslint/naming-convention': 'off',
		'@typescript-eslint/no-empty-function': 'warn',
		'@typescript-eslint/no-empty-interface': 'warn',
		'@typescript-eslint/no-explicit-any': 'off',
		'@typescript-eslint/no-misused-new': 'warn',
		'@typescript-eslint/no-namespace': 'warn',
		'@typescript-eslint/no-parameter-properties': 'off',
		'@typescript-eslint/no-unused-expressions': 'warn',
		'@typescript-eslint/no-use-before-define': 'off',
		'@typescript-eslint/no-var-requires': 'warn',
		'@typescript-eslint/prefer-for-of': 'warn',
		'@typescript-eslint/prefer-function-type': 'warn',
		'@typescript-eslint/prefer-namespace-keyword': 'warn',
		'@typescript-eslint/quotes': ['warn', 'single'],
		'@typescript-eslint/semi': ['warn', 'never'],
		'@typescript-eslint/no-inferrable-types': [true, true],
		'@typescript-eslint/triple-slash-reference': [
			'warn',
			{
				path: 'always',
				types: 'prefer-import',
				lib: 'always'
			}
		],
		'@typescript-eslint/type-annotation-spacing': 'off',
		'@typescript-eslint/unified-signatures': 'warn',
		'arrow-body-style': 'warn',
		'arrow-parens': ['off', 'always'],
		'brace-style': ['off', 'off'],
		'comma-dangle': 'warn',
		complexity: 'off',
		'constructor-super': 'warn',
		curly: 'warn',
		'eol-last': 'off',
		eqeqeq: ['warn', 'smart'],
		'guard-for-in': 'warn',
		'id-blacklist': [
			'warn',
			'any',
			'Number',
			'number',
			'String',
			'string',
			'Boolean',
			'boolean',
			'Undefined',
			'undefined'
		],
		'id-match': 'warn',
		'import/order': 'warn',
		'jsdoc/check-alignment': 'warn',
		'jsdoc/check-indentation': 'warn',
		'jsdoc/newline-after-description': 'warn',
		'linebreak-style': 'off',
		'max-classes-per-file': 'off',
		'max-len': 'off',
		'new-parens': 'off',
		'newline-per-chained-call': 'off',
		'no-bitwise': 'warn',
		'no-caller': 'warn',
		'no-cond-assign': 'warn',
		'no-console': 'off',
		'no-debugger': 'warn',
		'no-empty': 'warn',
		'no-eval': 'warn',
		'no-extra-semi': 'off',
		'no-fallthrough': 'off',
		'no-invalid-this': 'off',
		'no-irregular-whitespace': 'off',
		'no-multiple-empty-lines': 'warn',
		'no-new-wrappers': 'warn',
		'no-shadow': [
			'warn',
			{
				hoist: 'all'
			}
		],
		'no-throw-literal': 'warn',
		'no-trailing-spaces': 'off',
		'no-undef-init': 'warn',
		'no-underscore-dangle': 'warn',
		'no-unsafe-finally': 'warn',
		'no-unused-labels': 'warn',
		'no-var': 'warn',
		'object-shorthand': 'warn',
		'one-var': ['warn', 'never'],
		'prefer-arrow/prefer-arrow-functions': 'warn',
		'prefer-const': 'warn',
		'quote-props': 'off',
		radix: 'warn',
		'react/jsx-curly-spacing': 'off',
		'react/jsx-equals-spacing': 'off',
		'react/jsx-wrap-multilines': 'off',
		'space-before-function-paren': 'off',
		'space-in-parens': ['off', 'never'],
		'spaced-comment': [
			'warn',
			'always',
			{
				markers: ['/']
			}
		],
		'use-isnan': 'warn',
		'valid-typeof': 'off',
		'@typescript-eslint/tslint/config': [
			'error',
			{
				rules: {
					defaultSeverity: true,
					prettier: true
				}
			}
		]
	}
}
