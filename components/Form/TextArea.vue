<template>
    <div>
      <label v-if="label" :for="id" class="block mb-2 text-sm font-medium text-gray-500 dark:text-white">{{ label }}</label>
      <div class="relative">
        <textarea
          :id="id"
          :rows="rows"
          :class="textareaClasses"
          v-bind="$attrs"
          :value="modelValue"
          @input="updateModelValue($event.target.value)"
        ></textarea>
      </div>
      <p v-if="hasError" v-for="error of errorMessage" :key="error.$uid" class="mt-2 text-xs text-red-600 dark:text-red-500">{{ error.$message }}</p>
    </div>
  </template>
  
  <script>
  import useVuelidate from "@vuelidate/core";
  import { required, helpers } from "@vuelidate/validators";
  
  export default {
    props: {
      label: {
        type: String,
        default: "",
      },
      modelValue: {
        type: String,
        default: "",
      },
      id: {
        type: String,
        default: "",
      },
      rows: {
        type: Number,
        default: 4,
      },
      rules: {
        type: String,
        default: "",
      },
    },
    data() {
      return {
        v$: useVuelidate(),
      };
    },
    validations() {
      let validateRule = {};
      if (this.rules && typeof this.rules === "string") {
        const ruleArray = this.rules.split("|");
        ruleArray.forEach((rule) => {
          if (rule === 'required') {
            validateRule[rule] = helpers.withMessage(
              `${this.label} is required`,
              required
            );
          }
        });
        validateRule.$autoDirty = true;
        validateRule.$lazy = true;
      }
      return {
        modelValue: validateRule,
      };
    },
    computed: {
      hasError() {
        return this.v$?.modelValue?.$error;
      },
      errorMessage() {
        return this.v$?.modelValue?.$errors || [];
      },
      textareaClasses() {
        return [
          "bg-gray-50",
          "border",
          "border-gray-300",
          "text-gray-900",
          "text-sm",
          "rounded-lg",
          "block",
          "w-full",
          "dark:text-white",
          "focus:ring-primary-600",
          "focus:border-primary-600",
          { "border-red-500": this.hasError },
        ];
      },
    },
    methods: {
      updateModelValue(newValue) {
        this.$emit("update:modelValue", newValue);
      },
    },
  };
  </script>
  