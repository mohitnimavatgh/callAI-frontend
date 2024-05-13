import { useAuth } from "~/stores/auth";
export default defineNuxtRouteMiddleware(async (to, from) => {
    const authState = useAuth();
    console.log(authState);
    // if (authState.authenticated === true) {
    //     return navigateTo('/')
    // }

    const isLoggedIn = authState?.authenticated;
    if (!isLoggedIn) {
        return ;
    }
    else{
        return navigateTo('/');
    }
});