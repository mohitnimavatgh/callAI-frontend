<template>
  <div class="bg-app main-body bg-gray-100">
    <Header/>
    <SideBar />
    <MainContent />
  </div>
</template>
<script>
import Header from '@/layouts/Header'
import SideBar from '@/layouts/SideBar'
import MainContent from '@/layouts/MainContent'
export default {
  components: {
    Header,
    SideBar,
    MainContent
  }
}
</script>
<style>
.main-body {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  z-index: -1;
}
</style>