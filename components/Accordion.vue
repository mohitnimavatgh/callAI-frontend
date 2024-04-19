<template>
    <div>
    <label class="block px-5 py-4 text-md font-medium text-gray-700 dark:text-white bg-gray-200 border "><i :class="icon" class="mr-2"></i>{{title}}</label>
      <div v-for="(accordion, index) in accordions" :key="index" :id="`accordion-${index}`" :data-accordion="accordion.isOpen ? 'open' : 'closed'">
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
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      accordions: {
        type: Array,
        required: true
      },
      icon: {
        type: String,
        default: ''
      },
      title: {
        type: String,
        default: ''
      },
    },
    methods: {
      toggleAccordion(index) {
        this.accordions[index].isOpen =  !this.accordions[index].isOpen;
      }
    },
    watch: {
      accordions(newQuestion, oldQuestion) {
        console.log(oldQuestion);
        this.accordions.forEach(accordion => {
            accordion.isOpen = true;
        });
      }
    },
    created() {
        this.accordions.forEach(accordion => {
            accordion.isOpen = true;
        });
    }
  };
  </script>
  
  <style scoped>
  /* Add your component-specific styles here */
  </style>
  