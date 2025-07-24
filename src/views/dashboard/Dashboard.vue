<template>
    <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <!-- Header -->
        <Header :user="user" @logout="handleLogout" />

        <div class="flex">
            <!-- Sidebar -->
            <Sidebar :current-page="currentPage" @navigate="handleNavigation" />

            <!-- Main Content -->
            <main class="flex-1 ml-64 p-6">
                <component :is="currentPageComponent" :user="user" @navigate="handleNavigation" />
            </main>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import Header from '../../components/layout/Header.vue'
import Sidebar from '../../components/layout/Sidebar.vue'
import DashboardPage from '../../components/dashboard/DashboardPage.vue'
import FieldPage from '../../components/field/FieldPage.vue'
// import AccountManagementPage from './pages/AccountManagementPage.vue'
// import BookingFormPage from './pages/BookingFormPage.vue'

// User data
const user = ref({
    name: 'Nur',
    email: 'nur@example.com',
    role: 'Facility Manager',
    loginTime: '09:30 WIB',
    lastLogin: '23 Juli 2025'
})

// Navigation state
const currentPage = ref('dashboard')

// Page components mapping
const pageComponents = {
    dashboard: DashboardPage,
    fields: FieldPage,
    // accounts: AccountManagementPage,
    // booking: BookingFormPage
}

const currentPageComponent = computed(() => {
    return pageComponents[currentPage.value] || DashboardPage
})

// Event handlers
const handleNavigation = (page: string) => {
    currentPage.value = page
}

const handleLogout = () => {
    if (confirm('Apakah Anda yakin ingin logout?')) {
        alert('Logging out...')
        // Handle logout logic here
    }
}
</script>