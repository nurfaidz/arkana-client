<template>
    <div>
        <!-- Page Header -->
        <div class="flex items-center justify-between mb-8">
            <div>
                <h2 class="text-3xl font-bold text-gray-900 mb-2">Management Lapangan</h2>
                <p class="text-gray-600">Kelola dan monitor semua lapangan olahraga</p>
            </div>
            <BaseButton variant="primary" @click="showAddFieldModal = true">
                <svg class="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                </svg>
                Tambah Lapangan
            </BaseButton>
        </div>

        <!-- Quick Stats -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div class="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <div class="flex items-center">
                    <div class="p-3 rounded-full bg-blue-100">
                        <svg class="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4">
                            </path>
                        </svg>
                    </div>
                    <div class="ml-4">
                        <p class="text-sm font-medium text-gray-600">Total Lapangan</p>
                        <p class="text-2xl font-bold text-gray-900">{{ totalFields }}</p>
                    </div>
                </div>
            </div>

            <div class="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <div class="flex items-center">
                    <div class="p-3 rounded-full bg-green-100">
                        <svg class="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                    </div>
                    <div class="ml-4">
                        <p class="text-sm font-medium text-gray-600">Lapangan Tersedia</p>
                    <p class="text-2xl font-bold text-gray-900">{{ availableFields }}</p>
                    </div>
                </div>
            </div>

            <div class="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <div class="flex items-center">
                    <div class="p-3 rounded-full bg-yellow-100">
                        <svg class="h-6 w-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.996-.833-2.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z">
                            </path>
                        </svg>
                    </div>
                    <div class="ml-4">
                        <p class="text-sm font-medium text-gray-600">Perlu Maintenance</p>
                        <p class="text-2xl font-bold text-gray-900">{{ maintenanceFields }}</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Filters -->
        <div class="bg-white rounded-xl shadow-lg border border-gray-200 p-6 mb-8">
            <div class="flex flex-wrap items-center gap-4">
                <div>
                    <label class="text-sm font-medium text-gray-700 mb-2 block">Filter by Type</label>
                    <select v-model="selectedType"
                        class="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="" disabled selected>Pilih jenis lapangan</option>
                        <option value="FUTSAL">Futsal</option>
                        <option value="BASKET">Basket</option>
                        <option value="BADMINTON">Badminton</option>
                        <option value="TENNIS">Tennis</option>
                        <option value="MINI_SOCCER">Mini Soccer</option>
                    </select>
                </div>
                <div>
                    <label class="text-sm font-medium text-gray-700 mb-2 block">Filter by Status</label>
                    <select v-model="selectedStatus"
                        class="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="" disabled selected>Pilih status lapangan</option>
                        <option value="AVAILABLE">Aktif</option>
                        <option value="MAINTENANCE">Maintenance</option>
                    </select>
                </div>
                <div>
                    <label class="text-sm font-medium text-gray-700 mb-2 block">Search</label>
                    <input v-model="searchQuery" type="text" placeholder="Cari nama lapangan..."
                        class="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                </div>
            </div>
        </div>

        <!-- Fields List -->
        <div class="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
            <div class="px-6 py-4 border-b border-gray-200">
                <h3 class="text-lg font-semibold text-gray-900">Daftar Lapangan</h3>
            </div>
            <div class="overflow-x-auto">
                <div v-if="loading" class="text-center py-6">
                    <p class="text-gray-600">Memuat data lapangan...</p>
                </div>
                <div v-else-if="error" class="text-red-600 text-center py-6">
                    <p>{{ error }}</p>
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
                        <tr v-for="field in filteredFields" :key="field.id" class="border-t hover:bg-gray-50">
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
                                <div class="flex space-x-2">
                                    <BaseButton variant="outline" size="sm" @click="editField(field)">
                                        Edit
                                    </BaseButton>
                                    <!-- <BaseButton variant="outline" size="sm" @click="toggleFieldStatus(field)">
                                        {{ field.status === 'active' ? 'Nonaktifkan' : 'Aktifkan' }}
                                    </BaseButton> -->
                                    <BaseButton variant="danger" size="sm" @click="deleteField(field.id)">
                                        Hapus
                                    </BaseButton>
                                </div>
                            </td>
                        </tr>
                        <tr v-if="filteredFields.length === 0">
                            <td colspan="5" class="py-4 px-6 text-center text-gray-500">
                                Tidak ada lapangan yang ditemukan
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <!-- Add Field Modal -->
        <div v-if="showAddFieldModal"
            class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div class="bg-white rounded-xl shadow-2xl max-w-2xl w-full mx-4 max-h-screen overflow-y-auto">
                <div class="p-6">
                    <div class="flex items-center justify-between mb-6">
                        <h3 class="text-xl font-semibold text-gray-900">Tambah Lapangan Baru</h3>
                        <button @click="showAddFieldModal = false" class="text-gray-500 hover:text-gray-700">
                            <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        </button>
                    </div>

                    <form @submit.prevent="addField">
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Nama Lapangan</label>
                                <input type="text" required
                                    class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Contoh: Lapangan Futsal A" />
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Jenis Lapangan</label>
                                <select required
                                    class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                                    <option value="" disabled selected>Pilih jenis</option>
                                    <option value="FUTSAL">Futsal</option>
                                    <option value="BASKET">Basket</option>
                                    <option value="BADMINTON">Badminton</option>
                                    <option value="TENNIS">Tennis</option>
                                    <option value="MINI_SOCCER">Mini Soccer</option>
                                </select>
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Harga / Jam</label>
                                <input type="number" min="0"
                                    class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Contoh: 75000" />
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Status</label>
                                <select required
                                    class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                                    <option disabled selected>Pilih status</option>
                                    <option value="AVAILABLE">Tersedia</option>
                                    <option value="MAINTENANCE">Maintenance</option>
                                </select>
                            </div>
                        </div>

                        <div class="mt-6 flex justify-end space-x-2">
                            <BaseButton variant="outline" @click="showAddFieldModal = false">Batal</BaseButton>
                            <BaseButton type="submit" variant="primary">Simpan</BaseButton>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import fieldApi from '../../services/field'
import BaseButton from '../../components/ui/BaseButton.vue'

const showAddFieldModal = ref(false)
const searchQuery = ref('')
const selectedType = ref('')
const selectedStatus = ref('')
const loading = ref(false)
const error = ref(null)

const fields = ref([])

const fetchFields = async () => {
    loading.value = true
    error.value = null
    try {
        const response = await fieldApi.getFields()
        console.log('Fields fetched:', response.data)
        fields.value = response.data
    } catch (err) {
        error.value = err.response?.data?.message
        console.log(err)
    } finally {
        loading.value = false
    }
}

fetchFields()

const totalFields = computed(() => fields.value.length)
const availableFields = computed(() => fields.value.filter(f => f.status === 'AVAILABLE').length)
const maintenanceFields = computed(() => fields.value.filter(f => f.status === 'MAINTENANCE').length)

const filteredFields = computed(() => {
    return fields.value.filter(field => {
        const matchesType = selectedType.value === '' || field.type === selectedType.value
        const matchesStatus = selectedStatus.value === '' || field.status === selectedStatus.value
        const matchesSearch = field.name.toLowerCase().includes(searchQuery.value.toLowerCase())
        return matchesType && matchesStatus && matchesSearch
    })
})

const getStatusText = (status) => {
    switch (status) {
        case 'active': return 'Aktif'
        case 'maintenance': return 'Maintenance'
        case 'inactive': return 'Tidak Aktif'
        default: return status
    }
}

const getStatusClass = (status) => {
    switch (status) {
        case 'active': return 'bg-green-100 text-green-700'
        case 'maintenance': return 'bg-yellow-100 text-yellow-700'
        case 'inactive': return 'bg-gray-100 text-gray-700'
        default: return 'bg-gray-100 text-gray-700'
    }
}

const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(amount)
}

const formatDate = (date) => {
    return new Date(date).toLocaleDateString('id-ID', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    })
}

const editField = (field) => {
    alert('Edit feature belum diimplementasikan.')
}

const toggleFieldStatus = (field) => {
    field.status = field.status === 'active' ? 'inactive' : 'active'
}

const deleteField = (id) => {
    if (confirm('Yakin ingin menghapus lapangan ini?')) {
        fields.value = fields.value.filter(f => f.id !== id)
    }
}
</script>
