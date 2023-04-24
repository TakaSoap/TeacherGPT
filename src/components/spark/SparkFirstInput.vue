<template>
    <div>
        <n-card size="medium" style="max-width: 50rem">
            <n-form>
                <n-form-item path="objective" :show-feedback="false" label="我想将">
                    <n-input :status="objectiveStatus" v-model:value="sparkStore.firstMessage.objective" :disabled="sparkStore.isFirstMessageSent" />
                </n-form-item>
                <n-form-item path="level" :show-feedback="false" label="教给">
                    <n-input :status="levelStatus" v-model:value="sparkStore.firstMessage.level" :disabled="sparkStore.isFirstMessageSent" />
                </n-form-item>
            </n-form>

            <n-button v-if="!sparkStore.isFirstMessageSent" @click="submit" :loading="sparkStore.isWaiting" type="primary">
                <template #icon>
                    <n-icon>
                        <SparklesOutline />
                    </n-icon>
                </template>
                迸发灵感
            </n-button>
        </n-card>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { SparklesOutline } from '@vicons/ionicons5';
import { useMessage } from 'naive-ui';
import { useSparkStore } from '@/stores/spark';

const message = useMessage();
const sparkStore = useSparkStore();

const api = useAPI();

const levelStatus = ref('');
const objectiveStatus = ref('');

function submit() {
    sparkStore.isWaiting = true;

    let errorFlag = false;

    // Validate form
    if (sparkStore.firstMessage.objective.length === 0) {
        objectiveStatus.value = 'error';
        errorFlag = true;
    }

    if (sparkStore.firstMessage.level.length === 0) {
        levelStatus.value = 'error';
        errorFlag = true;
    }

    if (errorFlag) {
        return;
    }

    levelStatus.value = '';

    api.sparkFirstMessage(sparkStore.firstMessage.objective, sparkStore.firstMessage.level)
        .then((response) => {
            sparkStore.isFirstMessageSent = true;
            sparkStore.firstAnswer = response.data;
        })
        .catch((error) => {
            message.error('服务器错误\n', error);
        })
        .finally(() => {
            sparkStore.isWaiting = false;
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
