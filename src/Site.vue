<template>
    <div>
        <NuxtLayout>
            <n-spin :show="loading">
                <div class="main-container">
                    <NuxtPage v-if="!loading" />
                </div>
            </n-spin>
        </NuxtLayout>
    </div>
</template>

<script setup lang="ts">
import { useLoadingBar, useMessage } from 'naive-ui';
import { loadingBarRef } from '@/composables/loadingBarAndTitleControl.js';

const router = useRouter();
loadingBarAndTitleControl(router);

const loading = ref(true);

const route = useRoute();
const loadingBar = useLoadingBar();

const isRouterActive = ref(true);

const message = useMessage();

async function reload() {
    isRouterActive.value = false;
    await nextTick();
    isRouterActive.value = true;
}

onMounted(() => {
    loadingBarRef.value = loadingBar;
    loadingBar.finish();
    loading.value = false;
});

watch(
    () => route.path,
    () => {
        console.log(route.path);
    }
);
</script>

<style scoped>
/* .main-container {
    min-height: calc(100vh - var(--header-height));
}

.site-header {
    height: var(--header-height);
} */
</style>
