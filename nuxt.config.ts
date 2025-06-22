// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    'nuxt-gtag',
    '@nuxt/eslint',
    '@nuxt/test-utils/module',
    '@nuxtjs/i18n',
    '@nuxtjs/sitemap',
    '@nuxtjs/tailwindcss',
    '@sentry/nuxt/module'
  ],

  gtag: {
    id: 'G-4ZH943PGVX',
  },

  i18n: {
    baseUrl: 'https://medium-backdate.williamchong.cloud',
    strategy: 'prefix_and_default',
    detectBrowserLanguage: {
      useCookie: false,
      redirectOn: 'root'
    },
    locales: [
      {
        code: 'en',
        language: 'en-US',
        file: 'en-US.json',
      },
      {
        code: 'zh',
        language: 'zh-TW',
        file: 'zh-TW.json',
      }
    ],
    defaultLocale: 'en',
    lazy: true,
  },

  site: {
    url: 'https://medium-backdate.williamchong.cloud',
    name: 'Medium Story Backdating Tool',
  },

  nitro: {
    preset: 'cloudflare-pages'
  },

  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  sentry: {
    sourceMapsUploadOptions: {
      org: 'williamchong',
      project: 'medium-backdate'
    }
  },

  sourcemap: {
    client: 'hidden'
  }
})
