import { useAuth } from "~/stores/auth";
export default defineNuxtRouteMiddleware(async (to, from) => {
    const authState = useAuth();
    setTimeout(() => {
        if (authState.authenticated === true) {
            return;
        }
            return navigateTo('/login');
    }, 1000)
});