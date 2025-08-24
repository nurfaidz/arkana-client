// composables/useFields.ts
import { ref, computed, watch } from 'vue'
import { useToast } from './useToast'
import fieldApi from '../services/field'

export interface Field {
    id: number | string
    name: string
    type: string
    hourly_rate: number
    status: string
}

export interface FieldFilters {
    name?: string
    type?: string
    status?: string
}

export const useFields = () => {
    const { success, error: showError } = useToast()
    
    // State
    const fields = ref<Field[]>([])
    const loading = ref(false)
    const isSubmitting = ref(false)

    // filter state
    const filters = ref<FieldFilters>({
        name: '',
        type: '',
        status: ''
    })
    
    // Computed
    const totalFields = computed(() => fields.value.length)
    const availableFields = computed(() => fields.value.filter(f => f.status === 'AVAILABLE').length)
    const maintenanceFields = computed(() => fields.value.filter(f => f.status === 'MAINTENANCE').length)

    // Methods
    const fetchFields = async (filterParams?: FieldFilters) => {
        loading.value = true
        try {
            const currentFilters = filterParams || filters.value
            const response = await fieldApi.getFields(currentFilters)
            console.log('Fields fetched:', response.data)
            fields.value = response.data
        } catch (err: any) {
            showError(err.response?.data?.message || 'Gagal memuat data lapangan')
            console.error('Error fetching fields:', err)
        } finally {
            loading.value = false
        }
    }

    watch(filters, (newFilters) => {
        fetchFields(newFilters)
    }, { deep: true})

    const updateFilters = (newFilters: Partial<FieldFilters>) => {
        filters.value = { ...filters.value, ...newFilters }
    }

    const clearFilters = () => {
        filters.value = {
            name: '',
            type: '',
            status: ''
        }
    }
    
    const createField = async (fieldData: Omit<Field, 'id'>) => {
        isSubmitting.value = true
        try {
            console.log('Creating field:', fieldData)
            const response = await fieldApi.createField(fieldData)
            
            if (response.data) {
                fields.value.push(response.data)
            } else {
                // Fallback: refresh all fields
                await fetchFields()
            }
            
            success('Lapangan berhasil ditambahkan!')
            return { success: true, data: response.data }
        } catch (error: any) {
            console.error('Error creating field:', error)
            return { success: false, error }
        } finally {
            isSubmitting.value = false
        }
    }
    
    const updateField = async (id: string | number, fieldData: Omit<Field, 'id'>) => {
        isSubmitting.value = true
        try {
            console.log('Updating field:', id, fieldData)
            const response = await fieldApi.updateField(id, fieldData)
            
            // Update field in local state
            const index = fields.value.findIndex(f => f.id === id)
            if (index !== -1) {
                fields.value[index] = { id, ...fieldData }
            } else {
                await fetchFields()
            }
            
            success('Lapangan berhasil diperbarui!')
            return { success: true, data: response.data }
        } catch (error: any) {
            console.error('Error updating field:', error)
            return { success: false, error }
        } finally {
            isSubmitting.value = false
        }
    }
    
    const deleteField = async (id: string | number) => {
        try {
            await fieldApi.deleteField(id)
            fields.value = fields.value.filter(f => f.id !== id)
            success('Lapangan berhasil dihapus!')
            return { success: true }
        } catch (error: any) {
            console.error('Error deleting field:', error)
            showError(error.response?.data?.message || 'Gagal menghapus lapangan')
            return { success: false, error }
        }
    }
    
    const toggleFieldStatus = async (field: Field) => {
        try {
            await fieldApi.updateFieldStatus(field.id)

            success('Status lapangan berhasil diubah!')
            return { success: true }
        } catch (error) {
            console.error('Error toggling field status:', error)
            showError(error.response?.data?.message || 'Gagal mengubah status lapangan')
            return { success: false, error }
        }
    }

    const handleApiErrors = (error: any) => {
        if (error.response?.data?.errors) {
            // Return field-specific errors for the modal component
            return error.response.data.errors
        } else {
            // Show general error message
            const errorMessage = error.response?.data?.message || 'Terjadi kesalahan pada server'
            showError(errorMessage)
            return null
        }
    }
    
    return {
        // State
        fields,
        loading,
        isSubmitting,
        filters,
        
        // Computed
        totalFields,
        availableFields,
        maintenanceFields,
        
        // Methods
        fetchFields,
        createField,
        updateField,
        deleteField,
        toggleFieldStatus,
        handleApiErrors,
        updateFilters,
        clearFilters
    }
}