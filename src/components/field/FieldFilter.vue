<template>
    <div class="bg-white rounded-xl shadow-lg border border-gray-200 p-6 mb-8">
        <div class="flex flex-wrap items-center gap-4">
            <div>
                <label class="text-sm font-medium text-gray-700 mb-2 block">Filter by Type</label>
                <select
                    :value="selectedType"
                    @input="$emit('update:selectedType', ($event.target as HTMLSelectElement).value)"
                    class="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="">Semua Jenis</option>
                    <option value="FUTSAL">Futsal</option>
                    <option value="BASKET">Basket</option>
                    <option value="BADMINTON">Badminton</option>
                    <option value="TENNIS">Tennis</option>
                    <option value="MINI_SOCCER">Mini Soccer</option>
                </select>
            </div>
            <div>
                <label class="text-sm font-medium text-gray-700 mb-2 block">Filter by Status</label>
                <select
                    :value="selectedStatus"
                    @input="$emit('update:selectedStatus', ($event.target as HTMLSelectElement).value)"
                    class="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="">Semua Status</option>
                    <option value="AVAILABLE">Tersedia</option>
                    <option value="MAINTENANCE">Maintenance</option>
                </select>
            </div>
            <div>
                <label class="text-sm font-medium text-gray-700 mb-2 block">Search</label>
                <input
                    :value="searchQuery"
                    @input="$emit('update:searchQuery', ($event.target as HTMLInputElement).value)"
                    type="text"
                    placeholder="Cari nama lapangan..."
                    class="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
defineProps<{
    selectedType: string
    selectedStatus: string
    searchQuery: string
}>()

defineEmits<{
    'update:selectedType': [value: string]
    'update:selectedStatus': [value: string]
    'update:searchQuery': [value: string]
}>()
</script> 