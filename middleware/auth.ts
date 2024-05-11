import { useAuth } from "~/stores/auth";
export default defineNuxtRouteMiddleware(async (to, from) => {
    const authState = useAuth();
    console.log(authState);
    // if (authState.authenticated === true) {
    //     return navigateTo('/')
    // }

    const isLoggedIn = authState?.authenticated; // Prefer a dedicated getter
    if (isLoggedIn) {
        // Redirect to login if not logged in
        return navigateTo('/'); // Adjust login route as needed
    }
    else{
        return ;
    }
});