<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import { initFlowbite } from 'flowbite'
interface Accordion {
  isOpen: boolean;
  // Add other properties if needed
}

interface Props {
  accordions: Accordion[];
  icon: string;
  title: string;
}

const props = defineProps<Props>();
const is_faq_string = ref(false);

const accordionsData = computed(() => {
  if(props.accordions === null){
    is_faq_string.value = true;
    return 'Not Found';
  }else{
    if(isJsonObject(props.accordions)){
      is_faq_string.value = false;
      const jsonData = JSON.parse(props.accordions)
      const resultArray = Object.entries(jsonData).map(([key, value]) => [key, value]);
      return resultArray;
    }else{
        is_faq_string.value = true;
        return props.accordions?.replace(/"/g, '');
    }
  }
});

const isJsonObject = (str:any) => {
    try {
        const obj = JSON.parse(str);     
        return obj && typeof obj === 'object';
    } catch (e) {
        return false;
    }
}

onMounted(async () => {
  initFlowbite();  
});
</script>

<template>
  <div>
    <label class="block px-5 py-4 rounded text-md font-medium text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-700 border dark:border-gray-500"><i :class="icon" class="mr-2"></i>{{title}}</label>
    <div class="flex items-center justify-between w-full p-5" v-if="is_faq_string">
      <span>{{ accordionsData }}</span>
    </div>
    <div v-for="(accordion, index) in accordionsData" :key="index" v-else>
       <div data-accordion="collapse">
        <h2 :id="`accordion-collapse-heading-${index}`">
          <button type="button"
            class="flex items-center justify-between rounded-md w-full p-5 font-medium text-left text-gray-500 border border-b-0 border-gray-200 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3"
            :data-accordion-target="`#accordion-collapse-body-${index}`" aria-expanded="true"
            :aria-controls="`accordion-collapse-body-${index}`">
            <span>{{  accordion[0] }}</span>
            <svg data-accordion-icon class="w-3 h-3 rotate-180 shrink-0" aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M9 5 5 1 1 5" />
            </svg>
          </button>
        </h2>
        <div :id="`accordion-collapse-body-${index}`" class="hidden rounded-md overflow-hidden" :aria-labelledby="`accordion-collapse-heading-${index}`">
          <div class="p-5 border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900">
            <p class="mb-2 text-gray-500 dark:text-gray-400">{{  accordion[1] }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  
  <style scoped>
  /* Add your component-specific styles here */
  </style>
  