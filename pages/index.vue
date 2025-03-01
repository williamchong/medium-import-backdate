<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-6">Medium Story Backdating Tool</h1>
    
    <div class="max-w-2xl mb-8">
      <p class="mb-4">This tool generates HTML pages with specific publish dates that can be imported into Medium.com to create backdated stories.</p>
      
      <h2 class="text-xl font-semibold mb-2">How to use:</h2>
      <ol class="list-decimal pl-6 mb-6 space-y-2">
        <li>Select the desired publish date using the date picker below</li>
        <li>Copy the generated link and open it in your browser</li>
        <li>Import the generated page into Medium using the "Import story" option (<a href="https://help.medium.com/hc/en-us/articles/214550207-Importing-a-post-to-Medium" target="_blank" class="text-blue-600 hover:underline">learn how</a>)</li>
        <li>Medium will preserve the publication date from the imported HTML</li>
      </ol>
      
      <div class="bg-blue-50 border border-blue-200 rounded p-4 mb-6">
        <h3 class="font-medium text-blue-800 mb-1">Note:</h3>
        <p class="text-blue-700">Medium honors the publication date from imported HTML files. This tool creates pages with the proper metadata format that Medium recognizes. For detailed instructions on importing, visit <a href="https://help.medium.com/hc/en-us/articles/214550207-Importing-a-post-to-Medium" target="_blank" class="text-blue-800 hover:underline font-medium">Medium's help article</a>.</p>
      </div>
      
      <div class="mb-6">
        <label for="backdateInput" class="block mb-2 font-medium">Choose Publication Date:</label>
        <input 
          type="date" 
          id="backdateInput"
          v-model="selectedDate"
          class="border rounded px-3 py-2 w-full max-w-xs"
          @change="generateBackdatedUrl"
        />
      </div>
      
      <div v-if="backdatedUrl" class="mb-6">
        <label class="block mb-2 font-medium">Your Backdated Page Link:</label>
        <div class="flex items-center">
          <input 
            type="text"
            v-model="backdatedUrl"
            readonly
            class="border rounded-l px-3 py-2 w-full bg-gray-50"
            ref="urlInput"
          />
          <button 
            @click="copyToClipboard" 
            class="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-r"
          >
            {{ copied ? 'Copied!' : 'Copy' }}
          </button>
        </div>
        <p class="mt-2 text-sm text-gray-600">
          <a :href="backdatedUrl" target="_blank" class="text-blue-600 hover:underline">
            Or click here to open the backdated page →
          </a>
        </p>
      </div>
      
    </div>
  </div>
</template>

<script setup>
const selectedDate = ref('')
const backdatedUrl = ref('')
const copied = ref(false)
const urlInput = ref(null)

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
</script>
