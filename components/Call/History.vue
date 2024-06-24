<script setup lang="ts">
import { useChatToCall } from '@/stores/user/chatToCall'
import { useLoader } from "@/stores/loader";
const emit = defineEmits(['changeTab'])
const chatToCall = useChatToCall()
const loader = useLoader()
const { $toast } = useNuxtApp()
const route = useRoute()
const router = useRouter()
const tableHeadings = ref([
    { title: 'Title', value: 'title' },
    { title: 'Question', value: 'question' },
    { title: 'Answer', value: 'answer' },
    { title: 'Update History Date', value: 'date' },
    // { title: 'Last Update', value: 'updated_at' },
    { title: 'Action', value: 'action' },
])
const historyData = ref([]);

const history = ref<any>({
    meeting_id: route.params.id,
    page: 1,
    search: ''
})

const addQueryParams = (id: any) => {
    const queryParams = { ...route.query };

    queryParams.history = id;

    router.replace({ query: queryParams });
}

const updateTitle = (index : number, value: string) => {
    let history_id = historyData.value.data[index]?.id
    alert(value)
}

const viewCall = (index: any, name: string) => {
    let history_id = historyData.value.data[index]?.id
    addQueryParams(history_id);
    chatToCall.setChatTitle(name)
    setTimeout(() => {
        emit('changeTab')
    }, 500)
}

onMounted(() => {
    getHistory();
})

const getHistory = () => {
    loader.loading = true
    chatToCall.getHistory(history.value).then((res: any) => {
        historyData.value = res
        loader.loading = false
    }).catch((err: any) => {
        catchResponse(err)
        loader.loading = false
    })
    router.replace({ query: {} })
}

const catchResponse = (err: any) => {
    if (err?.response?.status == 422) {
        let data = err?.response?.data?.data
        if (data) {
            let keys = Object.keys(data)[0];
            let firstValue = data[keys];
            $toast.error(firstValue[0], { duration: 5000 })
        } else {
            if (!err?.response?.data?.success) {
                $toast.error(err?.response?.data?.message, { duration: 5000 })
            } else {
                $toast.error('something went wrong...!', { duration: 5000 })
            }
        }
    } else {
        if (!err?.response?.data?.success) {
            $toast.error(err?.response?.data?.message, { duration: 5000 })
        } else {
            $toast.error('something went wrong...!', { duration: 5000 })
        }
    }
}

const handleSearch = (data: any) => {
    history.value.search = data
    getHistory()
}

const historyPageChange = (page: any) => {
    history.value.page = page
    getHistory()
};

</script>

<template>
    <div class="box mt-5 bg-white dark:bg-gray-800">
        <Table :editName="true" :headings="tableHeadings" :data="historyData.data" :isSearchable="true" @changeTitle="updateTitle" title="History"
            @search="handleSearch">
            <template v-slot:action="{ item, value, index }">
                <div class="flex justify-start">
                    <i @click="viewCall(index, item.title)" class="fas fa-eye cursor-pointer text-blue-400"></i>
                </div>
            </template>
        </Table>
        <Pagination v-if="historyData && historyData.total" class="mt-4 flex justify-end" :totalRecords="historyData.total"
            :currentPage="historyData.page" :recordsPerPage="historyData.per_page" @pageChange="historyPageChange" />
    </div>
</template>