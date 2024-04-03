<template>
  <div class="relative overflow-x-auto sm:rounded-lg">
    <label class="block mb-2 text-md font-medium text-gray-900 dark:text-white">{{ title }}</label>
    <div class="flex items-center justify-end flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4 bg-white dark:bg-gray-900">
      <div class="mr-2">
        <tab-button-group :items="filterTab" @tab-click="handleTabClick" />
      </div>
      <div class="mr-2">
        <div v-if="isActionable">
          <!-- <FormSelect label="Meeting Folder" id="MeetingFolder" name="Meeting Folder" :options="actions" rules="required" /> -->
          <button @click="toggleDropdown" class="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
            <span class="sr-only">Action button</span>
            Action
            <svg class="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
            </svg>
          </button>
          <div v-show="dropdownOpen" class="absolute z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
            <ul class="py-1 text-sm text-gray-700 dark:text-gray-200" >
              <li v-for="(action, index) in actions" :key="index">
                <a class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">{{ action }}</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div v-if="isSearchable" class="relative">
        <label for="table-search" class="sr-only">Search</label>
        <div v-if="isSearchable">
          <FormInput type="text" icon="fas fa-search" id="table-search" v-model="search" :placeholder="`Search ${title}`" />
        </div>
      </div>
    </div>
    <!-- Table -->
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 mt-2">
      <thead class="text-xs text-gray-700 bg-primary-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th  scope="col" class="p-4" v-if="1 != 1">
            <div class="flex items-center">
              <input id="checkbox-all-search" type="checkbox" class="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
              <label for="checkbox-all-search" class="sr-only">checkbox</label>
            </div>
          </th>
          <th v-for="(heading, index) in headings" :key="index" scope="col" class="px-6 py-3">
            <!-- Conditionally render slot or heading -->
            <template v-if="$slots.heading">
              <slot name="heading" :heading="heading">{{ heading.title }}</slot>
            </template>
            <template v-else>
              {{ heading.title }}
            </template>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in filteredData" :key="index" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
          <td class="w-4 p-4" v-if="1 != 1">
            <div class="flex items-center">
              <input :id="'checkbox-table-search-' + index" type="checkbox" class="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
              <label :for="'checkbox-table-search-' + index" class="sr-only">checkbox</label>
            </div>
          </td>
          <td v-for="(value, key) in item" :key="key" class="px-6 py-4">
            <slot :item="item" :value="value" :key="key" :name="key">{{ value }}</slot>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    headings: Array,
    data: Array,
    actions: {
      required: false,
      type: Array,
      default: () => []
    },
    isActionable: {
      type: Boolean,
      default: false
    },
    isSearchable: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: null
    },
    filterTab: {
      type: Array,
      required: false,
      default: () => []

    }
  },
  data() {
    return {
      dropdownOpen: false,
      search: ''
    };
  },
  computed: {
    filteredData() {
      const rearrangedData = this.data.map(item => {
          const newItem = {};
          this.headings.forEach(heading => {
              newItem[heading.value] = item[heading.value];
          });
          return newItem;
      });
      return rearrangedData;
    }
  },
  methods: {
    toggleDropdown() {
      this.dropdownOpen = !this.dropdownOpen;
    },
    searchHandler() {
      this.$emit('search', this.search);
    },
    handleTabClick(item) {
      this.$emit('tab-click', item);
    }
  }
};
</script>
