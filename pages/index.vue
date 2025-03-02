<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-6">Medium Story Backdating Tool</h1>

    <div class="max-w-2xl mb-8">
      <p class="mb-4">This tool generates HTML pages with specific publish dates that can be imported into <a
          href="https://medium.com" target="_blank" class="text-blue-600 hover:underline" rel="noopener">Medium.com</a>
        to create backdated stories.</p>

      <div class="mb-6">
        <label for="backdateInput" class="block mb-2 font-medium">Choose Your desired Publication Date:</label>
        <input
          id="backdateInput" ref="datePickerInput" v-model="selectedDate" type="date"
          class="border-2 border-blue-300 rounded px-3 py-2 w-full max-w-xs focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all shadow-sm hover:shadow"
          :placeholder="(new Date()).toISOString().substr(0, 10)" @change="generateBackdatedUrl">
      </div>

      <div v-if="backdatedUrl" class="mb-6">
        <label class="block mb-2 font-medium">Your Backdated Page Link:</label>
        <div class="flex items-center">
          <input
            ref="urlInput" v-model="backdatedUrl" type="text" readonly
            class="border rounded-l px-3 py-2 w-full bg-gray-50">
          <button
            class="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-r"
            @click="copyToClipboard">
            {{ copied ? 'Copied!' : 'Copy' }}
          </button>
        </div>
        <p class="mt-2 text-sm text-gray-600">
          <a :href="backdatedUrl" target="_blank" class="text-blue-600 hover:underline">
            Or click here to open the backdated page →
          </a>
        </p>
      </div>

      <hr class="my-6">

      <h2 class="text-xl font-semibold mb-2">How to use:</h2>
      <ol class="list-decimal pl-6 mb-6 space-y-2">
        <li>
          <button class="text-blue-600 hover:underline hover:text-blue-800" @click="openDatePicker">
            Select
          </button> the desired publish date using the date picker above
        </li>
        <li>
          <button
            :class="{ 'text-blue-600 hover:underline cursor-pointer': !!backdatedUrl }"
            @click="backdatedUrl ? copyToClipboard() : null">
            Copy
          </button> the generated URL
          <span v-if="copied" class="ml-2 text-green-600 text-sm">
            <svg
              class="w-4 h-4 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            Copied!
          </span>
        </li>
        <li>Go to Medium and click <a
            href="https://medium.com/p/import" target="_blank"
            class="text-blue-600 hover:underline">Import a story</a></li>
        <li>
          <figure>
            <figcaption>Paste this link in Medium's import field</figcaption>
            <img src="~/assets/import-page.png" alt="Medium Import Page" class="w-full border rounded-lg shadow-md my-4">
          </figure>
        </li>
        <li>
          <figure>
            <figcaption>The imported story will have a published date of your choice, replace the placeholder text with your own content.</figcaption>
            <img src="~/assets/import-result.png" alt="Import Result" class="w-full border rounded-lg shadow-md my-4">
          </figure>
        </li>
      </ol>

      <div class="bg-blue-50 border border-blue-200 rounded p-4 mb-6">
        <h3 class="font-medium text-blue-800 mb-1">Note:</h3>
        <p class="text-blue-700">Medium honors the publication date from imported sites. This tool creates pages
          with the proper metadata format that Medium recognizes. For detailed instructions on importing, visit <a
            href="https://help.medium.com/hc/en-us/articles/214550207-Importing-a-post-to-Medium" target="_blank"
            class="text-blue-800 hover:underline font-medium">Medium's help article</a>.</p>
      </div>

    </div>
  </div>
</template>

<script setup>
const selectedDate = ref('')
const backdatedUrl = ref('')
const copied = ref(false)
const urlInput = ref(null)
const datePickerInput = ref(null)

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

function copyToClipboard() {
  if (backdatedUrl.value) {
    // Select the text
    urlInput.value.select()

    // Copy to clipboard
    try {
      document.execCommand('copy')
      copied.value = true

      // Reset the copied state after 2 seconds
      setTimeout(() => {
        copied.value = false
      }, 2000)
    } catch (err) {
      console.error('Failed to copy URL: ', err)
    }

    // Deselect
    window.getSelection().removeAllRanges()
  }
}

function openDatePicker() {
  datePickerInput.value.showPicker()
}
</script>
