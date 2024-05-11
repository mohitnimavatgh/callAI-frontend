import { useAuth } from "~/stores/auth";
export default defineNuxtRouteMiddleware(async (to, from) => {
    const authState = useAuth();
    if(authState.authenticated === false) {
            return navigateTo('/login');
    }else return ;
});