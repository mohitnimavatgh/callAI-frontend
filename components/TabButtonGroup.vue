<template>
  <div class="rounded-md flex overflow-x-auto" role="group">

    <button v-for="(item, index) in items" :key="index" :class="{
      // 'bg-primary-100 text-primary-500': activeIndex === index,
      'border border-primary-300 text-primary-500 shadow-md': activeIndex === index,
      'items-center px-4 py-2.5 shadow-sm text-xs text-nowrap font-medium text-gray-500 bg-white border border-gray-200 hover:bg-gray-100 hover:text-primary-700 dark:bg-gray-700 dark:border-gray-500 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-primary-500 dark:focus:text-white': true,
      'rounded-s-lg': index === 0,
      'rounded-e-lg': index === items.length - 1,
    }" type="button" @click="handleClick(item, index)">
      <i v-if="item.icon" :class="item.icon" class="me-2"></i>
      {{ item.label }}
    </button>
  </div>
</template>
  
<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';

// Define props
const props = defineProps({
  items: {
    type: Array,
    required: true
  },
  selectedTab: {
    type: String,
    required: false
  }
});

// Define emits
const emit = defineEmits(['tab-click']);

// Reactive data properties
const activeIndex = ref(0);

// Methods
const handleClick = (item : any, index: number) => {
  activeIndex.value = index;
  emit('tab-click', item);
};

const updateTab = () => {
  const tabIndex = props.selectedTab
    ? props.items.findIndex(item => item.label == props.selectedTab)
    : 0;
  activeIndex.value = tabIndex;
};

// Watch selectedTab prop for changes
watch(() => props.selectedTab, () => {
  updateTab();
});

// Lifecycle hook
onMounted(() => {
  updateTab();
});
</script>
  
<style scoped>
/* Define active button style */
.active {
  background-color: #4a90e2;
  /* Change to your desired active background color */
  color: white;
  /* Change to your desired active text color */
}
</style>
  