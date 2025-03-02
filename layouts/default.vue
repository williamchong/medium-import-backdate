<template>
  <div class="min-h-screen flex flex-col">
    <header class="bg-gray-800 text-white py-4">
      <div class="container mx-auto px-4">
        <NuxtLink to="/" class="text-xl font-bold hover:text-gray-200">Medium Story Backdating Tool</NuxtLink>
      </div>
    </header>

    <main class="flex-grow">
      <slot />
    </main>

    <footer class="bg-gray-100 py-4 mt-8">
      <div class="container mx-auto px-4 text-center text-sm text-gray-600">
        <p>
          <span class="pr-2">Medium Story Backdating Tool</span> |
          <a
            href="https://github.com/williamchong/medium-import-backdate" target="_blank" rel="noopener"
            class="px-2 underline hover:text-gray-800">
            GitHub Repository
          </a> |
          <a
            href="https://blog.williamchong.cloud/" target="_blank" rel="noopener"
            class="px-2 underline hover:text-gray-800">
            Blog
          </a>
        </p>
      </div>
    </footer>
  </div>
</template>
<script setup lang="ts">
useSeoMeta({
  title: 'Medium Story Backdating Tool',
  description: 'Create pages with specific publication dates for Medium import',
  ogTitle: 'Medium Story Backdating Tool',
  ogDescription: 'Create pages with specific publication dates for Medium import',
  ogType: 'website',
})

useHead({
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: 'Medium Story Backdating Tool',
        description: 'Create pages with specific publication dates for Medium import',
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
