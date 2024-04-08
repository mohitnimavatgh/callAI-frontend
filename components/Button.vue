<template>
    <button :class="buttonClasses" @click="onClick" >
      <i v-if="frontIconClass" :class="frontIconClass"></i>
      <span v-if="text" class="mx-2">{{ text }}</span>
      <i v-if="backIconClass" :class="backIconClass"></i>
    </button>
  </template>
  
  <script>
  export default {
    props: {
      frontIcon: {
        type: String,
        default: ''
      },
      backIcon: {
        type: String,
        default: ''
      },
      outline: {
        type: Boolean,
        default: false
      },
      text: {
        type: String,
        default: ''
      },
      rounded: {
        type: Boolean,
        default: false
      },
    },
    computed: {
      buttonClasses() {
        return [
          'text-sm',
          'p-2.5',
          'text-center',
          'inline-flex',
          'items-center',
          this.outline ? 'text-primary-500 border border-primary-500' : 'text-white bg-primary-500',
          this.outline ? 'hover:text-primary-600 hover:border-primary-600' : 'hover:bg-primary-600',
          this.outline ? 'focus:ring-primary-300 focus:ring-4' : 'focus:ring-4 focus:outline-none',
          this.rounded ? 'rounded-full' : 'rounded-lg',
          'font-medium'
        ];
      },
      frontIconClass() {
        return this.outline ? `${this.frontIcon} ml-1 text-primary-500` : `${this.frontIcon} ml-1`;
      },
      backIconClass() {
        return this.outline ? `${this.backIcon} mr-1 text-primary-500` : `${this.backIcon} mr-1`;
      }
    },
    methods: {
      onClick() {
        // Handle button click event here
      }
    }
  };
  </script>