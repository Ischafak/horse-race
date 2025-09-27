import { defineRule, Form, Field, ErrorMessage, configure } from 'vee-validate'
import { required, between, confirmed } from '@vee-validate/rules'
import { localize, loadLocaleFromURL } from '@vee-validate/i18n'

import tr from '../i18n/tr/index.js'
import en from '../i18n/en/index.js'

configure({
  generateMessage: localize({
    tr, en
  })
})

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('VForm', Form)
  nuxtApp.vueApp.component('VField', Field)
  nuxtApp.vueApp.component('VErrorMessage', ErrorMessage)
})
