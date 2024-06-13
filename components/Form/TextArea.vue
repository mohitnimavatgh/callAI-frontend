<template>
  <div>
    <label v-if="label" :for="id" class="block mb-2 text-sm font-medium text-gray-500 dark:text-gray-300">{{ label
    }}</label>
    <div class="relative">
      <textarea :id="id" :rows="rows" :class="textareaClasses" v-bind="$attrs" :value="modelValue"
        @input="updateModelValue($event.target.value)"></textarea>
    </div>
    <p v-if="hasError" v-for="error of errorMessage" :key="error.$uid"
      class="mt-2 text-xs text-red-600 dark:text-red-500">{{ error.$message }}</p>
  </div>
</template>
  
<script setup lang="ts">
import useVuelidate from '@vuelidate/core';
import { required, helpers } from '@vuelidate/validators';

// Define props
const props = defineProps({
  label: {
    type: String,
    default: '',
  },
  modelValue: {
    type: String,
    default: '',
  },
  id: {
    type: String,
    default: '',
  },
  rows: {
    type: Number,
    default: 4,
  },
  rules: {
    type: String,
    default: '',
  },
});

// Define emits
const emit = defineEmits(['update:modelValue']);

// Local value to use with v-model
const localValue = ref(props.modelValue);

// Watch for changes in modelValue prop to update localValue
watch(() => props.modelValue, (newValue) => {
  localValue.value = newValue;
});

// Validation rules
const validateRule = ref({});
if (props.rules && typeof props.rules === 'string') {
  const ruleArray = props.rules.split('|');
  ruleArray.forEach((rule) => {
    if (rule === 'required') {
      validateRule.value[rule] = helpers.withMessage(
        `${props.label} is required`,
        required
      );
    }
  });
  validateRule.value.$autoDirty = true;
  validateRule.value.$lazy = true;
}

const rules = { modelValue: validateRule.value };

// Vuelidate instance
const v$ = useVuelidate(rules, { modelValue: localValue });

// Computed properties
const hasError = computed(() => v$.value?.modelValue?.$error);
const errorMessage = computed(() => v$.value?.modelValue?.$errors || []);
const textareaClasses = computed(() => [
  'bg-gray-50',
  'border',
  'border-gray-300',
  'dark:border-gray-500',
  'text-gray-900',
  'text-sm',
  'rounded-lg',
  'block',
  'w-full',
  'dark:text-white',
  'dark:bg-gray-700',
  'dark:placeholder:text-gray-300',
  'focus:ring-primary-600',
  'focus:border-primary-600',
  { 'border-red-500': hasError.value },
]);

// Watch for changes in localValue to emit update
watch(localValue, (newValue) => {
  emit('update:modelValue', newValue);
});
</script>
  