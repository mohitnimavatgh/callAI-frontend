<template>
    <div>
      <label :for="id" class="block mb-2 text-sm font-medium text-gray-500 dark:text-white">{{ label }}</label>
      <div class="relative">
        <select
          :id="id"
          :name="name"
          :value="modelValue"
          v-bind="$attrs"
          @input="updateModelValue($event.target.value)"
          :class="selectClasses"
        >
          <option :value="''" disabled>{{ placeholder }}</option>
          <option v-for="option in options" :key="option.value" :value="option.value">{{ option.label }}</option>
        </select>
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
      name: {
        type: String,
        default: "",
      },
      options: {
        type: Array,
        default: () => [],
      },
      placeholder: {
        type: String,
        default: "Choose an option",
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
      if (typeof this.rules === "string" && this.rules.trim() !== "") {
        const ruleArray = this.rules.split("|");
        ruleArray.forEach((rule) => {
          var message = ''
          var name = this.name
          var name = name.charAt(0).toUpperCase() + name.slice(1);
          if (rule == 'required') {            
            message = `${name} is required`;
          }
          validateRule[rule] = helpers.withMessage(
            message,
            rule == "required" ? required : required
          );
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
        return this.v$?.modelValue?.$errors ? this.v$.modelValue.$errors : [];
      },
      selectClasses() {
        return [
          "bg-gray-50",
          "border",
          "border-gray-300",
          "text-gray-900",
          "text-sm",
          "rounded-lg",
          "block",
          "w-full",
          "p-2.5",
          "placeholder-gray-500",
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
  