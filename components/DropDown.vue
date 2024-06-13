<template>
  <div class="h-full relative" ref="dropdown">
    <button @click="toggleDropdown"
      :class="{ 'inline-flex items-center text-gray-500 rounded-lg text-sm px-3 py-2.5 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700': true, 'focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium border border-gray-300': !image }"
      type="button">
      <div v-if="image">
        <span class="sr-only">Open user menu</span>
        <img class="w-9 h-9 rounded-full" :src="image" alt="user photo">
      </div>
      <div v-else class="text-xs">
        <span class="sr-only">{{ buttonText }}</span>
        {{ selectedAction ? selectedAction : buttonText }}
        <i v-if="selectedAction" class="fas fa-close  text-xs z-10" @click="close($event)"></i>
        <i :class="{ 'transform rotate-180': dropdownOpen }"
          class="ms-2.5 transition duration-75  fas fa-chevron-down text-xs"></i>
      </div>
    </button>
    <div v-if="dropdownOpen"
      class="absolute right-0 h-fit max-h-60 overflow-y-auto z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
      <ul class="py-1 text-sm text-gray-700 dark:text-gray-200">

        <li v-for="(action, index) in actions" :key="index" :class="{ 'bg-primary-50': selectedAction == action.name }"
          class="block cursor-pointer px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
          @click="selectAction(action)">
          <a class="text-black dark:text-gray-300">{{ action.name }}</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';

// Define props
const props = defineProps({
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
});

// Define emits
const emit = defineEmits(['select']);

// Reactive data properties
const dropdownOpen = ref(false);
const selectedAction = ref(null);

// Methods
const toggleDropdown = () => {
  dropdownOpen.value = !dropdownOpen.value;
};

const selectAction = (action: any) => {
  selectedAction.value = action.name;
  emit('select', action);
  dropdownOpen.value = false;
};

const close = (event : any) => {
  event.stopPropagation();
  selectedAction.value = null;
  emit('select', null);
};

const handleClickOutside = (event : any) => {
  const dropdown = dropdownRef.value;
  if (dropdown && !dropdown.contains(event.target)) {
    dropdownOpen.value = false;
  }
};

const dropdownRef = ref(null);

// Lifecycle hooks
onMounted(() => {
  document.addEventListener('mousedown', handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener('mousedown', handleClickOutside);
});
</script>

<style>/* Add any custom styles for the dropdown button component here */</style>
