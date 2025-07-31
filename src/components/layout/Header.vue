<template>
    <header class="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
        <div class="px-6 py-4">
            <div class="flex justify-between items-center">
                <!-- Brand -->
                <div class="flex items-center">
                    <div class="h-10 w-10 bg-blue-600 rounded-full flex items-center justify-center">
                        <svg class="h-6 w-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path
                                d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                        </svg>
                    </div>
                    <div class="ml-3">
                        <h1 class="text-xl font-bold text-gray-900">SportBooking</h1>
                        <p class="text-sm text-gray-500">Management System</p>
                    </div>
                </div>

                <!-- User Menu -->
                <div class="flex items-center space-x-4">
                    <!-- Notifications -->
                    <button class="relative p-2 text-gray-400 hover:text-gray-600 transition-colors">
                        <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M15 17h5l-5 5v-5zM11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"></path>
                        </svg>
                        <span class="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
                    </button>

                    <!-- User Profile -->
                    <div class="flex items-center space-x-3">
                        <div class="text-right">
                            <p class="text-sm font-medium text-gray-900">{{ user.name }}</p>
                            <!-- <p class="text-xs text-gray-500">{{ user.role }}</p> -->
                        </div>
                        <div class="h-8 w-8 bg-blue-600 rounded-full flex items-center justify-center">
                            <span class="text-sm font-bold text-white">{{ user.name.charAt(0) }}</span>
                        </div>
                        <button @click="handleLogout" :disabled="loggingOut" :class="[
                            'flex items-center space-x-2 px-3 py-2 text-sm rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-red-500',
                            loggingOut
                                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                : 'text-gray-600 hover:text-red-600 hover:bg-red-50'
                        ]" title="Logout">
                            <svg v-if="loggingOut" class="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                    stroke-width="4"></circle>
                                <path class="opacity-75" fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                                </path>
                            </svg>

                            <svg v-else class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1">
                                </path>
                            </svg>

                            {{ loggingOut ? 'Logging out...' : '' }}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </header>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import authApi from '../../services/auth'


defineProps<{
    user: {
        name: string
        email: string
        role: string
        // loginTime: string
        // lastLogin: string
    }
}>()

const loggingOut = ref(false);

const handleLogout = async () => {
    if (loggingOut.value) return;

    try {
        loggingOut.value = true;
        await authApi.logout();
    } finally {
        loggingOut.value = false;
    }
}
</script>