<template>
    <div :id="toastId" class="toast fixed flex items-center w-full max-w-xs p-4 space-x-4 text-gray-500 bg-white divide-x rtl:divide-x-reverse divide-gray-200 rounded-lg shadow top-5 left-5 dark:text-gray-400 dark:divide-gray-700 space-x dark:bg-gray-800" role="alert">
        <div class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200">
            <i class="fas fa-check" />
            <span class="sr-only">Check icon</span>
        </div>
        <div class="ms-3 text-sm font-normal">{{ message }}</div>
        <i @click="dismissToast" class="fas fa-close ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" />
    </div>
  </template>
  
  <script>
  export default {
    props: {
      status: {
        type: String,
        required: true,
        validator: value => ['success', 'danger', 'warning'].includes(value)
      },
      message: {
        type: String,
        required: true
      }
    },
    computed: {
      toastId() {
        return `toast-${this.status}`;
      },
      color() {
        return this.status === 'success' ? 'green' : this.status === 'danger' ? 'red' : 'orange';
      }
    },
    methods: {
      dismissToast() {
        document.getElementById(this.toastId).remove();
      }
    }
  };
  </script>
<style>
.toast {
    z-index: 50;
}
</style>