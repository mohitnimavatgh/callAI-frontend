<script setup lang="ts">

const collapsed = ref<boolean>(true)
const currentTheme = ref<any>(null);

const setTheme = (theme : string) => {
  if (theme === 'dark' || (!localStorage.getItem('color-theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
};

const changeTheme = () => {
  currentTheme.value = localStorage.getItem("color-theme");
  const newTheme = currentTheme.value === "dark" ? "light" : "dark";
  localStorage.setItem("color-theme", newTheme);
  setTheme(newTheme);
};

</script>

<template>
    <div class="w-full h-full overflow-y-auto">
        <div class="flex items-center justify-between">
          <div class="flex py-2 items-center">
            <!-- <DropDown
              image="https://media.licdn.com/dms/image/C5103AQFl656k2-DwOg/profile-displayphoto-shrink_800_800/0/1517034956958?e=2147483647&v=beta&t=6H_aZri3qcbtlgwTyTKBceuyTEPYW43xGViq5UL4J-w"
              :buttonText="'Action'" :actions="userMenuItems" @select="onSelect" /> -->
            <button @click="changeTheme" type="button"
              class="relative text-gray-500 ml-3 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1 mr-2">
              <i class="fa-regular fa-bell text-gray-400 text-xl"></i>
              <div
                class="absolute inline-flex items-center justify-center w-2.5 h-2.5 text-xs font-bold text-white bg-primary-500 border-2 border-white rounded-full top-0 end-0.5 dark:border-gray-900">
              </div>
            </button>
            <button @click="changeTheme" id="theme-toggle" type="button"
              class="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1 mr-2">
              <svg v-if="currentTheme == 'light'" id="theme-toggle-dark-icon" class="w-5 h-5" fill="currentColor"
                viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
              </svg>
              <svg v-else id="theme-toggle-light-icon" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                  fill-rule="evenodd" clip-rule="evenodd"></path>
              </svg>
            </button>
          </div>
          <button @click="collapsed = !collapsed"><i class="fa fa-xmark text-2xl dark:text-white"></i></button>
        </div>
    </div>
</template>