<template>
  <UContainer class="py-8">
    <h1 class="text-3xl font-bold mb-6">{{ $t('title') }}</h1>

    <div class="max-w-2xl mb-8">
      <p class="mb-4">
        <i18n-t keypath="index.intro" scope="global">
          <ULink to="https://medium.com" target="_blank" class="underline" rel="noopener">Medium.com</ULink>
        </i18n-t>
      </p>

      <div class="mb-6">
        <label for="backdateInput" class="block mb-2 font-medium">{{ $t('index.datePicker.label') }}</label>
        <UInput
          id="backdateInput"
          ref="dateInput"
          v-model="selectedDate"
          type="date"
          class="w-full max-w-xs"
          :placeholder="(new Date()).toISOString().substr(0, 10)"
          @change="generateBackdatedUrl"
        />
      </div>

      <div v-if="backdatedUrl" class="mb-6">
        <label class="block mb-2 font-medium">{{ $t('index.backdatedUrl.label') }}</label>
        <UFieldGroup class="w-full">
          <UInput v-model="backdatedUrl" readonly class="flex-1" />
          <UButton color="primary" @click="copyToClipboard">
            {{ copied ? $t('common.copied') : $t('common.copy') }}
          </UButton>
        </UFieldGroup>
        <p class="mt-2 text-sm text-gray-600">
          <ULink :to="backdatedUrl" target="_blank" class="text-blue-600 hover:underline">
            {{ $t('index.backdatedUrl.openLink') }}
          </ULink>
        </p>
      </div>

      <USeparator class="my-6" />

      <h2 class="text-xl font-semibold mb-2">{{ $t('index.howTo.title') }}</h2>
      <ol class="list-decimal pl-6 mb-6 space-y-2">
        <li>
          <i18n-t keypath="index.howTo.steps.selectDate" scope="global">
            <button class="text-blue-600 hover:underline hover:text-blue-800" @click="openDatePicker">
              {{ $t('common.select') }}
            </button>
          </i18n-t>
        </li>
        <li>
          <i18n-t keypath="index.howTo.steps.copyUrl" scope="global">
            <button
              :class="{ 'text-blue-600 hover:underline cursor-pointer': !!backdatedUrl }"
              :disabled="!backdatedUrl"
              @click="backdatedUrl ? copyToClipboard() : null">
              {{ $t('common.copy') }}
            </button>
          </i18n-t>
          <span v-if="copied" class="ml-2 text-green-600 text-sm">
            <UIcon name="i-lucide-check" class="w-4 h-4 inline" />
            {{ $t('common.copied') }}
          </span>
        </li>
        <li>
          <i18n-t keypath="index.howTo.steps.goToMedium" scope="global">
            <ULink
              to="https://medium.com/p/import"
              target="_blank"
              class="text-blue-600 hover:underline"
              @click="trackImportClick">
              {{ $t('index.howTo.importStory') }}
            </ULink>
          </i18n-t>
        </li>
        <li>
          <figure>
            <figcaption>{{ $t('index.howTo.figureCaption.importField') }}</figcaption>
            <img src="~/assets/import-page.png" alt="Medium Import Page" class="w-full border border-gray-200 rounded-lg shadow-md my-4">
          </figure>
        </li>
        <li>
          <figure>
            <figcaption>{{ $t('index.howTo.figureCaption.importResult') }}</figcaption>
            <img src="~/assets/import-result.png" alt="Import Result" class="w-full border border-gray-200 rounded-lg shadow-md my-4">
          </figure>
        </li>
        <li>
          <figure>
            <figcaption>{{ $t('index.howTo.figureCaption.canonicalSettings') }}</figcaption>
            <img src="~/assets/medium-settings.png" alt="Advanced Settings" class="w-full border border-gray-200 rounded-lg shadow-md my-4">
          </figure>
        </li>
      </ol>

      <UAlert
        color="info"
        variant="soft"
        :title="$t('index.note.title')"
        class="mb-6">
        <template #description>
          <i18n-t keypath="index.note.content" scope="global">
            <ULink
              to="https://help.medium.com/hc/en-us/articles/214550207-Importing-a-post-to-Medium"
              target="_blank"
              class="text-blue-800 hover:underline font-medium">
              Medium's help article
            </ULink>
          </i18n-t>
        </template>
      </UAlert>
    </div>
  </UContainer>
</template>

<script setup lang="ts">
import { useClipboard } from '@vueuse/core'

const selectedDate = ref('')
const backdatedUrl = ref('')
const dateInput = useTemplateRef('dateInput')

const { copy, copied } = useClipboard({ copiedDuring: 2000 })

function generateBackdatedUrl() {
  if (selectedDate.value) {
    // Parse date parts directly to avoid UTC vs local timezone mismatch
    const [year, month, day] = selectedDate.value.split('-')
    const formattedDate = `${year}-${month}-${day}`

    // Get the current origin (base URL)
    const origin = window.location.origin
    backdatedUrl.value = `${origin}/${formattedDate}`

    useTrackEvent('pick_publish_date')
  }
}

async function copyToClipboard() {
  await copy(backdatedUrl.value)
  useTrackEvent('copy_generated_url')
}

function openDatePicker() {
  dateInput.value?.inputRef?.showPicker()
}

function trackImportClick() {
  useTrackEvent('click_import_story')
}
</script>
