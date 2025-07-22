<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const authPages = ['/auth/login']
const isAuthPage = computed(() => authPages.includes(route.path))
</script>

<template>
  <div id="app">
    <!-- Header/Navigation untuk halaman non-auth -->
    <header v-if="!isAuthPage" class="bg-white shadow">
      <nav class="container mx-auto px-4 py-4">
        <router-link to="/" class="text-blue-600 hover:text-blue-800">Home</router-link>
        <router-link to="/auth/login" class="ml-4 text-blue-600 hover:text-blue-800">Login</router-link>
      </nav>
    </header>

    <!-- Main content -->
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>