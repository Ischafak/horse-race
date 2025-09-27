import * as vt from 'vue-toastification'
import 'vue-toastification/dist/index.css'
import '@/assets/css/toast.scss'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(vt.default,
    {
      position: vt.POSITION.TOP_RIGHT,
      transition: 'Vue-Toastification__fade'

    })
  return {
    provide: {
      toast: vt.useToast()
    }
  }
})
