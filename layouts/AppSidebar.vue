<template>
    <div>
      <button @click="toggleSidebar" type="button" class="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
        <span class="sr-only">{{ isSidebarOpen ? 'Close sidebar' : 'Open sidebar' }}</span>
        <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
        </svg>
      </button>
    
      <aside id="logo-sidebar" :class="{ 'translate-x-0': isSidebarOpen, '-translate-x-full': !isSidebarOpen }" class="fixed top-0 left-0 z-50 w-64 h-screen transition-transform sm:translate-x-0 bg-white dark:bg-gray-800 sidebar shadow-md dark:border-r dark:border-gray-500" aria-label="Sidebar">
        <div class="h-full px-3 py-4 overflow-y-auto dark:bg-gray-800">
          <div class="flex justify-end">
            <div v-if="isSidebarOpen" @click="toggleSidebar">Close</div>
          </div>
          <div class="flex justify-center">
            <AppLogo />
          </div>
          <ul class="space-y-2 font-medium mt-8">
            <li class="text-sm" v-for="(menu, index) in menus" :key="index"  :class="{ 'bg-gray-100 rounded-lg text-primary-500 dark:bg-gray-600': menu.isActive, 'text-gray-700' : !menu.isActive}">
              <button @click="toggleSubMenu(index)" class="flex justify-between items-center w-full p-2 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <div class="flex items-center">
                  <i class="flex items-center w-5 h-5 transition duration-75 group-hover:text-gray-700" :class="{ 'rounded-lg text-primary-500': menu.isActive, 'text-gray-700' : !menu.isActive}, menu.icon" ></i>
                  <span class="ms-3">{{ menu.title }}</span>
                </div>
                <i  v-if="menu.submenu && menu.submenu.length" :class="{ 'transform rotate-180': menu.showSubMenu }" class="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-white fas fa-chevron-down" ></i>
              </button>
              <ul v-if="menu.submenu && menu.submenu.length" :class="{ 'block': menu.showSubMenu, 'hidden': !menu.showSubMenu }" class="pl-4 transition-all duration-300 mt-2 dark:bg-gray-800">
                <li v-for="(subMenuItem, subIndex) in menu.submenu" :key="subIndex">
                  <a href="#" class="flex items-center p-2 text-gray-700 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                    <i class="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-white" :class="subMenuItem.icon"></i>
                    <span class="ms-3">{{ subMenuItem.title }}</span>
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </aside>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        isSidebarOpen: false,
        menus: [
          {
            title: 'Dashboard',
            icon: 'fas fa-house',
            showSubMenu: false,
            isActive: true,
          },
          {
            title: 'Meet AI',
            icon: 'fas fa-phone',
            submenu: [
              { title: 'Home', icon: 'fas fa-home', active: true, url: 'call-ai' },
              { title: 'Calls', icon: 'fas fa-phone', active: false, url: 'call-ai/calls' },
              { title: 'Analysis', icon: 'fas fa-magnifying-glass-chart', active: false, url: 'call-ai/analysis' },
              { title: 'Settings', icon: 'fas fa-gear', active: false, url: 'call-ai/settings' }
            ],
            showSubMenu: false,
            isActive: false,
          },
        ],
      };
    },
    methods: {
      toggleSidebar() {
        this.isSidebarOpen = !this.isSidebarOpen;
      },
      toggleSubMenu(index) {
        this.menus[index].showSubMenu = !this.menus[index].showSubMenu;
        this.setActive(index);
      },
      setActive(index) {
        this.menus.forEach((menu, i) => {
          menu.isActive = i === index;
        });
      },
    },
  };
  </script>
  
  <!-- <style>
   .sidebar {
    top: 60px;
  }
  </style> -->
  