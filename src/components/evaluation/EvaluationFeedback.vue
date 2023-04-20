<template>
    <div>
        <n-space :size="6">
            <n-h3 class="feedback-aspect">
                <n-text> {{ name }} </n-text>
            </n-h3>
        </n-space>
        <n-p style="margin-top: 0;">{{ evaluation }}</n-p>
    </div>
</template>

<script setup lang="ts">

// Make it lose reactivity on purpose.
const props = defineProps<{
    name: string;
    evaluation: string;
}>();
const name = props.name;
const evaluation = props.evaluation;

</script>

<style scoped>

.feedback-aspect {
    margin: 0.5rem 0 0.5rem 0;
}
</style>
