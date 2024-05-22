import * as vt from 'vue-toastification'
import "vue-toastification/dist/index.css";
export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(vt.default , {
        position: "top-right",
        timeout: 1500
    })
    return {
      provide: {
        toast: vt.useToast()
      }
    }
});