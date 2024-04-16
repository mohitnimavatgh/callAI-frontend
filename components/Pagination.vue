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

      <!-- Display pages -->
      <template v-if="currentPage >= visiblePageCount">
        <li>
          <a href="#" @click.prevent="navigateToPage(1)" :class="[pageItemClasses, { 'text-primary-500 bg-gray-100 dark:text-primary-500': currentPage === 1, 'text-gray-500': currentPage !== 1 }]">1</a>
        </li>
        <li v-if="currentPage > visiblePageCount + 3">
          <span class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500" :class="pageItemClasses">...</span>
        </li>
      </template>
      <template v-for="page in getVisiblePages()" :key="page">
        <li>
          <a href="#" @click.prevent="navigateToPage(page)" :class="[pageItemClasses, { 'text-primary-500 bg-gray-100 dark:text-primary-500': currentPage === page, 'text-gray-500': currentPage !== page }]">{{ page }}</a>
        </li>
      </template>
      <li v-if="currentPage < totalPage - visiblePageCount - 2 && totalPage > visiblePageCount + 1">
        <span class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500" :class="pageItemClasses">...</span>
      </li>
      <li v-if="currentPage < totalPage - 3 && totalPage > visiblePageCount + 3">
        <a href="#" @click.prevent="navigateToPage(totalPage)" :class="[pageItemClasses, { 'text-primary-500 bg-gray-100 dark:text-primary-500': currentPage === totalPage, 'text-gray-500': currentPage !== totalPage }]">{{ totalPage }}</a>
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

<script setup>
import { defineProps, defineEmits, computed } from 'vue';

const props = defineProps({
  totalRecords: {
    type: Number,
    required: true
  },
  currentPage: {
    type: Number,
    required: true
  },
  recordsPerPage: {
    type: Number,
    required: true
  }
});


const totalPage = computed(() => Math.ceil(props.totalRecords / props.recordsPerPage));

const emit = defineEmits(['page-change']);

function navigateToPage(page) {
  emit('page-change', page);
}

const visiblePageCount = 5; // Number of pages to display before and after the current page

function getVisiblePages() {
  let start, end;
  if (totalPage.value <= visiblePageCount) {
    start = 1;
    end = totalPage.value;
  } else if (props.currentPage <= Math.ceil(visiblePageCount / 2)) {
    start = 1;
    end = visiblePageCount;
  } else if (props.currentPage >= totalPage.value - Math.floor(visiblePageCount / 2)) {
    start = totalPage.value - visiblePageCount + 1;
    end = totalPage.value;
  } else {
    start = props.currentPage - Math.floor(visiblePageCount / 2);
    end = start + visiblePageCount - 1;
  }
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}

// Computed property for CSS classes
const pageItemClasses = computed(() => {
  return {
    'flex': true,
    'items-center': true,
    'justify-center': true,
    'px-3': true,
    'h-8': true,
    'leading-tight': true,
    'bg-white': true,
    'border': true,
    'border-gray-300': true,
    'hover:bg-gray-100': true,
    'hover:text-gray-700': true,
    'dark:bg-gray-800': true,
    'dark:border-gray-700': true,
    'dark:text-gray-400': true,
    'dark:hover:bg-gray-700': true,
    'dark:hover:text-white': true
  };
});
</script>