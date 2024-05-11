import { adminAuth } from "@/stores/admin/auth";
export default defineNuxtRouteMiddleware(async (to, from) => {
    const adminState = adminAuth();
    
    if(adminState.role === 'Admin') {
        return ;
    }
    else{
        return navigateTo('/admin/login');
    }
});