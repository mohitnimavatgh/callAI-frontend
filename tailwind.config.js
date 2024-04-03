/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {},
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'white': '#ffffff',
      'primary': {
        50: '#F3FAF7',
        100: '#DEF7EC',
        200: '#BCF0DA',
        300: '#84E1BC',
        400: '#31C48D',
        500: '#0E9F6E',
        600: '#057A55',
        700: '#046C4E',
        800: '#03543F',
        900: '#014737',
      }
    },
  },
  plugins: [require('flowbite/plugin')],
}

