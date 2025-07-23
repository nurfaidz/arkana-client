<script setup lang="ts">
import { ref, reactive, onMounted, computed } from 'vue'
import BaseButton from '../../components/ui/BaseButton.vue'

// Mock data - Admin/Pengelola perspective
const user = ref({
    name: 'Nur',
    email: 'nur@example.com',
    role: 'Facility Manager'
})

const stats = reactive({
    totalRevenue: 15750000,
    todayRevenue: 2100000,
    totalBookings: 156,
    todayBookings: 12,
    activeFields: 8,
    totalFields: 10,
    occupancyRate: 78,
    avgRating: 4.7
})

// Revenue data for chart
const revenueData = ref([
    { day: 'Sen', amount: 1200000 },
    { day: 'Sel', amount: 1800000 },
    { day: 'Rab', amount: 2200000 },
    { day: 'Kam', amount: 1900000 },
    { day: 'Jum', amount: 2800000 },
    { day: 'Sab', amount: 3200000 },
    { day: 'Min', amount: 2100000 }
])

// Field status real-time
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

// Top customers
const topCustomers = ref([
    { id: 1, name: 'Tim Garuda FC', bookings: 24, revenue: 3600000, lastBooking: '2025-07-23' },
    { id: 2, name: 'Club Basket Pro', bookings: 18, revenue: 2700000, lastBooking: '2025-07-22' },
    { id: 3, name: 'Badminton Club Elite', bookings: 15, revenue: 1800000, lastBooking: '2025-07-21' },
    { id: 4, name: 'Tennis Academy', bookings: 12, revenue: 2400000, lastBooking: '2025-07-20' }
])

// Upcoming bookings
const upcomingBookings = ref([
    { id: 1, field: 'Futsal A', customer: 'Tim Elang', time: '15:00 - 17:00', status: 'confirmed', amount: 300000 },
    { id: 2, field: 'Badminton 2', customer: 'Turnamen Mini', time: '17:00 - 21:00', status: 'pending', amount: 400000 },
    { id: 3, field: 'Tennis Court', customer: 'Match Game', time: '15:30 - 17:30', status: 'confirmed', amount: 250000 },
    { id: 4, field: 'Futsal B', customer: 'Liga Malam', time: '19:00 - 21:00', status: 'confirmed', amount: 350000 }
])

// Weather data
const weather = ref({
    condition: 'sunny',
    temperature: 32,
    humidity: 65,
    forecast: 'Cerah berawan, cocok untuk aktivitas outdoor'
})

// Notifications
const notifications = ref([
    { id: 1, type: 'warning', message: 'Lapangan Badminton 1 perlu maintenance segera', priority: 'high' },
    { id: 2, type: 'info', message: '3 booking menunggu konfirmasi pembayaran', priority: 'medium' },
    { id: 3, type: 'success', message: 'Target revenue harian tercapai 105%', priority: 'low' }
])

// Computed properties
const occupiedFields = computed(() => fieldStatus.value.filter(field => field.status === 'occupied').length)
const availableFields = computed(() => fieldStatus.value.filter(field => field.status === 'available').length)
const maintenanceFields = computed(() => fieldStatus.value.filter(field => field.status === 'maintenance').length)

// Helper functions
const getFieldStatusColor = (status) => {
    switch (status) {
        case 'occupied':
            return 'bg-red-100 text-red-800 border-red-200'
        case 'available':
            return 'bg-green-100 text-green-800 border-green-200'
        case 'maintenance':
            return 'bg-yellow-100 text-yellow-800 border-yellow-200'
        default:
            return 'bg-gray-100 text-gray-800 border-gray-200'
    }
}

const getFieldStatusText = (status) => {
    switch (status) {
        case 'occupied':
            return 'Terpakai'
        case 'available':
            return 'Tersedia'
        case 'maintenance':
            return 'Maintenance'
        default:
            return status
    }
}

const getActivityIcon = (type) => {
    const icons = {
        booking: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
        payment: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1',
        cancellation: 'M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z',
        maintenance: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z',
        star: 'M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z'
    }
    return icons[type] || icons.booking
}

const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(amount)
}

const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short'
    })
}

onMounted(() => {
    console.log('Admin Dashboard loaded')
})
</script>

<template>
    <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <!-- Header -->
        <header class="bg-white shadow-sm border-b border-gray-200">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex justify-between items-center py-4">
                    <div class="flex items-center">
                        <div class="h-10 w-10 bg-blue-600 rounded-full flex items-center justify-center">
                            <svg class="h-6 w-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                            </svg>
                        </div>
                        <div class="ml-3">
                            <h1 class="text-2xl font-bold text-gray-900">SportBooking</h1>
                            <p class="text-sm text-gray-500">Management Dashboard</p>
                        </div>
                    </div>
                    <div class="flex items-center space-x-4">
                        <!-- Notifications -->
                        <div class="relative">
                            <button class="p-2 text-gray-400 hover:text-gray-600 relative">
                                <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-5 5v-5zM12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                                <span class="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">{{ notifications.length }}</span>
                            </button>
                        </div>
                        <div class="text-right">
                            <p class="text-sm font-medium text-gray-900">{{ user.name }}</p>
                            <p class="text-xs text-gray-500">{{ user.role }}</p>
                        </div>
                        <BaseButton variant="outline" size="sm">
                            Logout
                        </BaseButton>
                    </div>
                </div>
            </div>
        </header>

        <!-- Main Content -->
        <main class="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
            <!-- Welcome Section -->
            <div class="mb-8">
                <h2 class="text-3xl font-bold text-gray-900 mb-2">Dashboard Pengelola</h2>
                <p class="text-gray-600">Kelola fasilitas olahraga Anda dengan mudah dan efisien</p>
            </div>

            <!-- Quick Stats -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div class="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                    <div class="flex items-center">
                        <div class="p-3 rounded-full bg-green-100">
                            <svg class="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
                            </svg>
                        </div>
                        <div class="ml-4">
                            <p class="text-sm font-medium text-gray-600">Revenue Hari Ini</p>
                            <p class="text-2xl font-bold text-gray-900">{{ formatCurrency(stats.todayRevenue) }}</p>
                            <p class="text-xs text-green-600">+12% dari kemarin</p>
                        </div>
                    </div>
                </div>

                <div class="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                    <div class="flex items-center">
                        <div class="p-3 rounded-full bg-blue-100">
                            <svg class="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                            </svg>
                        </div>
                        <div class="ml-4">
                            <p class="text-sm font-medium text-gray-600">Booking Hari Ini</p>
                            <p class="text-2xl font-bold text-gray-900">{{ stats.todayBookings }}</p>
                            <p class="text-xs text-blue-600">{{ stats.totalBookings }} total bulan ini</p>
                        </div>
                    </div>
                </div>

                <div class="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                    <div class="flex items-center">
                        <div class="p-3 rounded-full bg-purple-100">
                            <svg class="h-6 w-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                            </svg>
                        </div>
                        <div class="ml-4">
                            <p class="text-sm font-medium text-gray-600">Tingkat Okupansi</p>
                            <p class="text-2xl font-bold text-gray-900">{{ stats.occupancyRate }}%</p>
                            <p class="text-xs text-purple-600">{{ occupiedFields }}/{{ stats.totalFields }} lapangan aktif</p>
                        </div>
                    </div>
                </div>

                <div class="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                    <div class="flex items-center">
                        <div class="p-3 rounded-full bg-yellow-100">
                            <svg class="h-6 w-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path>
                            </svg>
                        </div>
                        <div class="ml-4">
                            <p class="text-sm font-medium text-gray-600">Rating Rata-rata</p>
                            <p class="text-2xl font-bold text-gray-900">{{ stats.avgRating }}</p>
                            <p class="text-xs text-yellow-600">Dari 124 review</p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Quick Actions & Weather -->
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                <div class="lg:col-span-2 bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                    <h3 class="text-lg font-semibold text-gray-900 mb-4">Aksi Cepat</h3>
                    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <BaseButton variant="primary" class="flex flex-col items-center py-4">
                            <svg class="h-6 w-6 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                            </svg>
                            Walk-in Booking
                        </BaseButton>
                        <BaseButton variant="outline" class="flex flex-col items-center py-4">
                            <svg class="h-6 w-6 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                            </svg>
                            Laporan
                        </BaseButton>
                        <BaseButton variant="outline" class="flex flex-col items-center py-4">
                            <svg class="h-6 w-6 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                            </svg>
                            Maintenance
                        </BaseButton>
                        <BaseButton variant="outline" class="flex flex-col items-center py-4">
                            <svg class="h-6 w-6 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                            </svg>
                            Customers
                        </BaseButton>
                    </div>
                </div>

                <div class="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                    <h3 class="text-lg font-semibold text-gray-900 mb-4">Cuaca Hari Ini</h3>
                    <div class="text-center">
                        <div class="text-4xl mb-2">☀️</div>
                        <p class="text-2xl font-bold text-gray-900">{{ weather.temperature }}°C</p>
                        <p class="text-sm text-gray-600 mb-3">Kelembaban {{ weather.humidity }}%</p>
                        <p class="text-xs text-gray-500">{{ weather.forecast }}</p>
                    </div>
                </div>
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
                    <div v-for="field in fieldStatus" :key="field.id" 
                         :class="getFieldStatusColor(field.status)"
                         class="border-2 rounded-lg p-4 transition-all hover:shadow-md">
                        <div class="flex items-center justify-between mb-2">
                            <h4 class="font-medium">{{ field.name }}</h4>
                            <span class="text-xs px-2 py-1 rounded-full bg-white bg-opacity-50">
                                {{ field.type }}
                            </span>
                        </div>
                        <p class="text-sm font-medium mb-1">{{ getFieldStatusText(field.status) }}</p>
                        <div v-if="field.currentBooking" class="text-xs mb-1">
                            <p><strong>{{ field.currentBooking }}</strong></p>
                            <p v-if="field.timeLeft">Sisa: {{ field.timeLeft }}</p>
                        </div>
                        <div v-if="field.nextBooking" class="text-xs text-gray-600">
                            Selanjutnya: {{ field.nextBooking }}
                        </div>
                    </div>
                </div>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <!-- Recent Activities -->
                <div class="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                    <h3 class="text-lg font-semibold text-gray-900 mb-6">Aktivitas Terbaru</h3>
                    <div class="space-y-4">
                        <div v-for="activity in recentActivities" :key="activity.id" 
                             class="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                            <div class="p-2 rounded-full bg-blue-100">
                                <svg class="h-4 w-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="getActivityIcon(activity.type)"></path>
                                </svg>
                            </div>
                            
                            // Test

                            <div>
                                <p class="text-sm font-medium text-gray-900">{{ activity.message }}</p>
                                <p class="text-xs text-gray-500">{{ activity.time }}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Upcoming Bookings -->
                <div class="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                    <h3 class="text-lg font-semibold text-gray-900 mb-6">Booking Mendatang</h3>
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
                                    <span :class="{
                                        'text-green-600 font-semibold': booking.status === 'confirmed',
                                        'text-yellow-600 font-medium': booking.status === 'pending',
                                        'text-red-600 font-medium': booking.status === 'canceled'
                                    }">
                                        {{ booking.status }}
                                    </span>
                                </td>
                                <td>{{ formatCurrency(booking.amount) }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- Top Customers -->
            <div class="bg-white rounded-xl shadow-lg border border-gray-200 p-6 mt-8">
                <h3 class="text-lg font-semibold text-gray-900 mb-6">Pelanggan Terbaik</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div v-for="customer in topCustomers" :key="customer.id" class="border rounded-lg p-4 hover:shadow">
                        <h4 class="text-md font-semibold text-gray-800">{{ customer.name }}</h4>
                        <p class="text-sm text-gray-600">Booking: {{ customer.bookings }}</p>
                        <p class="text-sm text-gray-600">Total: {{ formatCurrency(customer.revenue) }}</p>
                        <p class="text-xs text-gray-500">Terakhir: {{ formatDate(customer.lastBooking) }}</p>
                    </div>
                </div>
            </div>
        </main>
    </div>
</template>
