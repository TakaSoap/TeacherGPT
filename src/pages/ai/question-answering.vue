<template>
    <div>
        <n-space vertical size="large">
            <n-h1 prefix="bar">
                <n-text type="primary"> 通用问答 </n-text>
            </n-h1>
            <QuestionInput />
            <n-collapse-transition :show="gaokaoEssayStore.submissionStatus != 'NotSubmitted'">
                <QuestionFeedback />
            </n-collapse-transition>
        </n-space>
    </div>
</template>

<script setup lang="ts">
import { useGaokaoEssayStore, Essay, EssayFeedback } from '@/stores/gaokaoEssay';

const gaokaoEssayStore = useGaokaoEssayStore();
</script>
