<template>
  <nav :class="route.name.includes('admin') ? 'bg-primary-500' : 'bg-primary-50'"
    class="border-gray-300 dark:bg-gray-900">
    <div class="flex items-center justify-between mx-auto px-8 py-5 md:py-1.5">
      <div class="flex items-center">
        <AppLogo v-if="!route.name.includes('admin')" />
        <div class="hidden w-full md:flex md:w-auto ml-10">
          <ul v-if="!route.name.includes('admin')"
            class="flex flex-col font-light p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li v-for="(menu, index) in  mainMenuItems " :key="index" class="relative">
              <nuxt-link class="text-sm" :to="menu.link" @click="handleMenuChange(menu)"
                :class="isActive === menu.label
                  ? 'font-medium block py-2 px-3 text-white bg-primary-700 rounded md:bg-transparent md:text-primary-700 md:p-0 md:dark:text-primary-500 '
                  : 'block py-2 px-3 md:p-0 text-medium-gray rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-gray-700 dark:text-white md:dark:hover:text-primary-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 font-medium '"
                >{{
                menu.label }}</nuxt-link>
              <div v-if="route.name == isActive.toLowerCase() || isActive == 'Calls' || isActive == 'Users' || isActive == 'Settings' || isActive == 'Dashboard'" class="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1/2 ">
                <div :class="isActive == menu.label ? 'rounded-full border-b-4 border-primary-500' : ''" class="w-full">
                </div>
              </div>
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
      <div class="hidden md:flex items-center">
        <button @click=" changeTheme " type="button"
          class="relative  dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1 mr-2">
          <i class="fa-regular fa-bell text-xl"
            :class=" route.name.includes('admin') ? 'text-white' : 'text-gray-400' "></i>
          <div
            class="absolute inline-flex items-center justify-center w-2.5 h-2.5 text-xs font-bold text-white bg-primary-500 border-2 border-white rounded-full top-0 end-0.5 dark:border-gray-900">
          </div>
        </button>
        <button @click=" changeTheme " id="theme-toggle" type="button"
          :class=" route.name.includes('admin') ? 'text-white' : 'text-gray-400' "
          class="dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1 mr-2">
          <svg v-if=" currentTheme == 'light' " id="theme-toggle-dark-icon" class="w-5 h-5" fill="currentColor"
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
        <DropDown
          image="https://media.licdn.com/dms/image/C5103AQFl656k2-DwOg/profile-displayphoto-shrink_800_800/0/1517034956958?e=2147483647&v=beta&t=6H_aZri3qcbtlgwTyTKBceuyTEPYW43xGViq5UL4J-w"
          :buttonText=" 'Action' " :actions=" userMenuItems " @select=" onSelect " />
      </div>

      <!-- Collapse Slider Button -->
      <div class="block md:hidden">
        <button @click="collapsed = !collapsed"><i class="fa fa-bars text-2xl dark:text-white"></i></button>
      </div>

      <!-- Collapse Slider -->
      <div :class=" collapsed ? '-top-full' : 'top-0' "
        class="block fixed z-20 transition-all bg-primary-100 ease-in-out dark:bg-gray-900 left-0 pt-2 px-4 w-full duration-500 md:hidden rounded-b-lg">
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <DropDown
              image="https://media.licdn.com/dms/image/C5103AQFl656k2-DwOg/profile-displayphoto-shrink_800_800/0/1517034956958?e=2147483647&v=beta&t=6H_aZri3qcbtlgwTyTKBceuyTEPYW43xGViq5UL4J-w"
              :buttonText=" 'Action' " :actions=" userMenuItems " @select=" onSelect " />
            <button @click=" changeTheme " type="button"
              class="relative text-gray-500 ml-3 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1 mr-2">
              <i class="fa-regular fa-bell text-gray-400 text-xl"></i>
              <div
                class="absolute inline-flex items-center justify-center w-2.5 h-2.5 text-xs font-bold text-white bg-primary-500 border-2 border-white rounded-full top-0 end-0.5 dark:border-gray-900">
              </div>
            </button>
            <button @click=" changeTheme " id="theme-toggle" type="button"
              class="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1 mr-2">
              <svg v-if=" currentTheme == 'light' " id="theme-toggle-dark-icon" class="w-5 h-5" fill="currentColor"
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
        <ul
          class="font-light py-4 mt-4 border-t border-primary-500 rtl:space-x-reverse dark:bg-gray-900 dark:border-gray-700">
          <li class="py-1" v-for="(menu, index) in mainMenuItems" :key="index" @click="handleMenuChange(menu)">
            <nuxt-link @click="collapsed = !collapsed" class="text-sm" :to="menu.link"
              :class="getMenuClass(menu.active)">{{ menu.label }}</nuxt-link>
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
  </nav>
</template>

<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router';
import { useAuth } from "@/stores/auth";
import { adminAuth } from "@/stores/admin/auth";
const auth = useAuth()
const adminState = adminAuth()
const { $toast } = useNuxtApp()
const usersMenuItems = ref([
  { url: '/profile', name: 'Profile' },
  { url: '/change-password', name: 'Change Password' },
  { url: '', name: 'Sign out' }
]);

const userMenuItems = computed(() => {
  return usersMenuItems.value.filter(item => {
    return !(auth?.userInfo?.social_type != null && item.url === '/change-password');
  });
});

const collapsed = ref<boolean>(true)

const mainMenuItems = ref([
  { label: 'Dashboard', active: false, link: '/' },
  { label: 'Call-ai', active: false, link: '/call-ai' },
  { label: 'Calls', active: false, link: '/call-ai/calls' },
  {
    label: 'Settings', active: false, link: '/call-ai/settings'
    // submenu: [
    //   { label: 'Bot', link: '/call-ai/settings' },0000000
    //   { label: 'Calendar', link: '/call-ai/settings/calendar' },
    //   { label: 'Folders', link: '/call-ai/settings/folders' },
    //   { label: 'Quick Questions', link: '/call-ai/settings/quick-questions' },
    // ]  
  },
  { label: 'Users', active: false, link: '/call-ai/users' },
]);

const router = useRouter() as any;
const route = useRoute() as any;
const currentTheme = ref<any>(null);

const setTheme = (theme: any) => {
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

const isActive = computed(() => {
  return auth.topBarActiveVal
})

const handleMenuChange = (menuItem: any) => {
  auth.handleChangeActiveValue(menuItem.label)
};

const changeTheme = () => {
  currentTheme.value = localStorage.getItem("color-theme");
  const newTheme = currentTheme.value === "dark" ? "light" : "dark";
  localStorage.setItem("color-theme", newTheme);
  setTheme(newTheme);
};

const catchResponse = (err: any) => {
  if (err?.response?.status == 422) {
    let data = err?.response?.data?.data
    if (data) {
      let keys = Object.keys(data)[0];
      let firstValue = data[keys];
      $toast.error(firstValue[0], { duration: 5000 })
    } else {
      if (!err?.response?.data?.success) {
        $toast.error(err?.response?.data?.message, { duration: 5000 })
      } else {
        $toast.error('something went wrong...!', { duration: 5000 })
      }
    }
  } else {
    if (!err?.response?.data?.success) {
      $toast.error(err?.response?.data?.message, { duration: 5000 })
    } else {
      $toast.error('something went wrong...!', { duration: 5000 })
    }
  }
}

const onSelect = (item: any) => {
  if (item.name == 'Sign out') {
    let role = auth.role;
    let user = role == 'Company' ? auth.logout() : adminState.logout();
    user.then(() => {
      $toast.success('Logout Successfully', { duration: 10000 })
      if (role == 'Company') {
        router.push('/login');
      } else {
        router.push('/admin/login');
      }
    }).catch(error => {
      catchResponse(error)
    });
  } else {
    router.push(`${item.url}`);
  }

};

const getMenuClass = (active: any) => {
  return isActive.value === active
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
