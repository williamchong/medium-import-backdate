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
          Medium Story Backdating Tool |
          <a
            href="https://github.com/williamchong/medium-import-backdate" target="_blank" rel="noopener"
            class="underline hover:text-gray-800">
            GitHub Repository
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
</script>
