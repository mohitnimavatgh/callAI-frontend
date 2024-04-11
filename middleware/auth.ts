import { useAuth } from "~/stores/auth";
export default defineNuxtRouteMiddleware(async (to, from) => {
    const authState = useAuth();
    console.log('authState', authState.authenticated)
    if(!authState.authenticated) {
        return navigateTo('/login');
    }
});