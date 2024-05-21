// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr:true,
  devtools: { enabled: true },
  css: ['~/assets/css/main.css', '~/assets/css/global.css', '@fortawesome/fontawesome-free/css/all.css'],
  modules: [
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    'nuxt-vue3-google-signin'
  ],
  plugins: [
    '~/plugins/api',
  ],
  googleSignIn: {
    clientId: import.meta.env.GOOGLE_CLIENT_ID,
  },
  devServer: {
      host: ' 192.168.1.18',
      port: '3000'
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  router: {
    extendRoutes(routes : any) {
      routes.push({
        path: '/',
        redirect: '/call-ai'
      })
    }
  },
  // runtimeConfig: {
  //   public: {
  //     API_BASE_URL: 'http://192.168.1.16:8000/api', 
  //   },
  // }
})