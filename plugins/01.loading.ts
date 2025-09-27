import Loading from 'vue-loading-overlay/src/js/Component.vue'
import 'vue-loading-overlay/dist/css/index.css'

export default defineNuxtPlugin((nuxtApp) => {
  // Component'i default transition ile kaydet
  const LoadingWithDefaults = {
    ...Loading,
    props: {
      ...Loading.props,
      transition: {
        type: String,
        default: 'fadeonly'
      },
      'background-color': {
        type: String,
        default: '#b1b3b1'
      }
    }
  }

  nuxtApp.vueApp.component('Loading', LoadingWithDefaults)
})
