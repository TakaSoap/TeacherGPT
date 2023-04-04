<template>
    <div>
        <n-config-provider
            :theme="themeStore.theme"
            :theme-overrides="themeStore.theme === null ? lightThemeOverrides : darkThemeOverrides"
            :locale="zhCN"
            :date-locale="dateZhCN"
        >
            <n-loading-bar-provider>
                <n-message-provider>
                    <n-notification-provider>
                        <n-dialog-provider>
                            <Site />
                        </n-dialog-provider>
                    </n-notification-provider>
                </n-message-provider>
            </n-loading-bar-provider>
        </n-config-provider>
    </div>
</template>

<script setup lang="ts">
import Site from '@/Site.vue';
import { zhCN, dateZhCN, NConfigProvider, darkTheme } from 'naive-ui';
import { useThemeStore } from '@/stores/theme';

const themeStore = useThemeStore();

/**
 * @type import('naive-ui').GlobalThemeOverrides
 */
const lightThemeOverrides = {
    Layout: {
        color: 'rgb(255, 255, 255)',
        colorEmbedded: 'rgb(255, 255, 255)'
    }
    // ...
};

const darkThemeOverrides = {
    Layout: {
        color: 'rgb(16, 16, 20)',
        colorEmbedded: 'rgb(16, 16, 20)'
    }
    // ...
};

const theme = null;
</script>

<style>
:root {
    --header-height: 2.7rem;
    --footer-height: 6.7rem;
    --content-height: calc(100vh - var(--header-height) - var(--footer-height));
}

.page-enter-active,
.page-leave-active {
    transition: all 0.3s;
}
.page-enter-from,
.page-leave-to {
    opacity: 0;
    filter: blur(0.5rem);
}
</style>
