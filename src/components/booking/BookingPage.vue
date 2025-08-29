<template>
    <div>
        <!-- Page Header -->
        <div class="flex items-center justify-between mb-8">
            <div>
                <h2 class="text-3xl font-bold text-gray-900 mb-2">Booking & Jadwal</h2>
                <p class="text-gray-600">Kelola dan monitor semua booking lapangan olahraga</p>
            </div>
            <BaseButton variant="primary" @click="openAddModal">
                <svg class="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                </svg>
                Tambah Booking
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
                        <p class="text-sm font-medium text-gray-600">Total Booking</p>
                        <p class="text-2xl font-bold text-gray-900">{{ totalBookings }}</p>
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
                        <p class="text-sm font-medium text-gray-600">Booking Lunas</p>
                        <p class="text-2xl font-bold text-gray-900">{{ paidBookings }}</p>
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
                        <p class="text-sm font-medium text-gray-600">DP Saja</p>
                        <p class="text-2xl font-bold text-gray-900">{{ downPaymentBookings }}</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Filters -->
        <BookingFilters 
            :selectedStatus="filters.status"
            :selectedField="filters.field_id"
            :searchQuery="filters.searchQuery"
            :fields="availableFields"
            @update:selectedStatus="updateFilters({status: $event})"
            @update:selectedField="updateFilters({field_id: $event})"
            @update:searchQuery="updateFilters({searchQuery: $event})"
            @clear="clearFilters"
        />

        <!-- Bookings Table -->
        <BookingTable
            :bookings="filteredBookings"
            :loading="loading"
            @edit="openEditModal"
            @delete="handleDelete"
            @toggle-status="handleToggleStatus"
        />

        <!-- Booking Modal -->
        <BookingModal
            :show="showModal"
            :booking="selectedBooking"
            :fields="availableFields"
            :is-submitting="isSubmitting"
            @close="closeModal"
            @submit="handleSubmit"
            ref="bookingModalRef"
        />

        <!-- Delete Confirmation Modal -->
        <DeleteModal
            :show="showDeleteModal"
            :is-deleting="isDeleting"
            @confirm="confirmDelete"
            @cancel="cancelDelete"
        />
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useBookings, type Booking } from '../../composables/useBooking'
import { useFields, type Field } from '../../composables/useField'
import BaseButton from '../../components/ui/BaseButton.vue'
import BookingTable from './BookingTable.vue'
import BookingFilters from './BookingFilter.vue'
import BookingModal from './BookingModal.vue'
import DeleteModal from '../ui/DeleteModal.vue'

// Composables
const {
    bookings,
    loading,
    isSubmitting,
    filters,
    fetchBookings,
    createBooking,
    updateBooking,
    deleteBooking,
    toggleBookingStatus,
    handleApiErrors,
    updateFilters,
    clearFilters
} = useBookings()

const { fields: availableFields, fetchFields } = useFields()

// Modal state
const showModal = ref(false)
const selectedBooking = ref<Booking | null>(null)
const bookingModalRef = ref()

// Delete confirmation state
const showDeleteModal = ref(false)
const bookingToDelete = ref<Booking | null>(null)
const isDeleting = ref(false)

// Computed properties
const totalBookings = computed(() => bookings.value.length)

const paidBookings = computed(() => 
    bookings.value.filter(booking => booking.booking_status === 'PAID').length
)

const downPaymentBookings = computed(() => 
    bookings.value.filter(booking => booking.booking_status === 'DOWNPAYMENT').length
)

const filteredBookings = computed(() => {
    let filtered = [...bookings.value]

    // Filter by status
    if (filters.value.status) {
        filtered = filtered.filter(booking => booking.booking_status === filters.value.status)
    }

    // Filter by field
    if (filters.value.field_id) {
        filtered = filtered.filter(booking => booking.field.id.toString() === filters.value.field_id.toString())
    }

    // Filter by search query (booking name or phone)
    if (filters.value.searchQuery) {
        const query = filters.value.searchQuery.toLowerCase()
        filtered = filtered.filter(booking => 
            booking.booking_name?.toLowerCase().includes(query) ||
            booking.phone?.toLowerCase().includes(query)
        )
    }

    return filtered
})

// Methods
const openAddModal = () => {
    selectedBooking.value = null
    showModal.value = true
}

const openEditModal = (booking: Booking) => {
    selectedBooking.value = { ...booking }
    showModal.value = true
}

const closeModal = () => {
    showModal.value = false
    selectedBooking.value = null
}

const handleSubmit = async (bookingData: Booking) => {
    let result
    
    if (selectedBooking.value?.id) {
        // Edit mode
        result = await updateBooking(selectedBooking.value.id, bookingData)
    } else {
        // Add mode
        result = await createBooking(bookingData)
    }
    
    if (result.success) {
        closeModal()
    } else {
        // Handle API validation errors
        const apiErrors = handleApiErrors(result.error)
        if (apiErrors && bookingModalRef.value) {
            bookingModalRef.value.setErrors(apiErrors)
        }
    }
}

const handleDelete = async (booking: Booking) => {
    bookingToDelete.value = booking
    showDeleteModal.value = true
}

const confirmDelete = async () => {
    if (!bookingToDelete.value) return

    isDeleting.value = true
    await deleteBooking(bookingToDelete.value.id)
    isDeleting.value = false

    cancelDelete()
}

const cancelDelete = () => {
    showDeleteModal.value = false
    bookingToDelete.value = null
    isDeleting.value = false
}

const handleToggleStatus = async (booking: Booking) => {
    await toggleBookingStatus(booking)
    
    // Update local state
    const bookingIndex = bookings.value.findIndex(b => b.id === booking.id)
    if (bookingIndex !== -1) {
        bookings.value[bookingIndex].booking_status = 
            booking.booking_status === 'DOWNPAYMENT' ? 'PAID' : 'DOWNPAYMENT'
    }
}

// Lifecycle
onMounted(async () => {
    await Promise.all([
        fetchBookings(),
        fetchFields()
    ])
})
</script>