<template>
  <UContainer class="py-12 text-center">
    <h1 class="text-3xl font-bold mb-6 text-red-600">{{ error?.statusCode === 404 ? $t('error.404') : $t('error.general') }}</h1>
    <p class="mb-6 text-xl">{{ error?.message || $t('error.default') }}</p>
    <UButton size="lg" @click="handleError">
      {{ $t('error.backToHome') }}
    </UButton>
  </UContainer>
</template>

<script setup lang="ts">
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = defineProps({
  // eslint-disable-next-line vue/require-default-prop
  error: Object
})

function handleError() {
  clearError({ redirect: '/' })
}
</script>