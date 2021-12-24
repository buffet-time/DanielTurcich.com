module.exports = {
	content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
	theme: {
		extend: {
			keyframes: {
				'wipe-down': {
					'0%': { height: 0 },
					'100%': { height: 500 }
				}
			}
		}
	},
	plugins: []
}
