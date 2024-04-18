/** @type {import('tailwindcss').Config} */
// module.exports = {
//   darkMode: 'class',
// }
module.exports = {
  darkMode: 'class',
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
      },
      // # blue color primary
      // 'primary': {
      //   50: '#EBF5FF',
      //   100: '#E1EFFE',
      //   200: '#C3DDFD',
      //   300: '#A4CAFE',
      //   400: '#76A9FA',
      //   500: '#3F83F8',
      //   600: '#1C64F2',
      //   700: '#1A56DB',
      //   800: '#1E429F',
      //   900: '#233876',
      // }
    },
  },
  plugins: [require('flowbite/plugin')],
}

