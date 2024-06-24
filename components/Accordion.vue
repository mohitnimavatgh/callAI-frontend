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
  if (props.accordions === null) {
    is_faq_string.value = true;
    return 'Not Found';
  } else {
    if (isJsonObject(props.accordions)) {
      is_faq_string.value = false;
      const jsonData = JSON.parse(props.accordions)
      const resultArray = Object.entries(jsonData).map(([key, value]) => [key, value]);
      return resultArray;
    } else {
      is_faq_string.value = true;
      return props.accordions?.replace(/"/g, '');
    }
  }
});

const isJsonObject = (str: any) => {
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
  <div class="rounded-md overflow-hidden border border-gray-200 dark:border-gray-500">
    <label
      class="block px-5 py-4 font-semibold text-gray-600 dark:text-gray-300 bg-white dark:bg-gray-700"><i
        :class="icon" class="mr-2"></i>{{ title }}</label>
    <div class="flex items-center justify-between w-full text-gray-500 dark:text-gray-300 p-5" v-if="is_faq_string">
      <span>{{ accordionsData }}</span>
    </div>
    <div v-for="(accordion, index) in accordionsData" :key="index" v-else>
      <div data-accordion="collapse">
        <h2 :id="`accordion-collapse-heading-${index}`">
          <button type="button"
            class="accordionBtn"
            :data-accordion-target="`#accordion-collapse-body-${index}`" aria-expanded="true"
            :aria-controls="`accordion-collapse-body-${index}`">
            <span>{{ accordion[0] }}</span>
            <div class="w-7 h-7 rounded-full flex items-center justify-center dark:bg-gray-900">
              <svg data-accordion-icon class="w-3 h-3 rotate-180 shrink-0" aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M9 5 5 1 1 5" />
              </svg>
            </div>
          </button>
        </h2>
        <div :id="`accordion-collapse-body-${index}`" class="hidden overflow-hidden" :class="index == (accordionsData.length - 1) ? 'rounded-b-md' : ''"
          :aria-labelledby="`accordion-collapse-heading-${index}`">
          <div class="p-5 border-y border-b-0 border-gray-200 dark:border-gray-500 dark:bg-gray-800">
            <p class="mb-2 text-gray-500 dark:text-gray-400">{{ accordion[1] }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  
<style scoped>
.accordionBtn{
  @apply flex items-center justify-between w-full p-5 font-medium text-left dark:text-gray-400 border-y border-b-0 border-gray-200 bg-white focus:bg-white focus:text-gray-500 dark:focus:bg-gray-700 dark:focus:text-gray-300 dark:border-gray-500 gap-3 dark:bg-gray-700 text-gray-500 hover:bg-gray-100 !important;
}
</style>
  