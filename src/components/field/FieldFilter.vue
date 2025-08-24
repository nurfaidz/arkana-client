<template>
    <div class="bg-white rounded-xl shadow-lg border border-gray-200 p-6 mb-8">
        <div class="flex flex-wrap items-center gap-4">
            
            <div>
                <label class="text-sm font-medium text-gray-700 mb-2 block">Filter by Status</label>
                <select :value="selectedStatus"
                    @input="$emit('update:selectedStatus', ($event.target as HTMLSelectElement).value)"
                    class="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="">Semua Status</option>
                    <option value="AVAILABLE">Tersedia</option>
                    <option value="MAINTENANCE">Maintenance</option>
                </select>
            </div>

            <div>
                <label class="text-sm font-medium text-gray-700 mb-2 block">Filter by Type</label>
                <select :value="selectedType"
                    @input="$emit('update:selectedType', ($event.target as HTMLSelectElement).value)"
                    class="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="">Semua Jenis</option>
                    <option value="FUTSAL">Futsal</option>
                    <option value="BASKET">Basket</option>
                    <option value="BADMINTON">Badminton</option>
                    <option value="TENNIS">Tennis</option>
                    <option value="MINI_SOCCER">Mini Soccer</option>
                </select>
            </div>

            <div>
                <label class="text-sm font-medium text-gray-700 mb-2 block">Search</label>
                <input :value="searchQuery"
                    @input="$emit('update:searchQuery', ($event.target as HTMLInputElement).value)" type="text"
                    placeholder="Cari nama lapangan..."
                    class="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
            </div>

            <!-- Clear Filter Button -->
            <div class="ml-auto mt-6">
                <button @click="handleClearFilters" :disabled="!hasActiveFilters"
                    class="px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200" :class="hasActiveFilters
                        ? 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300'
                        : 'bg-gray-50 text-gray-400 cursor-not-allowed border border-gray-200'">
                    <svg class="h-4 w-4 mr-1 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12">
                        </path>
                    </svg>
                    Clear
                </button>
            </div>

            <!-- Active Filters Display -->
            <div v-if="hasActiveFilters" class="mt-4 pt-4 border-t border-gray-200">
                <div class="flex flex-wrap items-center gap-2">
                    <span v-if="selectedType"
                        class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        Type: {{ getTypeLabel(selectedType) }}
                        <button @click="$emit('update:selectedType', '')"
                            class="ml-1.5 h-3 w-3 rounded-full flex items-center justify-center text-blue-400 hover:bg-blue-200 hover:text-blue-600">
                            <svg class="h-2 w-2" stroke="currentColor" fill="none" viewBox="0 0 8 8">
                                <path stroke-linecap="round" stroke-width="1.5" d="m1 1 6 6m0-6-6 6" />
                            </svg>
                        </button>
                    </span>

                    <span v-if="selectedStatus"
                        class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Status: {{ getStatusLabel(selectedStatus) }}
                        <button @click="$emit('update:selectedStatus', '')"
                            class="ml-1.5 h-3 w-3 rounded-full inline-flex items-center justify-center text-green-400 hover:bg-green-200 hover:text-green-600">
                            <span class="sr-only">Remove filter</span>
                            <svg class="h-2 w-2" stroke="currentColor" fill="none" viewBox="0 0 8 8">
                                <path stroke-linecap="round" stroke-width="1.5" d="m1 1 6 6m0-6-6 6" />
                            </svg>
                        </button>
                    </span>

                    <span v-if="searchQuery"
                        class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                        Search: "{{ searchQuery }}"
                        <button @click="$emit('update:searchQuery', '')"
                            class="ml-1.5 h-3 w-3 rounded-full inline-flex items-center justify-center text-purple-400 hover:bg-purple-200 hover:text-purple-600">
                            <span class="sr-only">Remove filter</span>
                            <svg class="h-2 w-2" stroke="currentColor" fill="none" viewBox="0 0 8 8">
                                <path stroke-linecap="round" stroke-width="1.5" d="m1 1 6 6m0-6-6 6" />
                            </svg>
                        </button>
                    </span>

                </div>

            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
    selectedType: string
    selectedStatus: string
    searchQuery: string
}>()

const emit = defineEmits<{
    'update:selectedType': [value: string]
    'update:selectedStatus': [value: string]
    'update:searchQuery': [value: string]
    'clear': []
}>()

const hasActiveFilters = computed(() => {
    return !!(props.selectedType || props.selectedStatus || props.searchQuery)
})

const handleClearFilters = () => {
    emit('update:selectedType', '')
    emit('update:selectedStatus', '')
    emit('update:searchQuery', '')
    emit('clear')
}

const getTypeLabel = (type: string) => {
    const typeLabels: {[key: string]: string} = {
        'FUTSAL': 'Futsal',
        'BASKET': 'Basket',
        'BADMINTON': 'Badminton',
        'TENNIS': 'Tennis',
        'MINI_SOCCER': 'Mini Soccer'
    }

    return typeLabels[type] || type
}

const getStatusLabel = (status: string) => {
    const statusLabels: {[key: string]: string} = {
        'AVAILABLE': 'Tersedia',
        'MAINTENANCE': 'Maintenance'
    }

    return statusLabels[status] || status
}

</script>