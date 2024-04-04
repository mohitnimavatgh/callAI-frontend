<template>
    <div class="bg-app main-body bg-gray-100">
        <app-sidebar></app-sidebar>
        <div class="xl:mt-16 sm:mt-16 md:mt-16 sm:ml-64 relative">
          <app-topbar></app-topbar>
          <div class="p-5 mt-20"><Router-view></Router-view></div>            
        </div>

    </div>
  </template>
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
    width: 100vw;
    height: 100vh;
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