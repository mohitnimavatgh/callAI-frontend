import { useAuth } from "@/stores/auth";
import { adminAuth } from "@/stores/admin/auth";

export default defineNuxtRouteMiddleware(async (to, from) => {
    const authState = useAuth();
    const adminState = adminAuth();
    if (!adminState.authenticated) {
        if(!authState.authenticated){
            return ;
        }
        return navigateTo('/');
    }
});