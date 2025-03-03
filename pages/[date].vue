<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-6">{{ $t('backdated.title') }}</h1>

    <div v-if="isValidDate" class="bg-gray-100 border border-gray-300 rounded p-4 mb-6">
      <p class="text-lg mb-2">
        <strong>{{ $t('backdated.metadata.pubDate') }}</strong> {{ formattedDate }}
      </p>
      <p class="text-sm text-gray-600 mb-2">
        <strong>{{ $t('backdated.metadata.isoDate') }}</strong> {{ isoDate }}
      </p>
      <p class="mt-2">{{ $t('backdated.info') }}</p>
      <p class="mb-2">{{ $t('backdated.instruction') }}</p>
      <p>
        <i18n-t keypath="backdated.generatedBy" scope="global">
          <a href="https://medium-backdate.williamchong.cloud" target="_blank" class="text-blue-600 hover:underline">
            {{ $t('title') }}
          </a>
        </i18n-t>
      </p>
    </div>

    <div v-else class="bg-red-100 border border-red-300 rounded p-4 mb-6 text-red-700">
      <p class="font-bold">{{ $t('backdated.error.title') }}</p>
      <p>{{ $t('backdated.error.message') }}</p>
    </div>

    <div v-if="isValidDate" class="mb-6 prose prose-lg">
      <h2>{{ $t('backdated.sampleContent.title') }}</h2>
      <p>{{ $t('backdated.sampleContent.intro') }}</p>
      <p>{{ $t('backdated.sampleContent.paragraph1') }}</p>
      <h3>{{ $t('backdated.sampleContent.subheading') }}</h3>
      <p>{{ $t('backdated.sampleContent.paragraph2') }}</p>
      <p>{{ $t('backdated.sampleContent.closing') }}</p>
    </div>

    <div class="mt-8">
      <h3 class="font-semibold text-lg mb-3">{{ $t('backdated.howTo.title') }}</h3>
      <ol class="list-decimal pl-6 space-y-2 mb-6">
        <li>
          <button
            class="text-blue-600 hover:underline hover:text-blue-800 inline-flex items-center"
            @click="copyPageUrl">
            {{ $t('common.copy') }}
          </button> {{ $t('backdated.howTo.steps.copyUrl') }}
          <span v-if="copySuccess" class="ml-2 text-green-600 text-sm">
            <svg
              class="w-4 h-4 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
            </svg>
            {{ $t('common.copied') }}
          </span>
        </li>
        <li>
          <i18n-t keypath="backdated.howTo.steps.goToMedium" scope="global">
            <a href="https://medium.com/p/import" target="_blank" class="text-blue-600 hover:underline" @click="trackImportClick">
              {{ $t('backdated.howTo.importStory') }}
            </a>
          </i18n-t>
        </li>
        <li>{{ $t('backdated.howTo.steps.pasteUrl') }}</li>
        <li>{{ $t('backdated.howTo.steps.replace') }}</li>
      </ol>
      <p class="mt-4">
        <a
          href="https://help.medium.com/hc/en-us/articles/214550207-Importing-a-post-to-Medium" target="_blank"
          class="bg-blue-50 border border-blue-200 text-blue-700 rounded py-2 px-4 inline-flex items-center">
          <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"/>
            <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"/>
          </svg>
          {{ $t('backdated.howTo.guide') }}
        </a>
      </p>
    </div>

    <div class="my-6">
      <NuxtLink to="/" class="text-blue-600 hover:text-blue-800 underline">
        {{ $t('backdated.back') }}
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()
const route = useRoute()
const dateParam = route.params.date as string

// Validate the date parameter format (should be YYYY-MM-DD)
const dateRegex = /^(\d{4})-(\d{2})-(\d{2})$/
const match = dateParam.match(dateRegex)

let formattedDate = 'Invalid Date'
let isoDate = ''
let isValidDate = false
let dateObject = null

if (match) {
  const year = parseInt(match[1])
  const month = parseInt(match[2]) - 1 // JS months are 0-indexed
  const day = parseInt(match[3])

  dateObject = new Date(year, month, day, 12, 0, 0)

  // Check if date is valid
  if (!isNaN(dateObject.getTime())) {
    isValidDate = true
    isoDate = dateObject.toISOString()
    formattedDate = dateObject.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }
}

// Handle invalid dates gracefully
if (!isValidDate) {
  formattedDate = 'Invalid Date Format'
}

// Copy URL functionality
const copySuccess = ref(false)

async function copyPageUrl() {
  const pageUrl = window.location.href
  try {
    await navigator.clipboard.writeText(pageUrl)
    copySuccess.value = true

    useTrackEvent('copy_generated_url')

    // Reset the copied state after 2 seconds
    setTimeout(() => {
      copySuccess.value = false
    }, 3000)
  } catch (err) {
    console.error('Failed to copy URL: ', err)
  }
}

function trackImportClick() {
  useTrackEvent('click_import_story')
}

useSeoMeta({
  title: isValidDate ? t('backdated.title') : t('backdated.error.title'),
  description: isValidDate ? t('backdated.description', { date: formattedDate }) : t('backdated.error.description'),
  ogTitle: isValidDate ? t('backdated.title') : t('backdated.error.title'),
  ogDescription: isValidDate ? t('backdated.description', { date: formattedDate }) : t('backdated.error.description'),
  ogType: 'website',
})

useHead({
  meta: isValidDate ? [
    // This meta tag is recognized by Medium for import dates
    { property: 'article:published_time', content: isoDate },
  ] : [],
  link: [
    // Set canonical link to the homepage
    { rel: 'canonical', href: '/' }
  ]
})
</script>