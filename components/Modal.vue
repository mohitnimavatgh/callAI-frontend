<template>
    <!-- Main modal -->
    <div v-if="show" class="fixed top-0 right-0 left-0 bottom-0 z-50 flex justify-center items-center">
      <div class="fixed top-0 right-0 left-0 bottom-0 bg-gray-500 opacity-50"></div>
      <div class="relative p-4 w-full max-w-md max-h-full">
        <!-- Modal content -->
        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <!-- Modal header -->
          <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">{{ title }}</h3>
            <button @click="closeModal" type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="crud-modal">
              <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
              </svg>
              <span class="sr-only">Close modal</span>
            </button>
          </div>
          
            <slot></slot>
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
      }
    },
    methods: {
      closeModal() {
        this.$emit('close');
      },
      submitForm() {
        // Handle form submission logic
        console.log('Form submitted with data:', this.formData);
        // You can add further logic here, such as sending data to server
        // Reset form data if needed
        this.formData = {
          name: '',
          // Reset other form fields as well
        };
        // Close modal after submission if desired
        this.show = false;
      }
    }
  };
  </script>
  
  <style>
  /* Add your styles here if needed */
  </style>
  