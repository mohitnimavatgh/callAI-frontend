<template>
    <div>
      <button @click="toggleSidebar" type="button" class="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
        <span class="sr-only">{{ isSidebarOpen ? 'Close sidebar' : 'Open sidebar' }}</span>
        <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
        </svg>
      </button>
    
      <aside id="logo-sidebar" :class="{ 'translate-x-0': isSidebarOpen, '-translate-x-full': !isSidebarOpen }" class="fixed top-0 left-0 z-20 w-60 h-screen transition-transform sm:translate-x-0 bg-gray-100 dark:bg-gray-800 sidebar dark:border-r dark:border-gray-500 border-r border-gray-200" aria-label="Sidebar">
        <div class="h-full overflow-y-auto dark:bg-gray-800 relative ">
          <div class="">
            <div class="flex justify-end absolute top-5 right-2">
              <div v-if="isSidebarOpen" class="text-gray-700 text-2xl" @click="toggleSidebar"><i class="fa fa-xmark"></i></div>
            </div>
            <div class="flex justify-center items-center px-3 py-6">
              <AppLogo />
            </div>
            <ul class="space-y-2 font-medium px-3 py-10">
              <li class="text-sm" v-for="(menu, index) in menus" :key="index"  :class="{ 'bg-gray-100 rounded-lg text-primary-500 dark:bg-gray-600': menu.isActive, 'text-gray-700' : !menu.isActive}">
                <button @click="toggleSubMenu(index, menu)" class="flex justify-between items-center w-full p-2 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                  <div class="flex items-center text-gray-500">
                    <i class=" transition duration-75" :class="route.name.includes(menu.title.toLowerCase()) ? 'rounded-lg font-semibold text-primary-500' : 'text-gray-600',menu.icon" ></i>
                    <span :class="route.name.includes(menu.title.toLowerCase()) ? 'rounded-lg font-semibold text-primary-500' : 'text-gray-600'" class="ms-3">{{ menu.title }}</span>
                  </div>
                  <i  v-if="menu.submenu && menu.submenu.length" :class="{ 'transform rotate-180': menu.showSubMenu }" class="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-white fas fa-chevron-down" ></i>
                </button>
                <ul v-if="menu.submenu && menu.submenu.length" :class="{ 'block': menu.showSubMenu, 'hidden': !menu.showSubMenu }" class="pl-4 transition-all duration-300 mt-2 dark:bg-gray-800">
                  <li v-for="(subMenuItem, subIndex) in menu.submenu" :key="subIndex">
                    <a href="#" class="flex items-center p-2 text-gray-700 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                      <i class="text-gray-700 transition duration-75 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-white" :class="subMenuItem.icon"></i>
                      <span class="ms-3">{{ subMenuItem.title }}</span>
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
          <!-- <div class="absolute bottom-0 border-t border-gray-300 w-full">
            <div class="px-3 py-4">
              <p class="text-sm text-gray-500 font-semibold">Pro (Limited)</p>
              <div class="w-full bg-gray-200 rounded-full h-1.5 dark:bg-gray-700 mt-3">
                <div class="bg-primary-600 h-1.5 rounded-full" style="width: 18%"></div>
              </div>
              <p class="text-xs text-gray-500 mt-1">6 of 100 monthly tokens used</p>
              <Button :text="'Get AI Pro'" outline class="mt-4 py-2 px-1"></Button>
            </div>
          </div> -->
        </div>
      </aside>
    </div>
  </template>
  
  <script setup>
const router = useRouter();
const route = useRoute();
const isSidebarOpen = ref(false);
const menus = ref([
  { title: 'Users', icon: 'fas fa-user', active: true, url: '/admin/users' },
  { title: 'Change Password', icon: 'fas fa-key', active: false, url: '/admin/change-password' },
  { title: 'Profile', icon: 'fas fa-key', active: false, url: '/admin/profile' },
]);

function toggleSidebar() {
  isSidebarOpen.value = !isSidebarOpen.value;
}

function toggleSubMenu(index, menu) {
  menus.value[index].showSubMenu = !menus.value[index].showSubMenu;
  // setActive(index);
  router.push(menu.url);
}

// function setActive(index) {
//   menus.value.forEach((menu, i) => {
//     menu.isActive = i === index;
//   });
// }
</script>
