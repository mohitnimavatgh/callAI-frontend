import { adminAuth } from "@/stores/admin/auth";
import { useAuth } from "@/stores/auth";
export default defineNuxtRouteMiddleware(async (to, from) => {
    if (process.client) {
        const adminState = adminAuth();
        const userState = useAuth();
        if (adminState.authenticated === true) {
            return navigateTo('/admin');
        }else{
            if(userState.authenticated === true){
                return navigateTo('/login');
            }
            return ;
        }
    }
});