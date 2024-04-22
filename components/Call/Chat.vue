<script setup lang="ts">

const props = defineProps({
    meetingDetail: null,
});
const detail = ref(null)
const faqsList = computed(() => {
    detail.value = props.meetingDetail
    if(props.meetingDetail?.faqs){
        return JSON.parse(JSON.parse(props.meetingDetail?.faqs))
    }
    return  [];
});
   

const chats = ref([
  { type: 'sender', message: "Hey, how's it going? I just wanted to catch up and see what's new with you. It feels like it's been ages since we last talked." },
  { type: 'receiver', message: "I'm doing well, thanks. Just been busy with work and life in general. How about you? What have you been up to lately?" },
]);

</script>
<template>
    <div class="mt-5">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div class="col-span-2 ">
            <div class="bg-white rounded rounded-lg">
                <div class="p-5 h-600 min-h-600 overflow-y-scroll ">
                    <CallChatTiles :lists="chats"/>
                </div>
                <div class="p-4">
                    <FormInput size="large" placeholder="Ask Someting"/>
                </div>
            </div>
            <div class="mt-5">
                <label class="block mb-2 text-sm font-medium text-gray-500 dark:text-white">Meeintg Summary</label>
                <div class="bg-white rounded-lg p-5 text-gray-600 text-sm leading-7">
                    {{ detail?.summary }}
                </div>
            </div>
        </div>
        <div>
            <div class="bg-white rounded"><Accordion  :title="`Meeting FAQ's`" :icon="'fas fa-circle-question'" :accordions="faqsList" /></div>
        </div>
      </div>
    </div>
</template>
