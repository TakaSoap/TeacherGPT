<template>
    <div>
        <n-layout position="absolute" style="min-height: var(--content-height)" :native-scrollbar="false" has-sider>
            <n-layout-content class="question-page">
                <n-space vertical size="large">
                    <n-h1 prefix="bar">
                        <n-text type="primary"> 灵感火花 SparkEdu </n-text>
                    </n-h1>
                    
                    <SparkFirstInput />

                    <n-collapse-transition :show="sparkStore.isWaiting || sparkStore.isFirstMessageSent">
                        <n-card style="max-width: 50rem">
                            <n-space vertical style="padding-bottom: 1.5rem">
                                <SparkFeedback
                                    v-if="sparkStore.firstAnswer != ''"
                                    :question="'回答'"
                                    :answer="sparkStore.firstAnswer"
                                    :waiting="false"
                                />

                                <SparkFeedback
                                    v-for="message in sparkStore.conversation"
                                    :question="message.question"
                                    :answer="message.answer"
                                    :waiting="false"
                                />

                                <div v-if="sparkStore.isWaiting">
                                    <SparkFeedback
                                        v-if="sparkStore.question != ''"
                                        :question="sparkStore.question"
                                        :answer="sparkStore.answer"
                                        :waiting="true"
                                    />

                                    <SparkFeedback
                                        v-else
                                        :question="'回答'"
                                        :answer="sparkStore.answer"
                                        :waiting="true"
                                    />
                                </div>
                            </n-space>
                        </n-card>
                    </n-collapse-transition>
                </n-space>
            </n-layout-content>

            <n-layout-footer position="absolute">
                <SparkInput class="question-input" :disabled="isLimitReached" />
            </n-layout-footer>
        </n-layout>
    </div>
</template>

<script setup lang="ts">
import { SparklesOutline } from '@vicons/ionicons5';
import { useSparkStore } from '@/stores/spark';

const sparkStore = useSparkStore();
const isLimitReached = ref(false);
</script>

<style scoped>
.question-page {
    margin: 2rem 3.5rem;
}
.question-input {
    margin: 1rem 3.5rem;
}
</style>
