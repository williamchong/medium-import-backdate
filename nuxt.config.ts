// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    'nuxt-gtag',
    '@nuxt/eslint',
    '@nuxt/test-utils/module',
    '@nuxt/ui',
    '@nuxtjs/i18n',
    '@nuxtjs/sitemap',
    '@sentry/nuxt/module'
  ],

  css: ['~/assets/css/main.css'],

  // Keep the UI in light mode; the header/footer use fixed colors
  colorMode: {
    preference: 'light',
  },

  // Bundle the icons we use into the client from the locally installed
  // @iconify-json/lucide, so the browser doesn't fetch them from the Iconify
  // API. The server bundle stays at the default 'auto' (= 'remote' on edge),
  // which @nuxt/icon recommends for workers — bundling locally would ship the
  // whole collection just to serve two icons.
  icon: {
    clientBundle: {
      scan: true,
    },
  },

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
