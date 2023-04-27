<template>
    <div>
        <n-card size="medium" style="max-width: 50rem">
            <template #header>
                <n-h2 style="margin: 0">
                    <n-text type="primary"> 作文 </n-text>
                </n-h2>
            </template>
            <template #header-extra v-if="ieltsEssayStore.submissionStatus != 'NotSubmitted'">
                <n-space>显示作文<n-switch v-model:value="isEssayShown" /></n-space>
            </template>
            <n-collapse-transition :show="!isEssayShown && ieltsEssayStore.submissionStatus != 'NotSubmitted'">
                <n-text italic>作文已隐藏</n-text>
            </n-collapse-transition>
            <n-collapse-transition :show="ieltsEssayStore.submissionStatus === 'NotSubmitted'">
                <n-form>
                    <n-form-item path="topic" :show-feedback="false" label="作文题目">
                        <n-input
                            :status="topicStatus"
                            :autosize="{
                                minRows: 2,
                                maxRows: 5
                            }"
                            v-model:value="ieltsEssayStore.essay.topic"
                            type="textarea"
                            placeholder="在此输入作文题目"
                            :disabled="isInputsDisabled"
                        />
                    </n-form-item>
                    <n-form-item path="essay" :show-feedback="false" label="作文正文">
                        <n-input
                            :status="essayStatus"
                            :autosize="{
                                minRows: 3,
                                maxRows: 20
                            }"
                            v-model:value="ieltsEssayStore.essay.content"
                            type="textarea"
                            placeholder="在此输入作文"
                            :disabled="isInputsDisabled"
                        />
                    </n-form-item>
                </n-form>
            </n-collapse-transition>
            <div v-if="ieltsEssayStore.submissionStatus != 'NotSubmitted'" style="padding-bottom: 1rem">
                <n-collapse-transition :show="isEssayShown">
                    <n-blockquote>
                        <n-text type="secondary"> {{ ieltsEssayStore.essay.topic }} </n-text>
                    </n-blockquote>
                    <n-p v-for="(line, index) in essayLines" :key="index">
                        {{ line }}
                    </n-p>
                </n-collapse-transition>
            </div>
            <n-space v-if="ieltsEssayStore.submissionStatus === 'NotSubmitted'">
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
import { useIELTSEssayStore } from '@/stores/ieltsEssay';

const message = useMessage();
const ieltsEssayStore = useIELTSEssayStore();

const api = useAPI();

const essayStatus = ref('');
const topicStatus = ref('');
const isInputsDisabled = ref(false);
const isEssayShown = ref(false);

const essayLines = computed(() => {
    return ieltsEssayStore.essay.content.split('\n');
});

function resetForm() {
    ieltsEssayStore.resetEssay();
    essayStatus.value = '';
}

function submitEssay() {
    let errorFlag = false;

    // Validate form
    if (ieltsEssayStore.topicLength === 0) {
        message.error('请输入作文题目要求');
        topicStatus.value = 'error';
        errorFlag = true;
    }

    if (ieltsEssayStore.essayLength === 0) {
        message.error('请输入内容');
        essayStatus.value = 'error';
        errorFlag = true;
    } else if (ieltsEssayStore.essayLength > 2000) {
        message.error('作文长度不能超过 2000 个字符');
        essayStatus.value = 'error';
        errorFlag = true;
    }

    if (errorFlag) {
        return;
    }

    essayStatus.value = '';
    isInputsDisabled.value = true;
    ieltsEssayStore.setSubmitting();

    api.ieltsEssayFirstMessage(ieltsEssayStore.essay)
        .then((response) => {
            ieltsEssayStore.setSubmitted();
            ieltsEssayStore.setEssayFeedback(response.data);

            // Save the first message (the feedback) from backend
            ieltsEssayStore.addFollowupMessage({
                role: 'assistant',
                content: JSON.stringify(response.data)
            });
        })
        .catch((error) => {
            message.error('服务器错误\n', error);
            ieltsEssayStore.setNotSubmitted();
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
