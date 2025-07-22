<template>
    <div
        class="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-4 lg:px-8">
        <div class="max-w-md w-full space-y-8">
            <div class="text-center">
                <div class="mx-auto h-16 w-16 bg-blue-600 rounded-full flex items-center justify-center">
                    <svg class="h-8 w-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path
                            d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                    </svg>
                </div>
                <h2 class="mt-4 text-3xl font-bold text-gray-900">
                    SportBooking
                </h2>
                <p class="mt-2 text-sm text-gray-600">
                    {{ subtitle }}
                </p>
            </div>

            <div class="bg-white py-8 px-8 shadow-lg rounded-xl border border-gray-200">
                <slot/>
            </div>

            <!-- Footer -->
             <div class="text-center">
                <slot name="footer"/>
             </div>

        </div>
    </div>
</template>

<script>
export default {
    name: 'AuthLayout',
    props: {
        subtitle: {
            type: String,
            default: 'Welcome to SportBooking, your go-to platform for booking sports facilities.'
        }
    }
}
</script>