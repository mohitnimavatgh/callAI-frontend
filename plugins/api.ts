export default defineNuxtPlugin(async (nuxtApp) => {
  const session = {};
  const router = useRouter();
  const $api = $fetch.create({
    baseURL: 'http://192.168.1.13:8000/api/v1',

    onRequest({ request, options }) {
      const token = localStorage.getItem("access_token");
      if (token) {
        options.headers = options.headers || {};
        options.headers.Authorization = `Bearer ${token}`;
      }
    },
    onResponse({ request, response }) {
      return response?._data.data;
    },

    onResponseError({ response }) {
      if (response.status === 401) {
        console.error('Unauthorized request:', response);
        router.push('/login');
      } else if (response.status >= 400) {
        console.error('API error:', response);
      }
    },
  });
  nuxtApp.provide('api', $api);
});
