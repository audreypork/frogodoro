/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        jersey10: ['"Jersey 10"', 'sans-serif'],
        jersey25: ['"Jersey 25"', 'sans-serif'],
      },
      colors: {
        salmon: '#f9cec8',
        panel: '#ffedeb',
        'timer-bg': '#f8e1dd',
        'btn-green': '#dbeaa3',
        'food-icon-bg': '#eec6c0',
        'dot-green': '#92bd51',
        'dot-pink': '#efc7c1',
        dark: '#1d1d1d',
      },
    },
  },
  plugins: [],
}
