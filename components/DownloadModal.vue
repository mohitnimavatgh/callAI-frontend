<template>
  <div v-if="show" class="fixed top-0 right-0 left-0 bottom-0 z-50 flex justify-center items-center">
    <div class="fixed top-0 right-0 left-0 bottom-0 bg-gray-500 opacity-50"></div>
    <div class="relative p-4 w-full max-w-md max-h-full">
      <div class="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800">
        <div
          class="flex items-center justify-between border-b border-gray-500 pb-1 md:px-3 rounded-t dark:border-gray-600">
          <div>
            <h4 class="text-lg font-semibold text-gray-600 dark:text-white">{{ title }}</h4>
            <p class="text-xs font-normal text-gray-500 mt-0.5">{{ subTitle }}</p>
          </div>
          <button @click="closeModal" type="button"
            class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            data-modal-toggle="crud-modal">
            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
            </svg>
            <span class="sr-only">Close modal</span>
          </button>
        </div>
        <div class="p-4">
          <div class="overflow-y-auto max-h-96">
            <p v-html="data.replace(/\n/g, '<br />')"></p>
          </div>
        </div>
        <div class="border-t pt-3 md:px-3 border-gray-500">
          <Button text="Download" @click="downloadTranscript" />
        </div>
      </div>
    </div>
  </div>
</template>
  
<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: true
    },
    title: {
      type: String,
      default: ''
    },
    subTitle: {
      type: String,
      default: ''
    },
    data: {
      type: String,
      default: ''
    }
  },
  methods: {
    closeModal() {
      this.$emit('close');
    },
    downloadTranscript() {
      if (this.data.length) {
        const chatString = this.data;

        // Create a blob from the string
        const blob = new Blob([chatString], { type: 'text/plain' });

        // Create a link element
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'chat.txt';

        // Append the link to the body
        document.body.appendChild(link);

        // Trigger the download
        link.click();

        // Clean up
        document.body.removeChild(link);
      }
    }
  }
};
</script>
  
<style>
/* Add your styles here if needed */
</style>
  