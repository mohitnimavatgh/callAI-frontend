<template>
  <button :class="buttonClasses" @click="onClick" :disabled="disabled">
    <i v-if="frontIconClass" :class="frontIconClass"></i>
    <span v-if="text" class="mx-2">{{ text }}</span>
    <i v-if="backIconClass" :class="backIconClass"></i>
  </button>
</template>
  
<script setup lang="ts">

const props = defineProps({
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
  disabled: {
    type: Boolean,
    default: false
  }
});

const buttonClasses = computed(() => [
  'text-sm',
  'p-2.5',
  'text-center',
  'inline-flex',
  'items-center',
  props.outline ? 'text-primary-500 border border-primary-500' : 'text-white bg-primary-500',
  props.outline ? 'hover:text-primary-600 hover:border-primary-600' : 'hover:bg-primary-600',
  props.outline ? 'focus:ring-primary-300 focus:ring-4' : 'focus:ring-4 focus:outline-none',
  props.rounded ? 'rounded-full' : 'rounded-lg',
  'font-medium'
]);

const frontIconClass = computed(() => props.outline ? `${props.frontIcon} ml-1 text-primary-500` : `${props.frontIcon} ml-1`);
const backIconClass = computed(() => props.outline ? `${props.backIcon} mr-1 text-primary-500` : `${props.backIcon} mr-1`);

const onClick = () => {

};
</script>