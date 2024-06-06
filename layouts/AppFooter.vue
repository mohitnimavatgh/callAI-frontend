<template>  
    <footer class="h-full w-full bg-white rounded-lg shadow dark:bg-gray-800 border-t border-gray-200 dark:border-gray-500 py-1">
      <div class="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
        <span class="text-xs text-gray-500 xs:text-center dark:text-gray-400">© 2024 <a href="https://flowbite.com/" class="hover:underline">Confra</a>. All Rights Reserved.</span>
        <ul class="flex flex-wrap items-center text-xs font-medium text-primary-400 dark:text-gray-400 xs:mt-0">
          <li>
            <NuxtLink to="/about" class="hover:underline me-4 md:me-6">About</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/privacy-policy" class="hover:underline me-4 md:me-6">Privacy Policy</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/support" class="hover:underline me-4 md:me-6">Support</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/contact" class="hover:underline">Contact</NuxtLink>
          </li>
        </ul>
      </div>
    </footer>
  </template>
  