<template>
    <div>
        <n-card size="medium" style="max-width: 800px">
            <template #header>
                <n-h2 style="margin: 0">
                    <n-text type="primary"> 作文 </n-text>
                </n-h2>
            </template>
            <template #header-extra v-if="gaokaoEssayStore.submissionStatus != 'NotSubmitted'">
                <n-space>显示作文<n-switch v-model:value="isEssayShown" /></n-space>
            </template>
            <n-collapse-transition :show="!isEssayShown && gaokaoEssayStore.submissionStatus != 'NotSubmitted'">
                <n-text italic>作文已隐藏</n-text>
            </n-collapse-transition>
            <n-collapse-transition :show="gaokaoEssayStore.submissionStatus === 'NotSubmitted'">
                <n-form>
                    <n-form-item path="topic" :show-feedback="false" label="作文题目">
                        <n-input
                            :status="topicStatus"
                            v-model:value="gaokaoEssayStore.essay.topic"
                            type="textarea"
                            placeholder="在此输入作文题目"
                            :disabled="isInputsDisabled"
                        />
                    </n-form-item>
                    <n-form-item path="title" :show-feedback="false" label="作文标题">
                        <n-input
                            :status="titleStatus"
                            v-model:value="gaokaoEssayStore.essay.title"
                            type="text"
                            placeholder="在此输入作文标题"
                            :disabled="isInputsDisabled"
                        />
                    </n-form-item>
                    <n-form-item path="essay" :show-feedback="false" label="作文正文">
                        <n-input
                            :status="essayStatus"
                            v-model:value="gaokaoEssayStore.essay.content"
                            type="textarea"
                            placeholder="在此输入作文"
                            :disabled="isInputsDisabled"
                        />
                    </n-form-item>
                </n-form>
            </n-collapse-transition>
            <div v-if="gaokaoEssayStore.submissionStatus != 'NotSubmitted'" style="padding-bottom: 1rem">
                <n-collapse-transition :show="isEssayShown">
                    <n-blockquote>
                        <n-text type="secondary"> {{ gaokaoEssayStore.essay.topic }} </n-text>
                    </n-blockquote>
                    <n-h3>
                        <n-text> {{ gaokaoEssayStore.essay.title }} </n-text>
                    </n-h3>
                    <n-p v-for="(line, index) in essayLines" :key="index">
                        {{ line }}
                    </n-p>
                </n-collapse-transition>
            </div>
            <n-space v-if="gaokaoEssayStore.submissionStatus === 'NotSubmitted'">
                <n-button @click="submitEssay" type="primary">
                    <template #icon>
                        <n-icon>
                            <PaperPlaneOutline />
                        </n-icon>
                    </template>
                    开始批改
                </n-button>
                <n-button @click="resetForm" secondary type="error">
                    <template #icon>
                        <n-icon>
                            <RefreshOutline />
                        </n-icon>
                    </template>
                    清空作文
                </n-button>
            </n-space>
        </n-card>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { PaperPlaneOutline, RefreshOutline } from '@vicons/ionicons5';
import { useMessage } from 'naive-ui';
import { useGaokaoEssayStore, Essay } from '@/stores/gaokaoEssay';

const message = useMessage();
const gaokaoEssayStore = useGaokaoEssayStore();

const api = useAPI();

const essayStatus = ref('');
const topicStatus = ref('');
const titleStatus = ref('');
const isInputsDisabled = ref(false);
const isEssayShown = ref(false);

const essayLines = computed(() => {
    return gaokaoEssayStore.essay.content.split('\n');
});

function resetForm() {
    gaokaoEssayStore.resetEssay();
    essayStatus.value = '';
}

function submitEssay() {
    let errorFlag = false;

    // Validate form
    if (gaokaoEssayStore.topicLength === 0) {
        message.error('请输入作文题目要求');
        topicStatus.value = 'error';
        errorFlag = true;
    }

    if (gaokaoEssayStore.titleLength === 0) {
        message.error('请输入作文题目');
        titleStatus.value = 'error';
        errorFlag = true;
    }

    if (gaokaoEssayStore.essayLength === 0) {
        message.error('请输入内容');
        essayStatus.value = 'error';
        errorFlag = true;
    } else if (gaokaoEssayStore.essayLength > 1200) {
        message.error('作文长度不能超过 1200 字');
        essayStatus.value = 'error';
        errorFlag = true;
    }

    if (errorFlag) {
        return;
    }

    essayStatus.value = '';
    isInputsDisabled.value = true;
    gaokaoEssayStore.setSubmitting();

    api.gaokaoEssayFirstMessage(gaokaoEssayStore.essay)
        .then((response) => {
            gaokaoEssayStore.setSubmitted();
            gaokaoEssayStore.setEssayFeedback(response.data);

            // Save the first message (the feedback) from backend
            gaokaoEssayStore.addFollowupMessage({
                role: 'assistant',
                content: JSON.stringify(response.data)
            });
        })
        .catch((error) => {
            message.error('服务器错误\n', error);
            gaokaoEssayStore.setNotSubmitted();
        })
        .finally(() => {
            isInputsDisabled.value = false;
        });
}
</script>

<style scoped>
.n-form-item {
    padding-bottom: 1rem;
}

.multiline-text {
    white-space: pre-wrap;
}
</style>
