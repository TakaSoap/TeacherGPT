export const loadingBarRef: Ref<any> = ref(null);

export default function (router: any) {
    router.beforeEach((to: any, from: any, next: any) => {
        if (!from || to.path !== from.path) {
            if (loadingBarRef.value) {
                loadingBarRef.value.start();
            }
        }
        next();
    });

    router.afterEach((to: any, from: any) => {
        if (!from || to.path !== from.path) {
            if (loadingBarRef.value) {
                loadingBarRef.value.finish();
            }
            if (to.hash && to.hash !== from.hash) {
                nextTick(() => {
                    const el = document.querySelector(to.hash);
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                });
            }
            nextTick(() => {
                const h1s = document.getElementsByTagName('h1');
                if (to.name !== 'index' && h1s.length !== 0) {
                    document.title = h1s[0].textContent + ' - TeacherGPT';
                }
                // else, defined in index.vue
            });
        }
    });

    router.onError((err: any) => {
        loadingBarRef.value.error();
        console.error(err);
    });
}