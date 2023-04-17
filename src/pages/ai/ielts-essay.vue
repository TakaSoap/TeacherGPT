<template>
    <div class="main-view">
        <n-space vertical size="large">
            <n-h1 prefix="bar">
                <n-text type="primary"> 雅思作文批改（Task 2） </n-text>
            </n-h1>
            <IELTSEssayInput />
            <n-collapse-transition :show="ieltsEssayStore.submissionStatus != 'NotSubmitted'">
                <IELTSEssayFeedback />
            </n-collapse-transition>
        </n-space>
    </div>
</template>

<script setup lang="ts">
import { useIELTSEssayStore, Essay, EssayFeedback } from '@/stores/ieltsEssay';

const ieltsEssayStore = useIELTSEssayStore();
</script>

<style scoped>
.main-view {
    padding: 2rem 3.5rem;
}
</style>