import { adminAuth } from "@/stores/admin/auth";
export default defineNuxtRouteMiddleware(async (to, from) => {
    if (process.client) {
        const adminState = adminAuth();
        if (adminState.authenticated === false) {
            return navigateTo('/admin/login');
        }
        return;
    }
});