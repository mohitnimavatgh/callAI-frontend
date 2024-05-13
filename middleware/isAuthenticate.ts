import { useAuth } from "~/stores/auth";
export default defineNuxtRouteMiddleware(async (to, from) => {
    const authState = useAuth();
    if(authState.authenticated === true) {
            return ;
    }
    return navigateTo('/login');
});