<template>
    <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <!-- Header -->
        <Header :user="user" @logout="handleLogout" />

        <div class="flex">
            <!-- Sidebar -->
            <Sidebar :current-page="currentPage" @navigate="handleNavigation" />

            <!-- Main Content -->
            <main class="flex-1 ml-64 p-6">
                <router-view :user="user" @navigate="handleNavigation" />
            </main>
        </div>
    </div>
</template>

<script setup lang="ts">
import Cookies from 'js-cookie';
import { ref, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Header from '../../components/layout/Header.vue'
import Sidebar from '../../components/layout/Sidebar.vue'

const route = useRoute()
const router = useRouter()

const rawUser = Cookies.get('user')
const user = ref<{ name: string; email: string; role?: string } | null>(null)

if (rawUser) {
    try {
        user.value = JSON.parse(rawUser)
    } catch (e) {
        console.error('Failed to parse user cookie:', e)
    }
}

// Navigation state - sync with router
const currentPage = computed(() => {
    if (route.name === 'dashboard') return 'dashboard'
    return route.name || 'dashboard'
})

// Watch route changes to update current page
watch(route, (newRoute) => {
    console.log('Route changed to:', newRoute.name)
}, { immediate: true })

// Event handlers
const handleNavigation = (page: string) => {
    if (page === 'dashboard') {
        router.push('/dashboard')
    } else {
        router.push(`/dashboard/${page}`)
    }
}

const handleLogout = () => {
    if (confirm('Apakah Anda yakin ingin logout?')) {
        alert('Logging out...')
        // Handle logout logic here
        // router.push('/login')
    }
}
</script>