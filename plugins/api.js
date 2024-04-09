// export default defineNuxtPlugin(() => {
//   const baseUrl = 'https://your-default-api.com'
// console.log('$fetch', $fetch.defaults)
//   $fetch.defaults.baseURL = baseUrl
// })
export default defineNuxtPlugin(() => {
    $fetch.interceptors.request.use(
      (config) => {
        const baseUrl = process.env.BASE_URL
        if (baseUrl) {
          config.url = `<span class="math-inline">\{baseUrl\}</span>{config.url}`
        }
        return config
      },
      (error) => {
        // Handle errors if needed
        return Promise.reject(error)
      }
    )
  })