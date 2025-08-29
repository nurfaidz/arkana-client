import {ref, watch, computed} from 'vue'
import { useToast } from './useToast'
import bookingApi from '../services/booking'

export interface Booking {
    id?: number | string
    field_id: number | string
    field: {
        id: number | string
        name: string
    },
    booking_name: string
    phone: string
    date: string
    start_at: string
    end_at: string
    total_price: number
    booking_status: string
}

export interface BookingFilters {
    status: string
    field_id: string | number
    searchQuery: string
}

export const useBookings = () => {
    const { success, error: showError } = useToast()

    // State
    const bookings = ref<Booking[]>([])
    const loading = ref(false)
    const isSubmitting = ref(false)

    const filters = ref<BookingFilters>({
        status: '',
        field_id: '',
        searchQuery: ''
    })

    // Computed
    const totalBookings = computed(() => bookings.value.length)

    // Methods
    const fetchBookings = async (filterParams?: BookingFilters) => {
        loading.value = true
        try {
            const currentFilters = await bookingApi.getBookings(filterParams)
            const response = await bookingApi.getBookings(currentFilters)

            bookings.value = response.data
        } catch (err: any) {
            showError(err.response?.data?.message || 'Gagal memuat data booking')
            console.error('Error fetching bookings:', err)
        } finally {
            loading.value = false
        }
    }

    watch(filters, (newFilters) => {
        fetchBookings(newFilters)
    }, { deep: true })

    const updateFilters = (newFilters: Partial<BookingFilters>) => {
        filters.value = { ...filters.value, ...newFilters }
    }

    const clearFilters = () => {
        filters.value = {
            status: '',
            field_id: '',
            searchQuery: ''
        }
    }

    const createBooking = async (bookingData: Omit<Booking, 'id'>) => {
        isSubmitting.value = true
        try {
            const response = await bookingApi.createBooking(bookingData)

            if (response.data) {
                bookings.value.push(response.data)
            } else {
                await fetchBookings()
            }

            success('Booking berhasil dibuat')
            return { success: true, data: response.data }
        } catch (error: any) {
            return { success: false, error }
        } finally {
            isSubmitting.value = false
        }
    }

    const updateBooking = async (id: string | number, bookingData: Omit<Booking, 'id'>) => {
        isSubmitting.value = true
        try {
            const response = await bookingApi.updateBooking(id, bookingData)

            const index = bookings.value.findIndex(b => b.id === id)
            if (index !== -1) {
                bookings.value[index] = response.data
            } else {
                await fetchBookings()
            }

            success('Booking berhasil diperbarui')
            return { success: true, data: response.data }
        } catch (error: any) {
            return { success: false, error }
        } finally {
            isSubmitting.value = false
        }
    }

    const deleteBooking = async (id: string | number) => {
        try {
            await bookingApi.deleteBooking(id)
            bookings.value = bookings.value.filter(b => b.id !== id)
            success('Booking berhasil dihapus')
            return { success: true }
        } catch (error: any) {
            showError(error.response?.data?.message || 'Gagal menghapus booking')
            return { success: false, error }
        }
    }

    const toggleBookingStatus = async (booking: Booking) => {
        try {
            await bookingApi.updateBookingStatus(booking.id)
            success('Status booking berhasil diperbarui')
            return { success: true }
        } catch (error) {
            showError(error.response?.data?.message || 'Gagal memperbarui status booking')
            return { success: false, error }
        }
    }

    const handleApiErrors = (error: any) => {
        if (error.response && error.response.data) {
            return error.response.data.errors
        } else {
            const errorMessage = error.response?.data?.message || 'Terjadi kesalahan tak terduga'
            showError(errorMessage)
            return null
        }
    }

    return {
        bookings,
        loading,
        isSubmitting,
        filters,

        // Computed
        totalBookings,

        // Methods
        fetchBookings,
        createBooking,
        updateBooking,
        deleteBooking,
        toggleBookingStatus,
        handleApiErrors,
        updateFilters,
        clearFilters,
    }
}