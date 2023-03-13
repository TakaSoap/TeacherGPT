<template>
    <n-layout-header class="nav header" bordered>
        <div class="logo" @click="$router.push('/')">
            <n-button text>
                <n-gradient-text type="primary"> TeacherGPT </n-gradient-text>
            </n-button>
        </div>

        <div class="nav-menu">
            <n-menu mode="horizontal" :value="menuValue" :options="menuOptions" />
        </div>

        <div class="nav-end">
            <n-button size="small" quaternary @click="themeStore.toggleTheme">
                <template #icon>
                    <n-icon>
                        <Sunny v-if="themeStore.isDarkTheme" />
                        <Moon v-else />
                    </n-icon>
                </template>
                切换主题
            </n-button>
        </div>
    </n-layout-header>
</template>

<script setup lang="ts">
import type { MenuOption } from 'naive-ui';
import { RouterLink } from 'vue-router';
import { Sunny, Moon } from '@vicons/ionicons5';
import { useThemeStore } from '@/stores/theme';

const themeStore = useThemeStore();

const route = useRoute();

const menuOptions: MenuOption[] = [
    {
        label: () =>
            h(
                RouterLink,
                {
                    to: '/'
                },
                () => '欢迎'
            ),
        key: 'index'
    },
    {
        label: () =>
            h(
                RouterLink,
                {
                    to: '/ai/'
                },
                () => '工作台'
            ),
        key: 'ai'
    },
    {
        label: () =>
            h(
                RouterLink,
                {
                    to: '/paper'
                },
                () => '论文'
            ),
        key: 'paper'
    }
];

const menuValueRef = computed(() => {
    if (/\/ai/.test(route.path)) return 'ai';
    else if (/\/paper/.test(route.path)) return 'paper';
    else if (route.name === 'index') return 'index';
    return null;
});

const menuValue = ref(menuValueRef);
</script>

<style scoped>
.nav {
    display: grid;
    grid-template-rows: var(--header-height);
    grid-template-columns: 9.375rem auto 9.375rem;
    grid-gap: 0.625rem;
    align-items: center;
    justify-content: space-between;
    padding: 0 var(--side-padding);
    text-align: center;
}

.header {
    height: var(--header-height);
}

.nav-end {
    align-items: center;
}

.nav-menu {
    padding-left: 0rem;
    justify-self: center;
    padding-top: 0rem;
}

/* :deep().n-menu.n-menu--horizontal .n-menu-item-content {
    border-bottom: 0px !important;
} */
</style>
