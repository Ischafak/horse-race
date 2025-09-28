export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      
    }
  },

  ssr: false,

  imports: {
    dirs: ['store']
  },

  purgeCSS: {
    whitelistPatterns: [/svg.*/, /fa.*/]
  },

  modules: [
    'nuxt-icons',
    '@gabortorma/nuxt-dayjs-i18n',
    '@nuxtjs/i18n',
    ['dayjs-nuxt', { plugins: ['customParseFormat', 'isBetween'] }],
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    'pinia-plugin-persistedstate/nuxt',
    '@nuxtjs/robots'
  ],

  pinia: {
    autoImports: ['defineStore', 'acceptHMRUpdate']
  },

  i18n: {
    strategy: 'no_prefix',
    locales: ['tr', 'en'],
    defaultLocale: 'tr',
    detectBrowserLanguage: false,
    vueI18n: './i18n.config.ts'
  },

  dayjs: {
    locales: ['tr', 'en']
  },

  dayjsI18n: {
    computedPlugins: true,
    provideFormat: true
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

  build: { transpile: ['lodash', '@vee-validate/rules', 'vue-toastification', '@vuepic/vue-datepicker'] },
  css: ['~/assets/css/main.scss'],

  vite: {
    server: {
      hmr: process.env.NUXT_PUBLIC_NODE_ENV === 'development'
        ? {
            host: 'horse-race.test',
            clientPort: 8084,
            protocol: 'wss'
          }
        : undefined
    }
  },

  compatibilityDate: '2025-09-28',
})