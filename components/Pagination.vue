<template>
    <nav aria-label="Page navigation example">
      <ul class="flex items-center -space-x-px h-8 text-sm">
        <!-- Previous page button -->
        <li v-if="currentPage > 1">
          <a href="#" @click.prevent="navigateToPage(currentPage - 1)" class="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
            <span class="sr-only">Previous</span>
            <svg class="w-2.5 h-2.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 1 1 5l4 4"/>
            </svg>
          </a>
        </li>
  
        <li v-for="page in totalPage" :key="page">
          <a href="#" @click.prevent="navigateToPage(page)" :class="['flex', 'items-center', 'justify-center', 'px-3', 'h-8', 'leading-tight', {'text-primary-500 bg-primary-100': currentPage === page, 'text-gray-500': currentPage !== page}, 'bg-white', 'border', 'border-gray-300', 'hover:bg-gray-100', 'hover:text-gray-700', 'dark:bg-gray-800', 'dark:border-gray-700', 'dark:text-gray-400', 'dark:hover:bg-gray-700', 'dark:hover:text-white']">{{ page }}</a>
        </li>
  
        <li v-if="currentPage < totalPage">
          <a href="#" @click.prevent="navigateToPage(currentPage + 1)" class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
            <span class="sr-only">Next</span>
            <svg class="w-2.5 h-2.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
            </svg>
          </a>
        </li>
      </ul>
    </nav>
  </template>
  
  <script>
  export default {
    props: {
      totalPage: {
        type: Number,
        required: true
      },
      currentPage: {
        type: Number,
        required: true
      }
    },
    methods: {
      navigateToPage(page) {
        // Emit an event to parent component to change the page
        this.$emit('page-change', page);
      }
    }
  };
  </script>
  
  <style scoped>
  /* Your component-specific styles */
  </style>
  