import { useFetch, useNuxtApp } from 'nuxt/app';

export function useAPI<T>(
  url: string | (() => string),
  options: Omit<UseFetchOptions<T>, 'default'> & { default?: () => T | Ref<T> },
) {
  return useFetch(url, {
    ...options,
    default: options.default, // Pass default property directly to useFetch
    $fetch: useNuxtApp().$api
  })
}
