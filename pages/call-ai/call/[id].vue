<template>
    <div>
        <tab-button-group :items="tabItems" @tab-click="tabChanged" :selectedTab="selectedTab"/>
        <CallDetail v-if="selectedTab == 'Calls'" />
        <CallChat v-if="selectedTab == 'Chat To Call'" />
        <CallHistory v-if="selectedTab == 'History'" />
    </div>
</template>
<script>
export default {
    data () {
        return {
            selectedTab: 'Calls',
            tabItems: [
                { label: 'Calls', icon: 'fas fa-phone' },
                { label: 'Chat To Call', icon: 'fas fa-comment' },
                { label: 'History', icon: 'fas fa-clock-rotate-left' }
            ],
        }
    },
    methods : {
        tabChanged (item) {
            this.selectedTab = item.label
        }
    }
}
</script>