import { adminAuth } from "@/stores/admin/auth";
export default defineNuxtRouteMiddleware(async (to, from) => {
    if (process.client) {
        const adminState = adminAuth();
        if (adminState.authenticated === true) {
            return navigateTo('/admin');
        }
        return ;
    }
});