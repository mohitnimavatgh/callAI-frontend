<template>
  <input type="radio" :id="id" :name="name" :value="value" @change="updateModelValue" class="hidden peer"
    :checked="isChecked" />
</template>
  
<script setup lang="ts">

// Define props
const props = defineProps({
  id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  value: {
    type: String,
    required: true
  },
  modelValue: {
    type: String,
    required: true
  }
});

// Define emits
const emit = defineEmits(['update:modelValue']);

// Computed property to check if the radio button is checked
const isChecked = computed(() => props.modelValue === props.value);

// Method to update the model value
const updateModelValue = (event: Event) => {
  emit('update:modelValue', (event.target as HTMLInputElement).value);
};
</script>
  