<template>
    <div>
        <!-- Page Header -->
        <PageHeader title="Dashboard Overview" subtitle="Kelola fasilitas olahraga Anda dengan mudah dan efisien" />

        <!-- Quick Stats -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard v-for="stat in stats" :key="stat.id" :title="stat.title" :value="stat.value" :change="stat.change"
                :change-type="stat.changeType" :icon="stat.icon" :color="stat.color" />
        </div>

        <!-- Real-time Field Status -->
        <div class="bg-white rounded-xl shadow-lg border border-gray-200 p-6 mb-8">
            <div class="flex items-center justify-between mb-6">
                <h3 class="text-lg font-semibold text-gray-900">Status Lapangan Real-time</h3>
                <div class="flex space-x-4 text-sm">
                    <div class="flex items-center">
                        <div class="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                        <span>Tersedia ({{ availableFields }})</span>
                    </div>
                    <div class="flex items-center">
                        <div class="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                        <span>Terpakai ({{ occupiedFields }})</span>
                    </div>
                    <div class="flex items-center">
                        <div class="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                        <span>Maintenance ({{ maintenanceFields }})</span>
                    </div>
                </div>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <FieldStatusCard v-for="field in fieldStatus" :key="field.id" :field="field" />
            </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <!-- Recent Activities -->
            <div class="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <h3 class="text-lg font-semibold text-gray-900 mb-6">Aktivitas Terbaru</h3>
                <div class="space-y-4">
                    <ActivityItem v-for="activity in recentActivities" :key="activity.id" :activity="activity" />
                </div>
            </div>

            <!-- Upcoming Bookings -->
            <div class="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <h3 class="text-lg font-semibold text-gray-900 mb-6">Booking Mendatang</h3>
                <div class="overflow-x-auto">
                    <table class="w-full text-sm text-left text-gray-600">
                        <thead>
                            <tr>
                                <th class="py-2">Lapangan</th>
                                <th>Customer</th>
                                <th>Waktu</th>
                                <th>Status</th>
                                <th>Nominal</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="booking in upcomingBookings" :key="booking.id" class="border-t">
                                <td class="py-2 font-medium text-gray-900">{{ booking.field }}</td>
                                <td>{{ booking.customer }}</td>
                                <td>{{ booking.time }}</td>
                                <td>
                                    <span :class="getBookingStatusClass(booking.status)">
                                        {{ getBookingStatusText(booking.status) }}
                                    </span>
                                </td>
                                <td>{{ formatCurrency(booking.amount) }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <!-- Top Customers -->
        <div class="bg-white rounded-xl shadow-lg border border-gray-200 p-6 mt-8">
            <h3 class="text-lg font-semibold text-gray-900 mb-6">Pelanggan Terbaik</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <CustomerCard v-for="customer in topCustomers" :key="customer.id" :customer="customer" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import PageHeader from '../ui/PageHeader.vue'
import StatCard from '../ui/StatCard.vue'
import FieldStatusCard from '../ui/FieldStatusCard.vue'
import ActivityItem from '../ui/ActivityItem.vue'
import CustomerCard from '../ui/CustomerCard.vue'

// Props
defineProps<{
    user: any
}>()

// Emit
const emit = defineEmits<{
    navigate: [page: string]
}>()

// Statistics data
const stats = ref([
    {
        id: 'revenue',
        title: 'Revenue Hari Ini',
        value: 'Rp 2.100.000',
        change: '+12%',
        changeType: 'positive',
        icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1',
        color: 'green'
    },
    {
        id: 'bookings',
        title: 'Booking Hari Ini',
        value: '12',
        change: '156 total bulan ini',
        changeType: 'info',
        icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
        color: 'blue'
    },
    {
        id: 'occupancy',
        title: 'Tingkat Okupansi',
        value: '78%',
        change: '8/10 lapangan aktif',
        changeType: 'info',
        icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
        color: 'purple'
    },
    {
        id: 'rating',
        title: 'Rating Rata-rata',
        value: '4.7',
        change: 'Dari 124 review',
        changeType: 'info',
        icon: 'M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z',
        color: 'yellow'
    }
])

// Field status data
const fieldStatus = ref([
    { id: 1, name: 'Futsal A', type: 'Futsal', status: 'occupied', currentBooking: 'Tim Garuda', timeLeft: '45 menit', nextBooking: '16:00 - Tim Elang' },
    { id: 2, name: 'Futsal B', type: 'Futsal', status: 'available', currentBooking: null, timeLeft: null, nextBooking: '15:00 - Tim Merah' },
    { id: 3, name: 'Basket Indoor', type: 'Basketball', status: 'occupied', currentBooking: 'Club Basket Pro', timeLeft: '1 jam 20 menit', nextBooking: null },
    { id: 4, name: 'Badminton 1', type: 'Badminton', status: 'maintenance', currentBooking: null, timeLeft: null, nextBooking: 'Maintenance hingga 16:00' },
    { id: 5, name: 'Badminton 2', type: 'Badminton', status: 'available', currentBooking: null, timeLeft: null, nextBooking: '17:00 - Turnamen' },
    { id: 6, name: 'Tennis Court', type: 'Tennis', status: 'occupied', currentBooking: 'Private Lesson', timeLeft: '25 menit', nextBooking: '15:30 - Match Game' },
    { id: 7, name: 'Voli Indoor', type: 'Volleyball', status: 'available', currentBooking: null, timeLeft: null, nextBooking: null },
    { id: 8, name: 'Mini Soccer', type: 'Soccer', status: 'occupied', currentBooking: 'Liga Komunitas', timeLeft: '2 jam 15 menit', nextBooking: null }
])

// Recent activities
const recentActivities = ref([
    { id: 1, type: 'booking', message: 'Booking baru - Futsal A oleh Tim Garuda', time: '2 menit lalu', icon: 'calendar' },
    { id: 2, type: 'payment', message: 'Pembayaran Rp 200.000 diterima dari Tim Elang', time: '5 menit lalu', icon: 'money' },
    { id: 3, type: 'cancellation', message: 'Pembatalan booking Badminton 1 oleh John Doe', time: '15 menit lalu', icon: 'cancel' },
    { id: 4, type: 'maintenance', message: 'Lapangan Badminton 1 masuk jadwal maintenance', time: '30 menit lalu', icon: 'tool' },
    { id: 5, type: 'review', message: 'Review baru 5 bintang dari customer', time: '1 jam lalu', icon: 'star' }
])

// Upcoming bookings
const upcomingBookings = ref([
    { id: 1, field: 'Futsal A', customer: 'Tim Elang', time: '15:00 - 17:00', status: 'confirmed', amount: 300000 },
    { id: 2, field: 'Badminton 2', customer: 'Turnamen Mini', time: '17:00 - 21:00', status: 'pending', amount: 400000 },
    { id: 3, field: 'Tennis Court', customer: 'Match Game', time: '15:30 - 17:30', status: 'confirmed', amount: 250000 },
    { id: 4, field: 'Futsal B', customer: 'Liga Malam', time: '19:00 - 21:00', status: 'confirmed', amount: 350000 }
])

// Top customers
const topCustomers = ref([
    { id: 1, name: 'Tim Garuda FC', bookings: 24, revenue: 3600000, lastBooking: '2025-07-23' },
    { id: 2, name: 'Club Basket Pro', bookings: 18, revenue: 2700000, lastBooking: '2025-07-22' },
    { id: 3, name: 'Badminton Club Elite', bookings: 15, revenue: 1800000, lastBooking: '2025-07-21' },
    { id: 4, name: 'Tennis Academy', bookings: 12, revenue: 2400000, lastBooking: '2025-07-20' }
])

// Computed properties
const occupiedFields = computed(() => fieldStatus.value.filter(field => field.status === 'occupied').length)
const availableFields = computed(() => fieldStatus.value.filter(field => field.status === 'available').length)
const maintenanceFields = computed(() => fieldStatus.value.filter(field => field.status === 'maintenance').length)

// Helper functions
const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(amount)
}

const getBookingStatusClass = (status: string) => {
    switch (status) {
        case 'confirmed':
            return 'text-green-600 font-semibold'
        case 'pending':
            return 'text-yellow-600 font-medium'
        case 'canceled':
            return 'text-red-600 font-medium'
        default:
            return 'text-gray-600'
    }
}

const getBookingStatusText = (status: string) => {
    switch (status) {
        case 'confirmed':
            return 'Dikonfirmasi'
        case 'pending':
            return 'Menunggu'
        case 'canceled':
            return 'Dibatalkan'
        default:
            return status
    }
}
</script>