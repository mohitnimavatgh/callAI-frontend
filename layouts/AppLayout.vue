<template>
  <div id="mainBody" class="bg-primary-50 main-body dark:bg-gray-800">
        <app-topbar></app-topbar>
        <div class="mt-16 container mx-auto"><Router-view></Router-view></div>            
  </div>
</template>
<!-- <template>
    <div class="bg-app main-body bg-gray-50 dark:bg-gray-800">
        <app-sidebar></app-sidebar>
        <div class="xl:mt-16 sm:mt-16 md:mt-16 sm:ml-60 relative">
          <div class="xl:mt-16 sm:mt-16 md:mt-16 relative">
          <app-topbar></app-topbar>
          <div class="w-96 mt-20"><Router-view></Router-view></div>            
        </div>
    </div>
  </template> -->
  <script>
  import AppTopbar from '@/layouts/AppTopbar'
  import AppSidebar from '@/layouts/AppSideBar'
import { RouterView } from 'vue-router';
//   import MainContent from '@/layouts/AppMainContent'
  export default {
    components: {
        AppTopbar,
        AppSidebar,
    //   MainContent
    }
  }
  </script>
  <style>
  .main-body {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    overflow-y: auto;
    overflow-x: hidden;
    z-index: -1;
  }
  ::-webkit-scrollbar {
    width: 7px; 
  }
  ::-webkit-scrollbar-track {
    background: white; 
  }
  ::-webkit-scrollbar-thumb {
    background: #D1D5DB; 
    border-radius: 15px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: #9095A0; 
  }
  .scroll-container {
    scrollbar-width: thin;
    scrollbar-color: transparent transparent; 
  }

  </style>