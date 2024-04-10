import { useAuthStore } from "~/stores/user/authStore";
export default defineNuxtRouteMiddleware(async (to, from) => {
    const authState = useAuthStore();
    if(authState.authenticated) {
        return navigateTo('/callAI');
    }
});