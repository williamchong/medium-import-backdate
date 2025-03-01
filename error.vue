<template>
  <div class="container mx-auto px-4 py-12 text-center">
    <h1 class="text-3xl font-bold mb-6 text-red-600">{{ error.statusCode === 404 ? 'Page Not Found' : 'An Error Occurred' }}</h1>
    <p class="mb-6 text-xl">{{ error.message || "Something went wrong. Please try again." }}</p>
    <button 
      class="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded"
      @click="handleError"
    >
      Back to Home
    </button>
  </div>
</template>

<script setup>
const props = defineProps({
  error: Object
})

function handleError() {
  clearError({ redirect: '/' })
}
</script>