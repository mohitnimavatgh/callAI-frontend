<template>
  <div class="border-b border-gray-200 dark:border-gray-700">
    <ul class="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
      <li v-for="(menuItem, index) in menuItems" :key="index" class="me-2">
        <a href="#" @click.prevent="handleItemClick(menuItem)" :class="{
          'inline-flex items-center justify-center p-4 rounded-t-lg': true,
          'border-b-2 border-transparent': !menuItem.active,
          'border-b-2 border-primary-500 text-primary-600 dark:border-primary-500 dark:text-primary-500': menuItem.active,
          'active': menuItem.active
        }">
          <i v-if="menuItem.icon" :class="[
            menuItem.icon,
            'me-2 ',
            { 'text-primary-500 dark:text-primary-500': menuItem.active }
          ]"></i>
          {{ menuItem.label }}
        </a>
      </li>
    </ul>
  </div>
</template>
  
  
<script setup lang="ts">
// Import necessary functions from Vue
import { defineProps, defineEmits } from 'vue';

// Define props
const props = defineProps({
  menuItems: {
    type: Array,
    required: true
  }
});

// Define emits
const emit = defineEmits(['change']);

// Method to handle item click
const handleItemClick = (menuItem: any) => {
  emit('change', menuItem);
};
</script>
  
<style scoped>
/* Your component-specific styles */
</style>
  