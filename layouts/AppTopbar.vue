<template>
  <nav class="bg-primary-50 border-gray-300 dark:bg-gray-900">
    <div class="flex items-center justify-between mx-auto px-4 py-1.5">
      <div class="flex items-center">
        <AppLogo />
        <div class="hidden w-full md:flex md:w-auto ml-10">
          <ul class="flex flex-col font-light p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li v-for="(menu, index) in mainMenuItems" :key="index" @click="handleMenuChange(menu)" class="relative" >
              <div v-if="menu.active" class="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1/2 ">
                <div :class="{'rounded-full border-b-4 border-primary-500' : menu.active}" class="w-full"></div>
              </div>
              <nuxt-link class="text-sm" :to="menu.link" :class="getMenuClass(menu.active)" aria-current="page">{{ menu.label }}</nuxt-link>
              <!-- <a v-else @click="menu.expand  = !menu.expand" class="text-sm cursor-pointer" :class="getMenuClass(menu.active)" aria-current="page">{{ menu.label }} <i class="fa-solid fa-chevron-down"></i></a>
              <div v-if="menu?.submenu?.length && menu.expand" id="dropdownNavbar" class="z-10 absolute font-normal bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
                <ul class="py-2 text-sm text-gray-700 dark:text-gray-400" aria-labelledby="dropdownLargeButton">
                  <li v-for="submenu in menu.submenu">
                    <nuxt-link class="block px-4 py-2 hover:bg-primary-500 hover:text-gray-50 dark:hover:bg-gray-600 dark:hover:text-white" :to="submenu.link" aria-current="page">{{ submenu.label }}</nuxt-link>
                  </li>
                </ul>
              </div> -->
            </li>
          </ul>
        </div>
      </div>
      
      <div class="flex items-center">
        <button @click="changeTheme" type="button" class="relative text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1 mr-2">
          <i class="fa-regular fa-bell text-gray-400 text-xl"></i>
          <div class="absolute inline-flex items-center justify-center w-2.5 h-2.5 text-xs font-bold text-white bg-primary-500 border-2 border-white rounded-full top-0 end-0.5 dark:border-gray-900"></div>
        </button>
        <button @click="changeTheme" id="theme-toggle" type="button" class="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1 mr-2">
          <svg v-if="currentTheme == 'light'" id="theme-toggle-dark-icon" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path></svg>
          <svg v-else id="theme-toggle-light-icon" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
        </button>
        <DropDown image="https://media.licdn.com/dms/image/C5103AQFl656k2-DwOg/profile-displayphoto-shrink_800_800/0/1517034956958?e=2147483647&v=beta&t=6H_aZri3qcbtlgwTyTKBceuyTEPYW43xGViq5UL4J-w" :buttonText="'Action'" :actions="userMenuItems" @select="onSelect" />
      </div>
    </div>
  </nav>
</template>

<script setup>
import { useRouter } from 'vue-router';

const userMenuItems = ref(['Dashboard', 'Settings', 'Earnings', 'Sign out']);

const mainMenuItems = ref([
  { label: 'Dashboard', active: false, link: '/call-ai' },
  { label: 'Home', active: false, link: '/call-ai' },
  { label: 'Calls', active: false, link: '/call-ai/call' },
  { label: 'Settings', active: false, link: '/call-ai/settings'
    // submenu: [
    //   { label: 'Bot', link: '/call-ai/settings' },
    //   { label: 'Calender', link: '/call-ai/settings/calender' },
    //   { label: 'Folders', link: '/call-ai/settings/folders' },
    //   { label: 'Quick Questions', link: '/call-ai/settings/quick-questions' },
    // ]  
  }
]);

const router = useRouter();
const currentTheme = ref(null);

const setTheme = (theme) => {
  if (theme === 'dark' || (!localStorage.getItem('color-theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
};

onMounted(() => {
  setActiveMenuItem()
  currentTheme.value = localStorage.getItem("color-theme");
  if (!currentTheme.value) {
    localStorage.setItem("color-theme", 'light');
    setTheme('light');
  } else {
    setTheme(currentTheme.value);
  }

  // const currentPath = router.currentRoute.value.path;
  // mainMenuItems.value.forEach(item => {
  //   if (item.link === currentPath) {
  //     updateCurrentMenuItem(item.label);
  //   }
  // });
});
const handleMenuChange = (menuItem) => {
  mainMenuItems.value.forEach(item => {
    item.active = false;
  });
  menuItem.active = true;
  router.push(menuItem.link);
};
const changeTheme = () => {
  currentTheme.value = localStorage.getItem("color-theme");
  const newTheme = currentTheme.value === "dark" ? "light" : "dark";
  localStorage.setItem("color-theme", newTheme);
  setTheme(newTheme);
};

const onSelect = (item) => {
  // Your selection handling logic here
};

const currentMenuItem = ref('Home');

const getMenuClass = (active) => {
  return active
    ? 'font-medium block py-2 px-3 text-white bg-primary-700 rounded md:bg-transparent md:text-primary-700 md:p-0 md:dark:text-primary-500 '
    : 'block py-2 px-3 md:p-0 text-medium-gray rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-gray-700 dark:text-white md:dark:hover:text-primary-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 font-medium ';
};

const setActiveMenuItem = () => {
  const currentPath = router.currentRoute.value.path;
  mainMenuItems.value.forEach(item => {
    if (item.link === '/call-ai') {
      item.active = currentPath === '/call-ai';
    } else {
      item.active = currentPath.startsWith(item.link);
    }
  });
};

watch(router.currentRoute, setActiveMenuItem);
</script>
