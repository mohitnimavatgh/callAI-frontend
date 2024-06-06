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

const toggleAccordion = (index: number) => {
  props.accordions[index].isOpen = !props.accordions[index].isOpen;
};

watch(() => props.accordions, (newQuestion, oldQuestion) => {
  newQuestion.forEach(accordion => {
    accordion.isOpen = true;
  });
},{ deep: true, immediate: true });

onMounted(async () => {
  initFlowbite();
  await props.accordions.forEach(accordion => {
    accordion.isOpen = true;
  });
});
</script>

<template>
  <div>
    <label class="block px-5 py-4 text-md font-medium text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-700 border dark:border-gray-500"><i :class="icon" class="mr-2"></i>{{title}}</label>
    <!-- <div v-for="(accordion, index) in accordions" :key="index" :id="`accordion-${index}`" :data-accordion="accordion.isOpen ? 'open' : 'closed'">
      <h2 :id="`accordion-${index}-heading`">
        <button type="button" class="text-start bg-white-100 flex items-center justify-between w-full px-5 py-3 font-medium rtl:text-right text-gray-700 border border-b-0 border-gray-200 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-200 gap-3" :data-accordion-target="`#accordion-${index}-body`" :aria-expanded="accordion.isOpen" :aria-controls="`accordion-${index}-body`" @click="toggleAccordion(index)">
          <span class="flex items-center text-sm">{{ accordion.title }}</span>
          <i class="fas fa-chevron-down shrink-0" :class="['fa-chevron-up', {'transform rotate-180': accordion.isOpen}]"></i>
        </button>
      </h2>
      <div :id="`accordion-${index}-body`" :class="{ hidden: !accordion.isOpen }" :aria-labelledby="`accordion-${index}-heading`">
        <div class="p-5 border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900">
          <p class="text-sm mb-2 text-gray-500 dark:text-gray-400 leading-6">{{ accordion.description }}</p>
        </div>
      </div>
    </div> -->
    <div v-for="(accordion, index) in accordions" :key="index">
      <div data-accordion="collapse">
        <h2 :id="`accordion-collapse-heading-${index}`">
          <button type="button"
            class="flex items-center justify-between w-full p-5 font-medium text-left text-gray-500 border border-b-0 border-gray-200 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3"
            :data-accordion-target="`#accordion-collapse-body-${index}`" aria-expanded="true"
            :aria-controls="`accordion-collapse-body-${index}`">
            <span>{{ accordion.title }}</span>
            <svg data-accordion-icon class="w-3 h-3 rotate-180 shrink-0" aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M9 5 5 1 1 5" />
            </svg>
          </button>
        </h2>
        <div :id="`accordion-collapse-body-${index}`" class="hidden" :aria-labelledby="`accordion-collapse-heading-${index}`">
          <div class="p-5 border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900">
            <p class="mb-2 text-gray-500 dark:text-gray-400">{{ <any>accordion.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  
  <style scoped>
  /* Add your component-specific styles here */
  </style>
  