import { useAuth } from "~/stores/auth";
import { adminAuth } from "@/stores/admin/auth";
export default defineNuxtRouteMiddleware(async (to, from) => {
    const authState = useAuth();
    const adminState = adminAuth();
    console.log(authState);
    // if (authState.authenticated === true) {
    //     return navigateTo('/')
    // }

    const isLoggedIn = authState?.authenticated;
    if (!isLoggedIn) {
        if (adminState.authenticated === true) {
            return navigateTo('/admin/login');
        }
        return;
    }
    return navigateTo('/');
});