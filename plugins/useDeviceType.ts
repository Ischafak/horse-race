import { ref, computed } from 'vue'

const deviceType = ref(0)

const checkDeviceType = () => {
  if (process.client) {
    deviceType.value = window.innerWidth
  }
}

export default defineNuxtPlugin((nuxtApp) => {
  if (process.client) {
    checkDeviceType()
    window.addEventListener('resize', checkDeviceType)
  }

  nuxtApp.vueApp.config.globalProperties.$deviceType = computed(() => deviceType.value)
})
