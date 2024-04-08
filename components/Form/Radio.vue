<template>
    <input
      type="radio"
      :id="id"
      :name="name"
      :value="value"
      @change="updateModelValue"
      class="hidden peer"
      :checked="isChecked"
    />
  </template>
  
  <script>
  export default {
    props: {
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
    },
    computed: {
        isChecked() {
        return this.modelValue === this.value;
        }
    },
    methods: {
      updateModelValue(event) {
        this.$emit("update:modelValue", event.target.value);
      }
    }
  };
  </script>
  