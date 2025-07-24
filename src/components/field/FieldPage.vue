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
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
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
                        <p class="text-sm font-medium text-gray-600">Lapangan Aktif</p>
                        <p class="text-2xl font-bold text-gray-900">{{ activeFields }}</p>
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

            <div class="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <div class="flex items-center">
                    <div class="p-3 rounded-full bg-purple-100">
                        <svg class="h-6 w-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z">
                            </path>
                        </svg>
                    </div>
                    <div class="ml-4">
                        <p class="text-sm font-medium text-gray-600">Rata-rata Okupansi</p>
                        <p class="text-2xl font-bold text-gray-900">{{ averageOccupancy }}%</p>
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
                        <option value="">Semua Jenis</option>
                        <option value="Futsal">Futsal</option>
                        <option value="Basketball">Basketball</option>
                        <option value="Badminton">Badminton</option>
                        <option value="Tennis">Tennis</option>
                        <option value="Volleyball">Volleyball</option>
                        <option value="Soccer">Soccer</option>
                    </select>
                </div>
                <div>
                    <label class="text-sm font-medium text-gray-700 mb-2 block">Filter by Status</label>
                    <select v-model="selectedStatus"
                        class="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="">Semua Status</option>
                        <option value="active">Aktif</option>
                        <option value="maintenance">Maintenance</option>
                        <option value="inactive">Tidak Aktif</option>
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
                <table class="w-full text-sm text-left text-gray-600">
                    <thead class="bg-gray-50">
                        <tr>
                            <th class="py-3 px-6 font-medium text-gray-900">Nama Lapangan</th>
                            <th class="py-3 px-6 font-medium text-gray-900">Jenis</th>
                            <th class="py-3 px-6 font-medium text-gray-900">Status</th>
                            <th class="py-3 px-6 font-medium text-gray-900">Harga/Jam</th>
                            <th class="py-3 px-6 font-medium text-gray-900">Fasilitas</th>
                            <th class="py-3 px-6 font-medium text-gray-900">Last Updated</th>
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
                                {{ formatCurrency(field.pricePerHour) }}
                            </td>
                            <td class="py-4 px-6">
                                <div class="flex flex-wrap gap-1">
                                    <span v-for="facility in field.facilities" :key="facility"
                                        class="px-1.5 py-0.5 bg-gray-100 text-gray-700 rounded text-xs">
                                        {{ facility }}
                                    </span>
                                </div>
                            </td>
                            <td class="py-4 px-6 text-gray-500">
                                {{ formatDate(field.lastUpdated) }}
                            </td>
                            <td class="py-4 px-6">
                                <div class="flex space-x-2">
                                    <BaseButton variant="outline" size="sm" @click="editField(field)">
                                        Edit
                                    </BaseButton>
                                    <BaseButton variant="outline" size="sm" @click="toggleFieldStatus(field)">
                                        {{ field.status === 'active' ? 'Nonaktifkan' : 'Aktifkan' }}
                                    </BaseButton>
                                    <BaseButton variant="danger" size="sm" @click="deleteField(field.id)">
                                        Hapus
                                    </BaseButton>
                                </div>
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
                                <input v-model="newField.name" type="text" required
                                    class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Contoh: Lapangan Futsal A" />
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Jenis Lapangan</label>
                                <select v-model="newField.type" required
                                    class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                                    <option value="">Pilih jenis</option>
                                    <option value="Futsal">Futsal</option>
                                    <option value="Basketball">Basketball</option>
                                    <option value="Badminton">Badminton</option>
                                    <option value="Tennis">Tennis</option>
                                    <option value="Volleyball">Volleyball</option>
                                    <option value="Soccer">Soccer</option>
                                </select>
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Harga / Jam</label>
                                <input v-model.number="newField.pricePerHour" type="number" min="0"
                                    class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Contoh: 75000" />
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Status</label>
                                <select v-model="newField.status" required
                                    class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                                    <option value="active">Aktif</option>
                                    <option value="maintenance">Maintenance</option>
                                    <option value="inactive">Tidak Aktif</option>
                                </select>
                            </div>
                            <div class="md:col-span-2">
                                <label class="block text-sm font-medium text-gray-700 mb-2">Fasilitas (pisahkan dengan
                                    koma)</label>
                                <input v-model="newField.facilitiesRaw" type="text"
                                    class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Contoh: Toilet, Kantin, Parkir" />
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

const showAddFieldModal = ref(false)
const searchQuery = ref('')
const selectedType = ref('')
const selectedStatus = ref('')

const fields = ref([
    {
        id: 1,
        name: 'Lapangan A',
        type: 'Futsal',
        status: 'active',
        pricePerHour: 75000,
        facilities: ['Toilet', 'Parkir'],
        lastUpdated: new Date()
    },
    {
        id: 2,
        name: 'Lapangan B',
        type: 'Basketball',
        status: 'maintenance',
        pricePerHour: 90000,
        facilities: ['Toilet'],
        lastUpdated: new Date()
    }
])

const newField = ref({
    name: '',
    type: '',
    status: 'active',
    pricePerHour: 0,
    facilitiesRaw: ''
})

const totalFields = computed(() => fields.value.length)
const activeFields = computed(() => fields.value.filter(f => f.status === 'active').length)
const maintenanceFields = computed(() => fields.value.filter(f => f.status === 'maintenance').length)
const averageOccupancy = computed(() => {
    // contoh dummy: pakai angka random
    return Math.floor(Math.random() * 100)
})

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

const addField = () => {
    fields.value.push({
        id: Date.now(),
        name: newField.value.name,
        type: newField.value.type,
        status: newField.value.status,
        pricePerHour: newField.value.pricePerHour,
        facilities: newField.value.facilitiesRaw.split(',').map(f => f.trim()),
        lastUpdated: new Date()
    })

    // Reset form
    newField.value = {
        name: '',
        type: '',
        status: 'active',
        pricePerHour: 0,
        facilitiesRaw: ''
    }

    showAddFieldModal.value = false
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
