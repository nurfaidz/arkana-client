<script setup>
import { ref, computed, onMounted } from 'vue'
import { useToast } from './composables/useToast'
import ToastContainer from './components/ui/ToastContainer.vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const toastContainerRef = ref()
const { setToastContainer } = useToast()

onMounted(() => {
  if (toastContainerRef.value) {
    setToastContainer(toastContainerRef.value)
  }
})

const authPages = ['/auth/login']
const isAuthPage = computed(() => authPages.includes(route.path))
</script>

<template>
  <div id="app">

    <!-- Main content -->
    <main>
      <router-view></router-view>
      <ToastContainer ref="toastContainerRef" />
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