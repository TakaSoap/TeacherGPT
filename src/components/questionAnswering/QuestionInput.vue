<template>
    <div style="display: flex">
        <n-input
            type="textarea"
            :autosize="{
                minRows: 1,
                maxRows: 5
            }"
            style="margin-right: 0.5rem"
            v-model:value="QAStore.question.content"
            size="large"
            :loading="QAStore.isWaiting"
            :disabled="QAStore.isWaiting"
            :status="inputStatus"
            placeholder="输入你的问题或需要解释的概念"
        ></n-input>
        <n-tooltip trigger="hover" placement="bottom">
            <template #trigger>
                <n-select
                    style="margin-right: 0.5rem; width: 6rem"
                    v-model:value="QAStore.question.audience"
                    size="large"
                    :options="audiences"
                    :disabled="QAStore.isWaiting"
                />
            </template>
            <n-text>在这里选择回答受众水平</n-text>
        </n-tooltip>

        <n-button size="large" @click="submitQuestion"
            ><template #icon>
                <n-icon>
                    <PaperPlaneOutline />
                </n-icon>
            </template>
            发送
        </n-button>
    </div>
</template>

<script setup lang="ts">
import { PaperPlaneOutline } from '@vicons/ionicons5';
import { useQuestionAnsweringStore } from '@/stores/questionAnswering';

const QAStore = useQuestionAnsweringStore();

const inputStatus = ref('');
const audiences = [
    {
        label: '默认',
        value: 'default'
    },
    {
        label: '小学',
        value: 'primary'
    },
    {
        label: '初中',
        value: 'junior'
    },
    {
        label: '高中',
        value: 'senior'
    }
];

function submitQuestion() {
    if (QAStore.question.content.length === 0) {
        inputStatus.value = 'error';
        return;
    }
    
}
</script>

<style scoped></style>
