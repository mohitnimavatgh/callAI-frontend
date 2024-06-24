<script setup lang="ts">
import { initFlowbite } from 'flowbite'
import { useMeetings } from '@/stores/user/meetings'
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";

const route = useRoute()
const { $toast } = useNuxtApp()
const props = defineProps(['data'])
const edit = ref<boolean>(false)
const meetings = useMeetings()
const actions = ref<any>(JSON.parse(JSON.stringify(props.data)))

onMounted(async () => {
    await initFlowbite();
});

const itemValidationSchema = {
    required
};

const rules = computed(() => ({
    actions: actions.value.map(() => itemValidationSchema),
}));

const v$ = useVuelidate(rules, { actions });

const addData = () => {
    edit.value = true;
    if (actions.value[actions.value.length - 1] !== '') {
        actions.value.push('');
    }
};

const SubmitAction = () => {
    v$.value.$touch();
    if (!v$.value.$invalid) {
        meetings.updateNextActions({ id: route.params.id, action: actions.value }).then((res) => {
            $toast.success('Next Step updated successfully', { duration: 5000 });
            v$.value.$reset()
        }).catch((err) => {
            catchResponse(err);
        });
        edit.value = false;
    }
};

const catchResponse = (err: any) => {
    if (err?.response?.status == 422) {
        let data = err?.response?.data?.data;
        if (data) {
            let keys = Object.keys(data)[0];
            let firstValue = data[keys];
            $toast.error(firstValue[0], { duration: 5000 });
        } else {
            if (!err?.response?.data?.success) {
                $toast.error(err?.response?.data?.message, { duration: 5000 });
            } else {
                $toast.error('Something went wrong!', { duration: 5000 });
            }
        }
    } else {
        if (!err?.response?.data?.success) {
            $toast.error(err?.response?.data?.message, { duration: 5000 });
        } else {
            $toast.error('Something went wrong!', { duration: 5000 });
        }
    }
};

const cancelSubmit = () => {
    if (actions.value.length > 0) {
        actions.value.pop()
    }
    actions.value = JSON.parse(JSON.stringify(meetings.nextActions));
    edit.value = false;
    v$.value.$reset()
};

const deleteNextAction = (index: number) => {
    actions.value.splice(index, 1);
};

</script>

<template>
    <div id="accordion-color" data-accordion="collapse"
        data-active-classes="bg-white dark:bg-gray-700 rounded-xl focus:bg-white text-gray-500 dark:text-gray-300">
        <h2 id="accordion-color-heading-1">
            <button type="button" class="accordionBtn"
                data-accordion-target="#accordion-color-body-1" aria-expanded="true" aria-controls="accordion-color-body-1">
                <span class="font-semibold">Next Actions</span>
                <svg data-accordion-icon class="w-3 h-3 rotate-180 shrink-0" aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M9 5 5 1 1 5" />
                </svg>
            </button>
        </h2>
        <div id="accordion-color-body-1" class="hidden rounded-b-md dark:bg-gray-700 pb-4 overflow-hidden"
            aria-labelledby="accordion-color-heading-1">
            <div class="dark:bg-gray-700 pt-0 pb-3 px-5">
                <ul :class="!edit ? '' : ''">
                    <li v-for="(item, index) in actions" :key="index"
                        :class="{ 'mt-0': index !== 0, 'py-2 mt-2 border dark:border-gray-500 border-gray-300': !edit }"
                        class="flex py-1 rounded-md justify-between items-center ">
                        <div v-if="!edit" class="font-medium px-6 text-gray-500 text-[13px] dark:text-gray-300">
                            {{ item }}
                        </div>

                        <FormInput v-else :pointer="false" @changeType="deleteNextAction(index)" class="w-full" type="text"
                            v-model="v$.actions[index].$model" icon="fa-solid fa-xmark" iconPosition="right"
                            :hideError="true" :errors="v$.actions[index].$errors" />
                    </li>
                    <!-- <li v-if="edit" :class="!edit ? 'border dark:border-gray-500 border-gray-400' : ''" class="flex mt-2 rounded-md justify-between items-center py-1 px-4">
                        <FormInput :onBlur="true" @focusOut="updateNextAction" class="w-full" v-model="nextActions[nextActions?.length]" type="text"/>
                    </li> -->
                    <li v-if="!actions?.length && !edit"
                        class="flex mt-2 rounded-md justify-center text-lg text-gray-500 dark:text-gray-300 font-semibold items-center py-1 px-4">
                        Action Not Found
                    </li>
                </ul>
            </div>
            <div class="flex dark:border-gray-500 bg-white dark:bg-gray-700 px-4 items-center justify-between">
                <div class="flex items-center">
                    <Button v-if="edit" class="scale-90" text="Submit" @click="SubmitAction" />
                    <Button v-if="edit" class="scale-90" text="Cancel" @click="cancelSubmit" />
                </div>
                <Button class="scale-90" text="Add Next Step" @click="addData" />
            </div>
        </div>
    </div>
</template>

<style>
.accordionBtn{
    @apply flex items-center dark:text-gray-300 text-gray-600 font-semibold justify-between w-full p-5 font-medium dark:bg-gray-700 gap-3 !important;
}
</style>