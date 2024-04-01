<template>
    <div class="mb-6">
      <label :for="id" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{ label }}</label>
      <div class="relative">
        <div class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
          <i :class="icon" class="w-4 h-4 text-gray-500"></i>
        </div>
        <input
          :type="type"
          :id="id"
          :name="name"
          :value="modelValue"
          v-bind="$attrs"
          @input="updateModelValue($event.target.value)"
          :class="inputClasses"
        />
      </div>
      <p v-if="hasError" v-for="error of errorMessage" :key="error.$uid" class="mt-2 text-sm text-red-600 dark:text-red-500">{{ error.$message }}</p>
    </div>
  </template>
  
  <script>
  import useVuelidate from "@vuelidate/core";
  import { required, helpers, email } from "@vuelidate/validators";
  
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
      type: {
        type: String,
        default: "text",
      },
      icon: {
        type: String,
        default: "",
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
      let demo = {};
      if (typeof this.rules === "string" && this.rules.trim() !== "") {
        const ruleArray = this.rules.split("|");
        ruleArray.forEach((rule) => {
          const [ruleType, message] = rule.split(":");
          demo[ruleType] = helpers.withMessage(
            message,
            ruleType == "required" ? required : ruleType == "email" ? email : required
          );
        });
        demo.$autoDirty = true;
        demo.$lazy = true;
      }
      return {
        modelValue: demo,
      };
    },
    computed: {
      hasError() {
        return this.v$?.modelValue?.$error;
      },
      errorMessage() {
        return this.v$?.modelValue?.$errors ? this.v$.modelValue.$errors : [];
      },
      inputClasses() {
        return [
          "bg-gray-50",
          "border",
          "border-gray-300",
          "text-gray-900",
          "text-sm",
          "rounded-lg",
          "block",
          "w-full",
          "ps-10",
          "p-2.5",
          "dark:text-white",
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
  