<template>
    <div class="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        <div class="px-6 py-4 border-b border-gray-200">
            <h3 class="text-lg font-semibold text-gray-900">Daftar Lapangan</h3>
        </div>
        <div class="overflow-x-auto">
            <div v-if="loading" class="text-center py-6">
                <p class="text-gray-600">Memuat data lapangan...</p>
            </div>
            <table v-else class="w-full text-sm text-left text-gray-600">
                <thead class="bg-gray-50">
                    <tr>
                        <th class="py-3 px-6 font-medium text-gray-900">Nama Lapangan</th>
                        <th class="py-3 px-6 font-medium text-gray-900">Jenis</th>
                        <th class="py-3 px-6 font-medium text-gray-900">Status</th>
                        <th class="py-3 px-6 font-medium text-gray-900">Harga/Jam</th>
                        <th class="py-3 px-6 font-medium text-gray-900">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="field in fields" :key="field.id" class="border-t hover:bg-gray-50">
                        <td class="py-4 px-6">
                            <div>
                                <p class="font-medium text-gray-900">{{ field.name }}</p>
                                <p class="text-xs text-gray-500">ID: {{ field.id }}</p>
                            </div>
                        </td>
                        <td class="py-4 px-6">
                            <span class="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                                {{ field.type }}
                            </span>
                        </td>
                        <td class="py-4 px-6">
                            <span :class="getStatusClass(field.status)"
                                class="px-2 py-1 rounded-full text-xs font-medium">
                                {{ getStatusText(field.status) }}
                            </span>
                        </td>
                        <td class="py-4 px-6 font-medium text-gray-900">
                            {{ formatCurrency(field.hourly_rate) }}
                        </td>
                        <td class="py-4 px-6">
                            <div class="flex items-center space-x-3">
                                <BaseButton variant="outline" size="sm" @click="$emit('edit', field)">
                                    Edit
                                </BaseButton>
                                
                                <div class="flex items-center space-x-2">
                                    <span class="text-xs text-gray-500">Maintenance</span>
                                    <button
                                        @click="handleToggleStatus(field)"
                                        :class="[
                                            'relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
                                            field.status === 'AVAILABLE' ? 'bg-green-600' : 'bg-gray-300'
                                        ]"
                                    >
                                        <span
                                            :class="[
                                                'inline-block h-4 w-4 transform rounded-full bg-white transition-transform',
                                                field.status === 'AVAILABLE' ? 'translate-x-6' : 'translate-x-1'
                                            ]"
                                        />
                                    </button>
                                    <span class="text-xs text-gray-500">Tersedia</span>
                                </div>
                                
                                <BaseButton variant="danger" size="sm" @click="$emit('delete', field)">
                                    Hapus
                                </BaseButton>
                            </div>
                        </td>
                    </tr>
                    <tr v-if="fields.length === 0">
                        <td colspan="5" class="py-4 px-6 text-center text-gray-500">
                            Tidak ada lapangan yang ditemukan
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup lang="ts">
import BaseButton from '../ui/BaseButton.vue'

interface Field {
    id: number | string
    name: string
    type: string
    hourly_rate: number
    status: string
}

defineProps<{
    fields: Field[]
    loading: boolean
}>()

const emit = defineEmits<{
    edit: [field: Field]
    delete: [field: Field]
    'toggle-status': [field: Field]
}>()

const getStatusText = (status: string) => {
    switch (status) {
        case 'AVAILABLE': return 'Tersedia'
        case 'MAINTENANCE': return 'Maintenance'
        default: return status
    }
}

const getStatusClass = (status: string) => {
    switch (status) {
        case 'AVAILABLE': return 'bg-green-100 text-green-700'
        case 'MAINTENANCE': return 'bg-yellow-100 text-yellow-700'
        default: return 'bg-gray-100 text-gray-700'
    }
}

const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(amount)
}

function handleToggleStatus(field: Field) {
    emit('toggle-status', field)
}
</script>