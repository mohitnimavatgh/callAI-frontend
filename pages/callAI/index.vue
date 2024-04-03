<template>
    <div> 
        <div class="box">
            <Table class="mt-5" title="Upcoming Meetings " :isSearchable="true" :headings="tableHeadings" :data="tableData" :actions="actionList" @search="handleSearch" />
            <Pagination class="mt-4 flex justify-end" :totalPage="10" :currentPage="3"/>
        </div>  
        <div class="box mt-5">
            <Table
                :headings="tableHeadings"
                :data="tableData"
                :isSearchable="true"
                :isActionable="true"
                :actions="actionList"
                title="Recorded Meetings"
                @search="handleSearch"
                :filterTab="tabItems"
                @tab-click="handleTabClick"
            >
                <template v-slot:action="{ item, value }">
                    <Button frontIcon="fas fa-pen" outline />
                </template>
            </Table>
            <Pagination class="mt-4 flex justify-end" :totalPage="10" :currentPage="3"/>
        </div>
    </div>
</template>
<script>
export default {
  data() {
    return {
        tabItems: [
            { label: 'All Calls', icon: 'fas fa-people-group' },
            { label: 'Your Calls', icon: 'fas fa-user' },
            { label: 'Teams Call', icon: 'fas fa-user-plus' }
        ],
      tableHeadings:[
            { title: 'Name', value: 'name' },
            { title: 'Type', value: 'type' },
            { title: 'Record', value: 'record' },
            { title: 'Calander Plateform', value: 'calender_plateform' },
            { title: 'Date', value: 'date' },
            { title: 'Time', value: 'time' },            
            { title: 'Meeting Platefrom', value:  'meeting_platefrom' },
            { title: 'Folder', value: 'folder' },
            { title: 'Action', value: 'action' },
        ],
      tableData:[
            { name: 'Neil Sims', type: 'React Developer', date: '2024-04-01', time: '09:00 AM', calender_plateform: 'Google Calendar', 'meeting_platefrom': 'Zoom', folder: 'Project X', record: 'Yes', action: 'Edit' },
            { name: 'Bonnie Green', type: 'Designer', date: '2024-04-02', time: '10:30 AM', calender_plateform: 'Outlook', 'meeting_platefrom': 'Teams', folder: 'Project Y', record: 'No', action: 'Edit' },
            { name: 'Jese Leos', type: 'Vue JS Developer', date: '2024-04-03', time: '11:45 AM', calender_plateform: 'Apple Calendar', 'meeting_platefrom': 'Skype', folder: 'Project Z', record: 'Yes', action: 'Edit' },
            { name: 'Thomas Lean', type: 'UI/UX Engineer', date: '2024-04-04', time: '01:00 PM', calender_plateform: 'Yahoo Calendar', 'meeting_platefrom': 'WebEx', folder: 'Project A', record: 'No', action: 'Edit' },
            { name: 'Leslie Livingston', type: 'SEO Specialist', date: '2024-04-05', time: '02:15 PM', calender_plateform: 'Microsoft Calendar', 'meeting_platefrom': 'Google Meet', folder: 'Project B', record: 'Yes', action: 'Edit' }
        ],
      actionList: ['Reward', 'Promote', 'Activate account', 'Delete User'],
      menuItems: [
        { label: 'Profile', icon: 'fas fa-home', active: false },
        { label: 'Dashboard', icon: 'fas fa-home', active: true },
        { label: 'Settings', icon: 'fas fa-home', active: false },
        { label: 'Contacts', icon: 'fas fa-home', active: false },
        { label: 'Disabled', icon: 'fas fa-home', active: false, disabled: true }
      ]
    };
  },
  methods : {
    handleTabClick (item) {
        console.log(item)
    }
  }
}
</script>
