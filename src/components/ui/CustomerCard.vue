<template>
    <div class="border rounded-lg p-4 hover:shadow-md transition-shadow">
        <h4 class="text-md font-semibold text-gray-800">{{ customer.name }}</h4>
        <p class="text-sm text-gray-600">Booking: {{ customer.bookings }}</p>
        <p class="text-sm text-gray-600">Total: {{ formatCurrency(customer.revenue) }}</p>
        <p class="text-xs text-gray-500">Terakhir: {{ formatDate(customer.lastBooking) }}</p>
    </div>
</template>

<script setup lang="ts">
defineProps<{
    customer: {
        id: number
        name: string
        bookings: number
        revenue: number
        lastBooking: string
    }
}>()

const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(amount)
}

const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    })
}
</script>