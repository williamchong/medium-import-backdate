<template>
  <UContainer class="py-8">
    <h1 class="text-3xl font-bold mb-6">{{ $t('backdated.title') }}</h1>

    <UCard v-if="isValidDate" class="mb-6">
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
          <ULink to="https://medium-backdate.williamchong.cloud" target="_blank" class="text-blue-600 hover:underline">
            {{ $t('title') }}
          </ULink>
        </i18n-t>
      </p>
    </UCard>

    <UAlert
      v-else
      color="error"
      variant="soft"
      :title="$t('backdated.error.title')"
      :description="$t('backdated.error.message')"
      class="mb-6"
    />

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
          <span v-if="copied" class="ml-2 text-green-600 text-sm">
            <UIcon name="i-lucide-check" class="w-4 h-4 inline" />
            {{ $t('common.copied') }}
          </span>
        </li>
        <li>
          <i18n-t keypath="backdated.howTo.steps.goToMedium" scope="global">
            <ULink to="https://medium.com/p/import" target="_blank" class="text-blue-600 hover:underline" @click="trackImportClick">
              {{ $t('backdated.howTo.importStory') }}
            </ULink>
          </i18n-t>
        </li>
        <li>{{ $t('backdated.howTo.steps.pasteUrl') }}</li>
        <li>{{ $t('backdated.howTo.steps.replace') }}</li>
      </ol>
      <p class="mt-4">
        <UButton
          to="https://help.medium.com/hc/en-us/articles/214550207-Importing-a-post-to-Medium"
          target="_blank"
          color="info"
          variant="soft"
          icon="i-lucide-external-link">
          {{ $t('backdated.howTo.guide') }}
        </UButton>
      </p>
    </div>

    <div class="my-6">
      <ULink to="/" class="text-blue-600 hover:text-blue-800 underline">
        {{ $t('backdated.back') }}
      </ULink>
    </div>
  </UContainer>
</template>

<script setup lang="ts">
import { useClipboard } from '@vueuse/core'

const { t } = useI18n()
const route = useRoute()
const dateParam = computed(() => route.params.date as string)

// Validate the date parameter format (should be YYYY-MM-DD)
const dateRegex = /^(\d{4})-(\d{2})-(\d{2})$/

const parsedDate = computed(() => {
  const match = dateParam.value.match(dateRegex)
  if (!match) return null

  const [, yearStr, monthStr, dayStr] = match
  if (!yearStr || !monthStr || !dayStr) return null

  const year = parseInt(yearStr)
  const month = parseInt(monthStr) - 1 // JS months are 0-indexed
  const day = parseInt(dayStr)
  const dateObject = new Date(year, month, day, 12, 0, 0)

  if (isNaN(dateObject.getTime())) return null
  return dateObject
})

const isValidDate = computed(() => parsedDate.value !== null)

const isoDate = computed(() => parsedDate.value?.toISOString() ?? '')

const formattedDate = computed(() => {
  if (!parsedDate.value) return 'Invalid Date Format'
  return parsedDate.value.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
})

const { copy, copied } = useClipboard({ copiedDuring: 2000 })

async function copyPageUrl() {
  await copy(window.location.href)
  useTrackEvent('copy_generated_url')
}

function trackImportClick() {
  useTrackEvent('click_import_story')
}

useSeoMeta({
  title: () => isValidDate.value ? t('backdated.title') : t('backdated.error.title'),
  description: () => isValidDate.value ? t('backdated.description', { date: formattedDate.value }) : t('backdated.error.description'),
  ogTitle: () => isValidDate.value ? t('backdated.title') : t('backdated.error.title'),
  ogDescription: () => isValidDate.value ? t('backdated.description', { date: formattedDate.value }) : t('backdated.error.description'),
  ogType: 'website',
})

useHead({
  meta: () => isValidDate.value ? [
    // This meta tag is recognized by Medium for import dates
    { property: 'article:published_time', content: isoDate.value },
  ] : [],
  link: [
    // Set canonical link to the homepage
    { rel: 'canonical', href: '/' }
  ]
})
</script>