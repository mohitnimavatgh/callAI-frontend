<template>
    <label
      :for="id"
      class="inline-flex items-center justify-start w-full p-3 text-gray-500 bg-white border border-gray-300 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-primary-500 peer-checked:border-primary-600 peer-checked:text-primary-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
    >
        <i :class="icon" class=" mr-3"></i>
        <div>
            <div class="w-full text-sm font-semibold">{{ labelText }}</div>
            <div class="w-full text-xs">{{ description }}</div>
        </div>
    </label>
  </template>
  
  <script>
  export default {
    props: {
      id: {
        type: String,
        required: true
      },
      labelText: {
        type: String,
        required: true
      },
      description: {
        type: String,
        required: false,
        default: "",
      },
      icon: {
        type: String,
        default: "",
      },
    }
  };
  </script>
  