import { useAuthStore } from "~/stores/user/authStore";
export default defineNuxtRouteMiddleware(async (to, from) => {
    const authState = useAuthStore();
    console.log('authState', authState.authenticated)
    if(!authState.authenticated) {
        return navigateTo('/login');
    }
});