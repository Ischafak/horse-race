export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      
    }
  },

  ssr: true,

  imports: {
    dirs: ['store']
  },

  purgeCSS: {
    whitelistPatterns: [/svg.*/, /fa.*/]
  },

  modules: [
    'nuxt-icons',
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    'pinia-plugin-persistedstate/nuxt',
  ],

  pinia: {
    autoImports: ['defineStore', 'acceptHMRUpdate']
  },

  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      link: [
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;600;700&display=swap' }
      ],

      script: [
        {
          src: '/Data/js/fontawesome.js',
          crossorigin: 'anonymous',
          defer: true,
          async: true
        },
        {
          src: '//js.hsforms.net/forms/embed/v2.js',
          type: 'text/javascript'
        }
      ]
    }
  },

  build: { transpile: ['lodash', 'vue-toastification'] },
  css: ['~/assets/css/main.scss'],

  vite: {
    server: {
      hmr: process.env.NUXT_PUBLIC_NODE_ENV === 'development'
        ? {
            host: 'horse-race.test',
            clientPort: 8085,
            protocol: 'wss'
          }
        : undefined
    }
  },

  compatibilityDate: '2025-09-28',
})