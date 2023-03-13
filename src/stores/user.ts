import { defineStore } from 'pinia';

//TODO: Add user support, maybe use Authing
export const useUserStore = defineStore('user', () => {
  let user = ref(null);

  return { user };
});
