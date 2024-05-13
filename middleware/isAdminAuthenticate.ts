import { adminAuth } from "@/stores/admin/auth";
export default defineNuxtRouteMiddleware(async (to, from) => {
    const adminState = adminAuth();
    if(adminState.authenticated === true) {
        return ;
    }
    return navigateTo('/admin/login');
});