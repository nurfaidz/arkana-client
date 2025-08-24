<template>
    <div>
        <!-- Page Header -->
        <div class="flex items-center justify-between mb-8">
            <div>
                <h2 class="text-3xl font-bold text-gray-900 mb-2">Management Lapangan</h2>
                <p class="text-gray-600">Kelola dan monitor semua lapangan olahraga</p>
            </div>
            <BaseButton variant="primary" @click="openAddModal">
                <svg class="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                </svg>
                Tambah Lapangan
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
                        <p class="text-sm font-medium text-gray-600">Total Lapangan</p>
                        <p class="text-2xl font-bold text-gray-900">{{ totalFields }}</p>
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
                        <p class="text-sm font-medium text-gray-600">Lapangan Tersedia</p>
                        <p class="text-2xl font-bold text-gray-900">{{ availableFields }}</p>
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
                        <p class="text-sm font-medium text-gray-600">Perlu Maintenance</p>
                        <p class="text-2xl font-bold text-gray-900">{{ maintenanceFields }}</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Filters -->
        <FieldFilters 
            :selectedType="filters.type"
            :selectedStatus="filters.status" 
            :searchQuery="filters.searchQuery"
            @update:selectedType="updateFilters({type: $event})"
            @update:selectedStatus="updateFilters({status: $event})"
            @update:searchQuery="updateFilters({name: $event})"
            @clear="clearFilters"
        />

        <!-- Fields Table -->
        <FieldTable 
            :fields="fields"
            :loading="loading"
            @edit="openEditModal"
            @delete="handleDelete"
            @toggle-status="handleToggleStatus"
        />

        <!-- Field Modal -->
        <FieldModal
            :show="showModal"
            :field="selectedField"
            :is-submitting="isSubmitting"
            @close="closeModal"
            @submit="handleSubmit"
            ref="fieldModalRef"
        />

        <!-- Delete Confirmation Modal -->
        <DeleteModal
            :show="showDeleteModal"
            :field-name="fieldToDelete?.name"
            :is-deleting="isDeleting"
            @confirm="confirmDelete"
            @cancel="cancelDelete"
        />
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useFields, type Field } from '../../composables/useField'
import BaseButton from '../../components/ui/BaseButton.vue'
import FieldModal from '../../components/field/FieldModal.vue'
import FieldFilters from '../../components/field/FieldFilter.vue'
import FieldTable from '../../components/field/FieldTable.vue'
import DeleteModal from '../ui/DeleteModal.vue'

// Composables
const {
    fields,
    loading,
    isSubmitting,
    filters,
    totalFields,
    availableFields,
    maintenanceFields,
    fetchFields,
    createField,
    updateField,
    deleteField,
    toggleFieldStatus,
    handleApiErrors,
    updateFilters,
    clearFilters
} = useFields()

// Filters
// const selectedType = ref('')
// const selectedStatus = ref('')
// const searchQuery = ref('')

// Modal state
const showModal = ref(false)
const selectedField = ref<Field | null>(null)
const fieldModalRef = ref()

// Delete confirmation state
const showDeleteModal = ref(false)
const fieldToDelete = ref<Field | null>(null)
const isDeleting = ref(false)

// Computed
// const filteredFields = computed(() => {
//     return fields.value.filter(field => {
//         const matchesType = selectedType.value === '' || field.type === selectedType.value
//         const matchesStatus = selectedStatus.value === '' || field.status === selectedStatus.value
//         const matchesSearch = field.name.toLowerCase().includes(searchQuery.value.toLowerCase())
//         return matchesType && matchesStatus && matchesSearch
//     })
// })

// Methods
const openAddModal = () => {
    selectedField.value = null
    showModal.value = true
}

const openEditModal = (field: Field) => {
    selectedField.value = { ...field }
    showModal.value = true
}

const closeModal = () => {
    showModal.value = false
    selectedField.value = null
}

const handleSubmit = async (fieldData: Field) => {
    let result
    
    if (selectedField.value?.id) {
        // Edit mode
        result = await updateField(selectedField.value.id, fieldData)
    } else {
        // Add mode
        result = await createField(fieldData)
    }
    
    if (result.success) {
        closeModal()
    } else {
        // Handle API validation errors
        const apiErrors = handleApiErrors(result.error)
        if (apiErrors && fieldModalRef.value) {
            fieldModalRef.value.setErrors(apiErrors)
        }
    }
}

const handleDelete = async (field: Field) => {
    fieldToDelete.value = field
    showDeleteModal.value = true
}

const confirmDelete = async () => {
    if (!fieldToDelete.value) return

    isDeleting.value = true
    await deleteField(fieldToDelete.value.id)
    isDeleting.value = false

    cancelDelete();
}

const cancelDelete = () => {
    showDeleteModal.value = false
    fieldToDelete.value = null
    isDeleting.value = false
}

const handleToggleStatus = async (field: Field) => {
    await toggleFieldStatus(field)
        
    const fieldIndex = fields.value.findIndex(f => f.id === field.id)
    if (fieldIndex !== -1) {
        fields.value[fieldIndex].status = field.status === 'AVAILABLE' ? 'MAINTENANCE' : 'AVAILABLE'
    }
}

// Lifecycle
onMounted(() => {
    fetchFields()
})
</script>