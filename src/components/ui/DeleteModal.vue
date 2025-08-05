<template>
    <div
        v-if="show"
        class="fixed inset-0 z-50 overflow-y-auto"
        @click.self="$emit('cancel')"
    >
        <div class="flex min-h-full items-center justify-center p-4">
            <div class="fixed inset-0 bg-black bg-opacity-25 transition-opacity"></div>
            
            <div class="relative bg-white rounded-xl shadow-xl max-w-md w-full mx-auto transform transition-all">
                <div class="flex items-center justify-center w-12 h-12 mx-auto mt-6 bg-red-100 rounded-full">
                    <svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.996-.833-2.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z">
                        </path>
                    </svg>
                </div>

                <!-- Content -->
                <div class="px-6 py-4 text-center">
                    <h3 class="text-lg font-semibold text-gray-900 mb-2">
                        Konfirmasi Hapus Lapangan
                    </h3>
                    <p class="text-sm text-gray-600 mb-1">
                        Apakah Anda yakin ingin menghapus lapangan
                    </p>
                    <p class="text-sm font-semibold text-gray-900 mb-4">
                        "{{ fieldName }}"?
                    </p>
                    <p class="text-xs text-red-600">
                        Tindakan ini tidak dapat dibatalkan.
                    </p>
                </div>

                <div class="flex gap-3 px-6 pb-6">
                    <button
                        @click="$emit('cancel')"
                        :disabled="isDeleting"
                        class="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        Batal
                    </button>
                    <button
                        @click="$emit('confirm')"
                        :disabled="isDeleting"
                        class="flex-1 px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
                    >
                        <svg v-if="isDeleting" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        {{ isDeleting ? 'Menghapus...' : 'Hapus' }}
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
interface Props {
    show: boolean
    fieldName: string
    isDeleting?: boolean
}

defineProps<Props>()

defineEmits<{
    confirm: []
    cancel: []
}>()
</script>