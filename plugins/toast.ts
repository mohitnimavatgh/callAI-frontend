import { createApp } from 'vue';

interface ToastOptions {
  duration?: number;
}

type ShowToastFn = (status: string, message: string, options?: ToastOptions) => void;

export default defineNuxtPlugin(nuxtApp => {
  const showToast: ShowToastFn = async (status, message, options = {}) => {
    try {
      const { default: ToastComponent } = await import('@/components/Toast.vue');

      if (!ToastComponent) {
        throw new Error('Failed to load Toast component');
      }

      const toastApp = createApp(ToastComponent, {
        status,
        message,
        options,
      });

      const toastElement = document.createElement('div');
      document.body.appendChild(toastElement);

      toastApp.mount(toastElement);

      const duration = options.duration || 10000;
      setTimeout(() => {
        toastApp.unmount();
        toastElement.remove();
      }, duration);
    } catch (error) {
      console.error('Error loading Toast component:', error);
    }
  };

  nuxtApp.provide('toast', showToast);
});
