import { useAuth } from "~/stores/auth";
export default defineNuxtRouteMiddleware(async (to, from) => {
    const authState = useAuth();
    if(authState.authenticated) {
        return navigateTo('/call-ai');
    }
});