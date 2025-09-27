import tr from './i18n/tr';
import en from './i18n/en';
export default defineI18nConfig(() => ({
  fallbackLocale: 'tr',
  messages: {
    tr,
    en,
  },
}));
