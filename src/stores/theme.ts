import { darkTheme, useOsTheme } from 'naive-ui';
import { BuiltInGlobalTheme } from 'naive-ui/lib/themes/interface';
import { defineStore } from 'pinia';

export const useThemeStore = defineStore('themeController', () => {
    const osThemeRef = useOsTheme();

    console.log(osThemeRef.value);

    const theme: Ref<null | BuiltInGlobalTheme> = ref(osThemeRef.value === 'dark' ? darkTheme : null);
    const isDarkTheme: Ref<boolean> = ref(osThemeRef.value === 'dark' ? true : false);

    function toggleTheme() {
        isDarkTheme.value = !isDarkTheme.value;
        if (isDarkTheme.value) {
            theme.value = darkTheme;
        } else {
            theme.value = null;
        }
    }
    return { theme, isDarkTheme, toggleTheme };
});
