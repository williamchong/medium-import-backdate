<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-6">{{ $t('title') }}</h1>

    <div class="max-w-2xl mb-8">
      <p class="mb-4">
        <i18n-t keypath="index.intro" scope="global">
          <a href="https://medium.com" target="_blank" class="underline" rel="noopener">Medium.com</a>
        </i18n-t>
      </p>

      <div class="mb-6">
        <label for="backdateInput" class="block mb-2 font-medium">{{ $t('index.datePicker.label') }}</label>
        <input
          id="backdateInput" ref="datePickerInput" v-model="selectedDate" type="date"
          class="border-2 border-blue-300 rounded px-3 py-2 w-full max-w-xs focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all shadow-sm hover:shadow"
          :placeholder="(new Date()).toISOString().substr(0, 10)" @change="generateBackdatedUrl">
      </div>

      <div v-if="backdatedUrl" class="mb-6">
        <label class="block mb-2 font-medium">{{ $t('index.backdatedUrl.label') }}</label>
        <div class="flex items-center">
          <input
            ref="urlInput" v-model="backdatedUrl" type="text" readonly
            class="border rounded-l px-3 py-2 w-full bg-gray-50">
          <button
            class="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-r"
            @click="copyToClipboard">
            {{ copied ? $t('common.copied') : $t('common.copy') }}
          </button>
        </div>
        <p class="mt-2 text-sm text-gray-600">
          <a :href="backdatedUrl" target="_blank" class="text-blue-600 hover:underline">
            {{ $t('index.backdatedUrl.openLink') }}
          </a>
        </p>
      </div>

      <hr class="my-6">

      <h2 class="text-xl font-semibold mb-2">{{ $t('index.howTo.title') }}</h2>
      <ol class="list-decimal pl-6 mb-6 space-y-2">
        <li>
          <button class="text-blue-600 hover:underline hover:text-blue-800" @click="openDatePicker">
            {{ $t('common.select') }}
          </button>
          {{ $t('index.howTo.steps.selectDate') }}
        </li>
        <li>
          <button
            :class="{ 'text-blue-600 hover:underline cursor-pointer': !!backdatedUrl }"
            @click="backdatedUrl ? copyToClipboard() : null">
            {{ $t('common.copy') }}
          </button> {{ $t('index.howTo.steps.copyUrl') }}
          <span v-if="copied" class="ml-2 text-green-600 text-sm">
            <svg
              class="w-4 h-4 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            {{ $t('common.copied') }}
          </span>
        </li>
        <li>
          <i18n-t keypath="index.howTo.steps.goToMedium" scope="global">
            <a href="https://medium.com/p/import" target="_blank" class="text-blue-600 hover:underline">
              Import a story
            </a>
          </i18n-t>
        </li>
        <li>
          <figure>
            <figcaption>{{ $t('index.howTo.figureCaption.importField') }}</figcaption>
            <img src="~/assets/import-page.png" alt="Medium Import Page" class="w-full border rounded-lg shadow-md my-4">
          </figure>
        </li>
        <li>
          <figure>
            <figcaption>{{ $t('index.howTo.figureCaption.importResult') }}</figcaption>
            <img src="~/assets/import-result.png" alt="Import Result" class="w-full border rounded-lg shadow-md my-4">
          </figure>
        </li>
      </ol>

      <div class="bg-blue-50 border border-blue-200 rounded p-4 mb-6">
        <h3 class="font-medium text-blue-800 mb-1">{{ $t('index.note.title') }}</h3>
        <p class="text-blue-700">
          <i18n-t keypath="index.note.content" scope="global">
            <a
              href="https://help.medium.com/hc/en-us/articles/214550207-Importing-a-post-to-Medium"
              target="_blank"
              class="text-blue-800 hover:underline font-medium">
              Medium's help article
            </a>
          </i18n-t>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const selectedDate = ref('')
const backdatedUrl = ref('')
const copied = ref(false)
const urlInput = ref<HTMLInputElement | null>(null)
const datePickerInput = ref<HTMLInputElement | null>(null)

function generateBackdatedUrl() {
  if (selectedDate.value) {
    // Format date as YYYY-MM-DD
    const dateObj = new Date(selectedDate.value)
    const year = dateObj.getFullYear()
    const month = String(dateObj.getMonth() + 1).padStart(2, '0')
    const day = String(dateObj.getDate()).padStart(2, '0')

    const formattedDate = `${year}-${month}-${day}`

    // Get the current origin (base URL)
    const origin = window.location.origin
    backdatedUrl.value = `${origin}/${formattedDate}`

    // Reset the copied state
    copied.value = false
  }
}

async function copyToClipboard() {
  try {
    await navigator.clipboard.writeText(backdatedUrl.value)
    copied.value = true

    // Reset the copied state after 2 seconds
    setTimeout(() => {
      copied.value = false
    }, 2000)
  } catch (err) {
    console.error('Failed to copy URL: ', err)
  }
}

function openDatePicker() {
  datePickerInput.value?.showPicker()
}
</script>
