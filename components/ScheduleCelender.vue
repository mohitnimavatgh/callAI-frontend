<template>
    <div :class="isDarkMode ? 'dark-mode' : ''" class="pb-10">
      <div class="">
        <FullCalendar id="fullCalendar" :options="calendarOptions">
          <template v-slot:eventContent="arg">
            <b>{{ arg.timeText }}</b>
            <i>{{ arg.event.title }}</i>
          </template>
        </FullCalendar>
      </div>
    </div>
  </template>
  
<script setup lang="ts">
import { useGloble } from '~/stores/globle'
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
//@ts-ignore
import timeGridPlugin from '@fullcalendar/timegrid'
//@ts-ignore
import interactionPlugin from '@fullcalendar/interaction'

const props = defineProps(['event'])
const globle = useGloble()
const isDarkMode = ref<boolean>()

watchEffect(() => {
    isDarkMode.value = globle.mode === 'dark'
})

let eventGuid: number = 0;
let todayStr: string = new Date().toISOString().replace(/T.*$/, ''); // YYYY-MM-DD of today

const createEventId = (): string => {
    return String(eventGuid++); 
}

const events = ref<any>([
    {
        id: createEventId(),
        title: 'All-day event',
        start: todayStr,
    },
    {
        id: createEventId(),
        title: 'Timed event',
        start: todayStr + 'T01:00:00',
    },
    {
        id: createEventId(),
        title: 'Event 1',
        start: '2024-06-15'
    },
    {
        id: createEventId(),
        title: 'Event 2',
        start: '2024-06-15'
    },
])

const calendarOptions = {
    plugins: [
        dayGridPlugin,
        timeGridPlugin,
        interactionPlugin
    ],
    headerToolbar: {
        left: 'title',
        center: '',
        right: 'dayGridMonth,timeGridWeek,timeGridDay'
    },
    editable: false,
    eventColor: '#007d88',
    selectable: false,
    selectMirror: true,
    dayMaxEvents: true,
    weekends: true,
    initialEvents: events.value,
    initialView: 'dayGridMonth',
}

</script>
  
<style scoped>
:deep(.fc-button-primary) {
    text-transform: capitalize;
    font-size: 14px;
    background: #007d88 !important;
    border-color: #007d88 !important;
}

:deep(.fc-toolbar-title),
:deep(.fc-scrollgrid-sync-inner) {
    color: #374151;
}

:deep(.fc-button-group .fc-button-primary) {
    text-transform: capitalize;
    color: #38404d !important;
    background: white !important;
    border-color: #007d88 !important;
}

:deep(.fc-button-group .fc-button-active) {
    text-transform: capitalize;
    color: #00626a !important;
    background: white !important;
    border-color: #00626a !important;
}

:deep(.fc-button-group .fc-button) {
    border-radius: 0.7em;
    font-size: 14px;
    padding: 8px 20px;
}

:deep(.fc-day-today){
    background: #f0f7f9 !important;
}

:deep(.fc-button:focus) {
    box-shadow: none !important;
}

:deep(.fc-daygrid-event-harness){
    padding: 0 5px;
}

:deep(.fc-daygrid-dot-event){
    padding: 4px 10px;
    background: #007d88;
    color: white;
}

:deep(.fc-event .fc-event-main){
    padding: 4px 10px;
}

:deep(.fc-toolbar-chunk):nth-child(1) {
    display: flex;
    align-items: center;
}

@media only screen and (max-width: 530px) {
    :deep(.fc-toolbar) {
        flex-direction: column;
        gap: 10px;
    }

    :deep(.fc-button-primary) {
        font-size: 12px;
    }
}

@media only screen and (max-width: 767px) {
    :deep(.fc-toolbar-title) {
        font-size: 20px !important;
    }

    :deep(.fc-button-primary) {
        font-size: 14px;
    }
}

@media only screen and (min-width: 768px) and (max-width: 1079px) {
    :deep(.fc-toolbar-title) {
        font-size: 20px !important;
    }
}

/* Dark Mode Styles */
.dark-mode :deep(.fc-button-primary) {
    background: #007d88 !important;
    border-color: #007d88 !important;
    color: #eaeaea !important;
}

.dark-mode :deep(.fc-day-today){
    background: #374151 !important;
}

.dark-mode :deep(.fc-toolbar-title),
.dark-mode :deep(.fc-scrollgrid-sync-inner) {
    color: #ccd0d6 !important;
}

.dark-mode :deep(.fc-scrollgrid-shrink-cushion){
    color: #ccd0d6 !important;
}

/* .dark-mode :deep(.fc-button-group .fc-button-primary) {
    background: #121212 !important;
    border-color: #1a1a2e !important;
    color: #eaeaea !important;
} */

.dark-mode :deep(.fc-button-group .fc-button) {
    background: #374151 !important;
    border-color: #6b7280 !important;
    color: #eaeaea !important;
}

.dark-mode :deep(.fc-button-group .fc-button-active) {
    color: white !important;
    border-color: #6b7280 !important;
}

.dark-mode :deep(.fc-button:focus) {
    box-shadow: none !important;
}

.dark-mode :deep(.fc-theme-standard td), .dark-mode :deep(.fc-theme-standard th), .dark-mode :deep(.fc-theme-standard .fc-scrollgrid){
    border-color: #6b7280;
}

.dark-mode :deep(.fc-toolbar-chunk):nth-child(1) {
    display: flex;
    align-items: center;
    color: #eaeaea;
}
</style>
