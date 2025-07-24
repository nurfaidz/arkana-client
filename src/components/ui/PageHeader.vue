<template>
    <div class="mb-8">
        <h2 class="text-3xl font-bold text-gray-900 mb-2">{{ title }}</h2>
        <p v-if="subtitle" class="text-gray-600">{{ subtitle }}</p>
    </div>
</template>

<script setup lang="ts">
defineProps<{
    title: string
    subtitle?: string
}>()
</script>