<template>
    <div class="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        <div class="px-6 py-4 border-b border-gray-200">
            <h3 class="text-lg font-semibold text-gray-900">Jadwal Booking Lapangan</h3>
        </div>
        <div class="overflow-x-auto">
            <div v-if="loading" class="text-center py-6">
                <div class="inline-flex items-center">
                    <div class="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mr-3"></div>
                    <p class="text-gray-600">Memuat data booking...</p>
                </div>
            </div>
            <table v-else class="w-full text-sm text-left text-gray-600">
                <thead class="bg-gray-50">
                    <tr>
                        <th class="py-3 px-6 font-medium text-gray-900">Lapangan</th>
                        <th class="py-3 px-6 font-medium text-gray-900">Pemesan</th>
                        <th class="py-3 px-6 font-medium text-gray-900">Tanggal</th>
                        <th class="py-3 px-6 font-medium text-gray-900">Jam</th>
                        <th class="py-3 px-6 font-medium text-gray-900">Status</th>
                        <th class="py-3 px-6 font-medium text-gray-900">Total Harga</th>
                        <th class="py-3 px-6 font-medium text-gray-900">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="booking in bookings" :key="booking.id" class="border-t hover:bg-gray-50">
                        <td class="py-4 px-6">
                            <div>
                                <p class="font-medium text-gray-900">{{ booking.field.name }}</p>
                                <p class="text-xs text-gray-500">{{ booking.field.type }}</p>
                            </div>
                        </td>
                        <td class="py-4 px-6">
                            <div>
                                <p class="font-medium text-gray-900">{{ booking.booking_name }}</p>
                                <p class="text-xs text-gray-500">{{ booking.phone }}</p>
                            </div>
                        </td>
                        <td class="py-4 px-6">
                            <div class="flex items-center">
                                <div class="flex-shrink-0 w-2 h-2 rounded-full mr-2"
                                     :class="getDateIndicatorClass(booking.date)"></div>
                                <span class="font-medium">{{ formatDate(booking.date) }}</span>
                            </div>
                        </td>
                        <td class="py-4 px-6">
                            <div class="bg-blue-50 px-3 py-2 rounded-lg">
                                <p class="font-medium text-blue-900">{{ formatTime(booking.start_at) }} - {{ formatTime(booking.end_at) }}</p>
                            </div>
                        </td>
                        <td class="py-4 px-6">
                            <div class="flex items-center space-x-3">
                                <span :class="getStatusClass(booking.booking_status)"
                                    class="px-3 py-1 rounded-full text-xs font-medium">
                                    {{ getStatusText(booking.booking_status) }}
                                </span>
                                
                                <!-- Toggle Status -->
                                <div class="flex items-center space-x-2">
                                    <span class="text-xs text-gray-500">DP</span>
                                    <button
                                        @click="handleToggleStatus(booking)"
                                        :class="[
                                            'relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
                                            booking.booking_status === 'PAID' ? 'bg-green-600' : 'bg-gray-300'
                                        ]"
                                        :title="getToggleTitle(booking.booking_status)"
                                    >
                                        <span
                                            :class="[
                                                'inline-block h-4 w-4 transform rounded-full bg-white transition-transform',
                                                booking.booking_status === 'PAID' ? 'translate-x-6' : 'translate-x-1'
                                            ]"
                                        />
                                    </button>
                                    <span class="text-xs text-gray-500">Lunas</span>
                                </div>
                            </div>
                        </td>
                        <td class="py-4 px-6">
                            <p class="font-semibold text-gray-900">{{ formatCurrency(booking.total_price) }}</p>
                        </td>
                        <td class="py-4 px-6">
                            <div class="flex items-center space-x-2">
                                <BaseButton 
                                    variant="outline" 
                                    size="sm" 
                                    @click="$emit('edit', booking)"
                                    class="text-blue-600 border-blue-200 hover:bg-blue-50">
                                    <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                    </svg>
                                    Edit
                                </BaseButton>

                                <BaseButton 
                                    variant="danger" 
                                    size="sm" 
                                    @click="$emit('delete', booking)"
                                    class="text-red-600 border-red-200 hover:bg-red-50">
                                    <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                    Hapus
                                </BaseButton>
                            </div>
                        </td>
                    </tr>
                    <tr v-if="bookings.length === 0 && !loading">
                        <td colspan="7" class="py-8 px-6 text-center">
                            <div class="flex flex-col items-center">
                                <svg class="w-12 h-12 text-gray-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                </svg>
                                <p class="text-gray-500 font-medium">Belum ada booking</p>
                                <p class="text-gray-400 text-sm mt-1">Booking akan muncul di sini setelah ada pesanan</p>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        
        <!-- Summary Footer -->
        <div v-if="bookings.length > 0" class="px-6 py-4 bg-gray-50 border-t border-gray-200">
            <div class="flex justify-between items-center text-sm text-gray-600">
                <span>Total {{ bookings.length }} booking</span>
                <span>Total Pendapatan: <strong class="text-gray-900">{{ formatCurrency(totalRevenue) }}</strong></span>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import BaseButton from '../ui/BaseButton.vue'

interface Booking {
    id: number | string
    field: {
        id: number | string
        name: string
        type: string
        hourly_rate: number
    }
    booking_name: string
    phone: string
    date: string
    start_at: string
    end_at: string
    total_price: number
    booking_status: 'DOWNPAYMENT' | 'PAID'
}   

const props = defineProps<{
    bookings: Booking[]
    loading: boolean
}>()

const emit = defineEmits<{
    edit: [booking: Booking]
    delete: [booking: Booking]
    'toggle-status': [booking: Booking]
}>()

// Computed properties
const totalRevenue = computed(() => {
    return props.bookings.reduce((total, booking) => total + booking.total_price, 0)
})

// Helper functions
const getStatusText = (status: string) => {
    const statusMap: { [key: string]: string } = {
        'DOWNPAYMENT': 'DP Saja',
        'PAID': 'Lunas',
    }
    return statusMap[status] || status
}

const getStatusClass = (status: string) => {
    const statusClasses: { [key: string]: string } = {
        'DOWNPAYMENT': 'bg-orange-100 text-orange-800',
        'PAID': 'bg-green-100 text-green-800',
    }
    return statusClasses[status] || 'bg-gray-100 text-gray-800'
}

const getDateIndicatorClass = (dateString: string) => {
    const bookingDate = new Date(dateString)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    bookingDate.setHours(0, 0, 0, 0)
    
    const diffTime = bookingDate.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    
    if (diffDays < 0) return 'bg-gray-400' // Past
    if (diffDays === 0) return 'bg-green-500' // Today
    if (diffDays <= 7) return 'bg-orange-500' // This week
    return 'bg-blue-500' // Future
}

const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('id-ID', {
        weekday: 'short',
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    })
}

const formatTime = (timeString: string) => {
    // Handle both DateTime and time-only strings
    if (timeString.includes('T')) {
        // DateTime format
        const date = new Date(timeString)
        return date.toLocaleTimeString('id-ID', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        })
    } else {
        // Time-only format (HH:mm)
        return timeString
    }
}

const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(amount)
}

const getToggleTitle = (status: string) => {
    return status === 'PAID' ? 'Ubah ke DP Saja' : 'Ubah ke Lunas'
}

const handleToggleStatus = (booking: Booking) => {
    emit('toggle-status', booking)
}
</script>