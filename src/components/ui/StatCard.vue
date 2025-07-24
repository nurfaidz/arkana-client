<template>
    <div class="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
        <div class="flex items-center">
            <div :class="iconClasses">
                <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="icon"></path>
                </svg>
            </div>
            <div class="ml-4">
                <p class="text-sm font-medium text-gray-600">{{ title }}</p>
                <p class="text-2xl font-bold text-gray-900">{{ value }}</p>
                <p :class="changeClasses">{{ change }}</p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
    title: string
    value: string
    change: string
    changeType: 'positive' | 'negative' | 'info'
    icon: string
    color: 'green' | 'blue' | 'purple' | 'yellow' | 'red'
}>()

const iconClasses = computed(() => {
    const colorMap = {
        green: 'p-3 rounded-full bg-green-100 text-green-600',
        blue: 'p-3 rounded-full bg-blue-100 text-blue-600',
        purple: 'p-3 rounded-full bg-purple-100 text-purple-600',
        yellow: 'p-3 rounded-full bg-yellow-100 text-yellow-600',
        red: 'p-3 rounded-full bg-red-100 text-red-600'
    }
    return colorMap[props.color]
})

const changeClasses = computed(() => {
    const typeMap = {
        positive: 'text-xs text-green-600',
        negative: 'text-xs text-red-600',
        info: 'text-xs text-gray-600'
    }
    return typeMap[props.changeType]
})
</script>