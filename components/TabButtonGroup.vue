<template>
    <div class="inline-flex rounded-md shadow-sm" role="group">

      <button
        v-for="(item, index) in items"
        :key="index"
        :class="{
          // 'bg-primary-100 text-primary-500': activeIndex === index,
          'border border-primary-300 text-primary-500 shadow-md': activeIndex === index,
          'inline-flex items-center px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-200 hover:bg-gray-100 hover:text-primary-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-primary-500 dark:focus:text-white': true,
          'rounded-s-lg': index === 0,
          'rounded-e-lg': index === items.length - 1,
        }"
        type="button"
        @click="handleClick(item, index)"
      >
      <i v-if="item.icon" :class="item.icon" class="me-2" ></i>
        {{ item.label }}
      </button>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      items: {
        type: Array,
        required: true
      }
    },
    data() {
      return {
        activeIndex: 0
      };
    },
    methods: {
      handleClick(item, index) {
        this.activeIndex = index;
        this.$emit('tab-click', item);
      }
    }
  };
  </script>
  
  <style scoped>
  /* Define active button style */
  .active {
    background-color: #4a90e2; /* Change to your desired active background color */
    color: white; /* Change to your desired active text color */
  }
  </style>
  