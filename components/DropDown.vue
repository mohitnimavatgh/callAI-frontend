<template>
    <div class="h-full">
      <button @click="toggleDropdown" :class="{'inline-flex items-center text-gray-500 rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700': true, 'focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium border border-gray-300': !image }"  type="button">
        <div v-if="image"> 
            <span class="sr-only">Open user menu</span>
            <img class="w-9 h-9 rounded-full" :src="image" alt="user photo">
        </div>
        <div v-else>
            <span class="sr-only">{{ buttonText }}</span>
            {{ buttonText }}
            <i :class="{ 'transform rotate-180': dropdownOpen }" class="ms-2.5 transition duration-75  fas fa-chevron-down text-xs" ></i>
        </div>
      </button>
      <div v-show="dropdownOpen" class="absolute h-60 overflow-y-auto z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
        <ul class="py-1 text-sm text-gray-700 dark:text-gray-200">
          <li v-for="(action, index) in actions" :key="index" @click="$emit('select', action);">
            <a class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">{{ action.name }}</a>
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      buttonText: {
        type: String,
        default: "Action"
      },
      actions: {
        type: Array,
        default: () => []
      },
      image: {
        type: String,
        default: null
      }
    },
    data() {
      return {
        dropdownOpen: false
      };
    },
    methods: {
      toggleDropdown() {
        this.dropdownOpen = !this.dropdownOpen;
      }
    }
  };
  </script>
  
  <style>
  /* Add any custom styles for the dropdown button component here */
  </style>
  