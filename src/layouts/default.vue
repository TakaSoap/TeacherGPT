<template>
    <n-layout position="absolute" :native-scrollbar="false">
        <img src="@/assets/hero-gradient.svg" :style="{ opacity: backgroundOpacity }" class="background" alt="background" />
        <n-layout-header><AppHeader /></n-layout-header>
        <n-layout-content content-style="min-height: 25rem; max-height: var(--content-height);" has-slider :native-scrollbar="false">
            <slot />
        </n-layout-content>
        <n-layout-footer><AppFooter /></n-layout-footer>
    </n-layout>
</template>

<script setup lang="ts">
import { useThemeStore } from '@/stores/theme';
const themeStore = useThemeStore();

const backgroundOpacity = computed(() => {
    if (themeStore.isDarkTheme) return 0.3;
    else return 0.5;
});
</script>

<style scoped>
.background {
    top: 0;
    right: 0;
    max-width: 100vw;
    max-height: 100vh;
    position: absolute;
    margin-top: 0;
    margin-right: 0;
    overflow: hidden;
    z-index: 100;
    pointer-events: none;
    transition: all 2s;
}
</style>
