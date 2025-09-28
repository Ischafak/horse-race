export default defineNuxtPlugin((nuxtApp) => {
  if (process.client) {
    import('vue3-apexcharts').then((module) => {
      const VueApexCharts = module.default
      nuxtApp.vueApp.use(VueApexCharts)
    })
  }
})
