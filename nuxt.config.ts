// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    'nuxt-gtag',
    '@nuxt/eslint',
    '@nuxt/test-utils/module',
    '@nuxtjs/i18n',
    '@nuxtjs/sitemap',
    '@nuxtjs/tailwindcss',
  ],
  gtag: {
    id: undefined,
  },
  i18n: {
    baseUrl: 'https://medium-backdate.williamchong.cloud',
    locales: [
      {
        code: 'en',
        language: 'en-US',
        file: 'en-US.json'
      },
    ],
    defaultLocale: 'en',
    lazy: true,
  },
  site: {
    url: 'https://medium-backdate.williamchong.cloud',
    name: 'Medium Story Backdating Tool',
  },
  routeRules: {
    '/': { prerender: true }
  },
  nitro: {
    preset: 'cloudflare-pages'
  },
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true }
})
