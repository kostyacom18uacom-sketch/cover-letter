/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Mont', 'sans-serif'],
        handjet: ['Handjet', 'sans-serif'],
        mont: ['Mont', 'sans-serif'],
      },
      colors: {
        accent: {
          DEFAULT: '#4F46E5',
          hover: '#4338CA',
        },
        'card-bg': '#ECDFFF',
        heading: '#181655',
        'body-text': '#494B80',
        'arrow-bg': '#C7CDFF',
        'arrow-icon': '#2A2D65',
        indicator: '#494B80',
        'button-bg': '#C7CDFF',
        'button-text': '#2A2D65',
      },
    },
  },
  plugins: [],
}
