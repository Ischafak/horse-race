import VueTippy from 'vue-tippy'
import '@/assets/css/tippy.scss'
import 'tippy.js/themes/light.css'
import 'tippy.js/animations/scale.css'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(
    VueTippy,
    // optional
    {
      directive: 'tippy', // => v-tippy
      component: 'tippy', // => <tippy/>
      componentSingleton: 'tippy-singleton', // => <tippy-singleton/>,
      defaultProps: {
        placement: 'top',
        allowHTML: true,
        theme: 'dark',
        offset: [0, 15]
      } // => Global default options * see all props
    }
  )
})
