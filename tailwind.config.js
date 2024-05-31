/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			colors: {
				gray: {
					light: '#F7F7F7',
					DEFAULT: '#888888',
					overlay: 'rgba(116, 116, 116, 0.4)',
				},
			},
		},
		container: {
			center: true,
			padding: '1.5rem',
		},
		fontFamily: {
			sans: `"nb", ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"`,
		},
	},
	plugins: [],
};
