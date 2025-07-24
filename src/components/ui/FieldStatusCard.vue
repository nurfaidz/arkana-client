<template>
    <div :class="cardClasses" class="border-2 rounded-lg p-4 transition-all hover:shadow-md">
        <div class="flex items-center justify-between mb-2">
            <h4 class="font-medium">{{ field.name }}</h4>
            <span class="text-xs px-2 py-1 rounded-full bg-white bg-opacity-50">
                {{ field.type }}
            </span>
        </div>
        <p class="text-sm font-medium mb-1">{{ statusText }}</p>
        <div v-if="field.currentBooking" class="text-xs mb-1">
            <p><strong>{{ field.currentBooking }}</strong></p>
            <p v-if="field.timeLeft">Sisa: {{ field.timeLeft }}</p>
        </div>
        <div v-if="field.nextBooking" class="text-xs text-gray-600">
            Selanjutnya: {{ field.nextBooking }}
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
    field: {
        id: number
        name: string
        type: string
        status: 'occupied' | 'available' | 'maintenance'
        currentBooking?: string | null
        timeLeft?: string | null
        nextBooking?: string | null
    }
}>()

const cardClasses = computed(() => {
    switch (props.field.status) {
        case 'occupied':
            return 'bg-red-100 text-red-800 border-red-200'
        case 'available':
            return 'bg-green-100 text-green-800 border-green-200'
        case 'maintenance':
            return 'bg-yellow-100 text-yellow-800 border-yellow-200'
        default:
            return 'bg-gray-100 text-gray-800 border-gray-200'
    }
})

const statusText = computed(() => {
    switch (props.field.status) {
        case 'occupied':
            return 'Terpakai'
        case 'available':
            return 'Tersedia'
        case 'maintenance':
            return 'Maintenance'
        default:
            return props.field.status
    }
})
</script>