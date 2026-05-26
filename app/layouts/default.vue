<template>
  <div class="min-h-screen flex flex-col">
    <header class="bg-gray-800 text-white py-4">
      <UContainer>
        <ULink to="/" class="text-xl font-bold hover:text-gray-200">{{ $t('title') }}</ULink>
      </UContainer>
    </header>

    <main class="grow">
      <slot />
    </main>

    <footer class="bg-gray-100 py-4 mt-8">
      <UContainer class="text-center text-sm text-gray-600">
        <p>
          <span class="pr-2">{{ $t('title') }}</span> |
          <ULink
            to="https://github.com/williamchong/medium-import-backdate"
            target="_blank"
            rel="noopener"
            class="px-2 underline hover:text-gray-800"
          >
            {{ $t('layout.footer.links.github') }}
          </ULink> |
          <ULink
            to="https://blog.williamchong.cloud/"
            target="_blank"
            rel="noopener"
            class="px-2 underline hover:text-gray-800"
          >
            {{ $t('layout.footer.links.blog') }}
          </ULink>
        </p>
      </UContainer>
    </footer>
  </div>
</template>
<script setup lang="ts">
const { t } = useI18n()

useSeoMeta({
  title: t('title'),
  description: t('description'),
  ogTitle: t('title'),
  ogDescription: t('description'),
  ogType: 'website',
})

useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: () => JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: t('title'),
        description: t('description'),
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'Any',
        url: 'https://medium-backdate.williamchong.cloud',
        author: {
          '@type': 'Person',
          name: 'William Chong',
          url: 'https://blog.williamchong.cloud'
        },
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD'
        }
      })
    }
  ]
})
</script>
