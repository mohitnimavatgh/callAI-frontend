<template>
    <div> 
      <tab-button-group :items="tabItems" @tab-click="tabChanged" :selectedTab="selectedTab"/>
      <NuxtPage />
    </div>
  </template>
  
  <script>
  export default {
    data () {
      return {
        selectedTab: '',
        tabItems: [
          { label: 'Bot', icon: 'fas fa-robot', url: 'callAI-settings' },
          { label: 'Calander', icon: 'fas fa-calendar', url: 'callAI-settings-calender' },
          { label: 'Folders', icon: 'fas fa-folder-open', url: 'callAI-settings-folders' },
          { label: 'Quick Questions', icon: 'fas fa-question', url: 'callAI-settings-quick-questions' }
        ]
      }
    },
    created() {
      const currentRouteName = this.$route.name;
      const matchedTab = this.tabItems.find(item => item.url === currentRouteName);
      if (matchedTab) {
        this.selectedTab = matchedTab.label;
      } else {
        this.selectedTab = 'Bot';
      }
    },
    methods : {
      tabChanged (item) {
        this.selectedTab = item.label;
        this.$router.push({ name: item.url });
      }
    }
  }
  </script>
  