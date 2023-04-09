<template>
    <div>
        <n-layout position="absolute" style="min-height: calc(var(--content-height) - 4rem)" :native-scrollbar="false" has-sider>
            <n-layout-content class="question-page">
                <n-space vertical size="large">
                    <n-h1 prefix="bar">
                        <n-text type="primary"> 通用问答 </n-text>
                    </n-h1>
                    <n-text depth="3" italic>暂无问题，开始提问吧！</n-text>
                    <n-collapse-transition :show="gaokaoEssayStore.submissionStatus != 'NotSubmitted'">
                        <QuestionFeedback />
                    </n-collapse-transition>
                    
                </n-space>
            </n-layout-content>

            <n-layout-footer position="absolute">
                <QuestionInput class="question-input"  />
            </n-layout-footer>
        </n-layout>
    </div>
</template>

<script setup lang="ts">
import { useGaokaoEssayStore, Essay, EssayFeedback } from '@/stores/gaokaoEssay';

const gaokaoEssayStore = useGaokaoEssayStore();
</script>

<style scoped>
.question-page {
    margin: 2rem 3.5rem;
}
.question-input {
    margin: 1rem 3.5rem;
}
</style>
