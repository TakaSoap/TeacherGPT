<template>
    <div>
        <n-card size="medium" style="max-width: 50rem">
            <template #header>
                <n-h2 style="margin: 0">
                    <n-text type="primary"> 作文 </n-text>
                </n-h2>
            </template>
            <template #header-extra v-if="essayStore.submissionStatus != 'NotSubmitted'">
                <n-space>显示作文<n-switch v-model:value="isEssayShown" /></n-space>
            </template>
            <n-collapse-transition :show="!isEssayShown && essayStore.submissionStatus != 'NotSubmitted'">
                <n-text italic>作文已隐藏</n-text>
            </n-collapse-transition>
            <n-collapse-transition :show="essayStore.submissionStatus === 'NotSubmitted'">
                <n-form :show-label="false">
                    <n-form-item path="essay" :show-feedback="false">
                        <n-input
                            :status="essayStatus"
                            :autosize="{
                                minRows: 5,
                                maxRows: 20
                            }"
                            v-model:value="essayStore.essay"
                            type="textarea"
                            placeholder="在此输入作文"
                            :disabled="isInputsDisabled"
                        />
                    </n-form-item>
                    <n-space>
                        <n-form-item>
                            <n-radio-group v-model:value="essayStore.audience">
                                <n-radio-button value="teacher"> 面向教师 </n-radio-button>
                                <n-radio-button value="student"> 面向学生 </n-radio-button>
                            </n-radio-group>
                        </n-form-item>
                        <n-form-item>
                            <n-radio-group v-model:value="essayStore.level">
                                <n-radio-button value="primary"> 小学 </n-radio-button>
                                <n-radio-button value="middle"> 初中 </n-radio-button>
                                <n-radio-button value="high"> 高中 </n-radio-button>
                            </n-radio-group>
                        </n-form-item>
                    </n-space>
                </n-form>
            </n-collapse-transition>
            <div v-if="essayStore.submissionStatus != 'NotSubmitted'" style="padding-bottom: 1rem">
                <n-collapse-transition :show="isEssayShown">
                    <n-p v-for="(line, index) in essayLines" :key="index">
                        {{ line }}
                    </n-p>
                </n-collapse-transition>
            </div>
            <n-space v-if="essayStore.submissionStatus === 'NotSubmitted'">
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
            <n-button v-else :disabled="essayStore.submissionStatus === 'Submitting'" @click="resetForm" secondary type="error">
                <template #icon>
                    <n-icon>
                        <RefreshOutline />
                    </n-icon>
                </template>
                清空作文和批改结果
            </n-button>
        </n-card>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { PaperPlaneOutline, RefreshOutline } from '@vicons/ionicons5';
import { useMessage } from 'naive-ui';
import { useEssayStore } from '@/stores/essay';

const message = useMessage();
const essayStore = useEssayStore();

const api = useAPI();

const essayStatus = ref('');
const isInputsDisabled = ref(false);
const isEssayShown = ref(false);

const essayLines = computed(() => {
    return essayStore.essay.split('\n');
});

const audience = ref('teacher');

function resetForm() {
    essayStore.resetEssay();
    essayStatus.value = '';
}

function submitEssay() {
    let errorFlag = false;

    // Validate form
    if (essayStore.essayLength === 0) {
        message.error('请输入内容');
        essayStatus.value = 'error';
        errorFlag = true;
    } else if (essayStore.essayLength > 2000) {
        message.error('作文长度不能超过 2000 个字符');
        essayStatus.value = 'error';
        errorFlag = true;
    }

    if (errorFlag) {
        return;
    }

    essayStatus.value = '';
    isInputsDisabled.value = true;
    essayStore.setSubmitting();

    api.essayFirstMessage({essay: essayStore.essay, audience: essayStore.audience, level: essayStore.level})
        .then((response) => {
            essayStore.setSubmitted();
            essayStore.setEssayFeedback(response.data);

            // Save the first message (the feedback) from backend
            essayStore.addFollowupMessage({
                role: 'assistant',
                content: JSON.stringify(response.data)
            });
        })
        .catch((error) => {
            message.error('服务器错误\n', error);
            essayStore.setNotSubmitted();
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
