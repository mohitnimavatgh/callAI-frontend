<template>
    <div>
      <label v-if="label && label != ''" :for="id" class="block mb-2 text-sm font-medium text-gray-500 dark:text-white">{{ label }}</label>
      <div class="relative">
        <div class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none" v-if="icon">
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
        <Button v-if="size == 'large'" class="absolute end-2.5  bottom-0 px-4 py-2 margin-10-px" outline frontIcon="fas fa-paper-plane"/>
      </div>
      <p v-if="hasError" v-for="error of errorMessage" :key="error.$uid" class="mt-2 text-xs text-red-600 dark:text-red-500">{{ error.$message }}</p>
    </div>
  </template>
  
  <script>
  import useVuelidate from "@vuelidate/core";
  import { required, helpers, email } from "@vuelidate/validators";
  import '@fortawesome/fontawesome-free/css/all.css';
  
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
      size: {
        type: String,
        default: "medium",
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
          } else if (rule == 'email') {
            message = `${name} is invalid`
          }
          validateRule[rule] = helpers.withMessage(
            message,
            rule == "required" ? required : rule == "email" ? email : required
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
          "dark:text-white",
          "focus:ring-primary-600",
          "focus:border-primary-600",
          {"p-2.5" : this.size == 'medium',"p-4" : this.size == 'large' },
          { "border-red-500": this.hasError, "ps-10": this.icon },
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
  <style>
.margin-10-px {
  margin: 10px !important;
}
</style>