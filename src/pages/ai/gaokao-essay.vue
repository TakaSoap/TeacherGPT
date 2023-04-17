<template>
    <div class="main-view">
        <n-space vertical size="large">
            <n-h1 prefix="bar">
                <n-text type="primary"> 高考作文批改 </n-text>
            </n-h1>
            <GaokaoEssayInput />
            <n-collapse-transition :show="gaokaoEssayStore.submissionStatus != 'NotSubmitted'">
                <GaokaoEssayFeedback />
            </n-collapse-transition>
        </n-space>
    </div>
</template>

<script setup lang="ts">
import { useGaokaoEssayStore, Essay, EssayFeedback } from '@/stores/gaokaoEssay';

const gaokaoEssayStore = useGaokaoEssayStore();
</script>

<style scoped>
.main-view {
    padding: 2rem 3.5rem;
}
</style>