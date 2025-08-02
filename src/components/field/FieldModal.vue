<template>
    <div v-if="show" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white rounded-xl shadow-2xl max-w-2xl w-full mx-4 max-h-screen overflow-y-auto">
            <div class="p-6">
                <div class="flex items-center justify-between mb-6">
                    <h3 class="text-xl font-semibold text-gray-900">
                        {{ isEdit ? 'Edit Lapangan' : 'Tambah Lapangan Baru' }}
                    </h3>
                    <button @click="handleCancel" class="text-gray-500 hover:text-gray-700">
                        <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>

                <form @submit.prevent="handleSubmit">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <BaseInput 
                                v-model="form.name" 
                                label="Nama Lapangan"
                                placeholder="Contoh: Lapangan Futsal A" 
                                required 
                                :disabled="isSubmitting"
                                :error="errors.name" 
                                @input="clearError('name')" 
                            />
                        </div>
                        <div>
                            <BaseSelect 
                                v-model="form.type" 
                                label="Jenis Lapangan"
                                placeholder="Pilih jenis lapangan" 
                                required
                                :disabled="isSubmitting"
                                :error="errors.type" 
                                @change="clearError('type')"
                            >
                                <option value="FUTSAL">Futsal</option>
                                <option value="BASKET">Basket</option>
                                <option value="BADMINTON">Badminton</option>
                                <option value="TENNIS">Tennis</option>
                                <option value="MINI_SOCCER">Mini Soccer</option>
                            </BaseSelect>
                        </div>

                        <div>
                            <BaseInput 
                                v-model="form.hourly_rate" 
                                label="Harga / Jam" 
                                type="number"
                                placeholder="Contoh: 75000" 
                                required 
                                min="10000" 
                                :disabled="isSubmitting"
                                :error="errors.hourly_rate" 
                                hint="Minimal Rp 10.000"
                                @input="clearError('hourly_rate')" 
                            />
                        </div>
                        <div>
                            <BaseSelect 
                                v-model="form.status" 
                                label="Status" 
                                placeholder="Pilih status" 
                                required
                                :disabled="isSubmitting" 
                                :error="errors.status"
                                @change="clearError('status')"
                            >
                                <option value="AVAILABLE">Tersedia</option>
                                <option value="MAINTENANCE">Maintenance</option>
                            </BaseSelect>
                        </div>
                    </div>

                    <div class="mt-6 flex justify-end space-x-2">
                        <BaseButton 
                            variant="outline" 
                            type="button"
                            @click="handleCancel"
                            :disabled="isSubmitting"
                        >
                            Batal
                        </BaseButton>
                        <BaseButton 
                            type="submit" 
                            variant="primary"
                            :disabled="isSubmitting"
                        >
                            <span v-if="isSubmitting">{{ isEdit ? 'Memperbarui...' : 'Menyimpan...' }}</span>
                            <span v-else>{{ isEdit ? 'Perbarui' : 'Simpan' }}</span>
                        </BaseButton>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive, watch, computed } from 'vue'
import BaseButton from '../ui/BaseButton.vue'
import BaseInput from '../ui/BaseInput.vue'
import BaseSelect from '../ui/BaseSelect.vue'

interface Field {
    id?: number | string
    name: string
    type: string
    hourly_rate: number | string
    status: string
}

interface FieldErrors {
    name: string
    type: string
    hourly_rate: string
    status: string
}

const props = defineProps<{
    show: boolean
    field?: Field | null
    isSubmitting?: boolean
}>()

const emit = defineEmits<{
    close: []
    submit: [field: Field]
}>()

const isEdit = computed(() => props.field && props.field.id)

// Form data
const form = reactive<Field>({
    name: '',
    type: '',
    hourly_rate: '',
    status: 'AVAILABLE'
})

// Form errors
const errors = reactive<FieldErrors>({
    name: '',
    type: '',
    hourly_rate: '',
    status: ''
})

// Define resetForm function before using it in watchers
function resetForm() {
    form.name = ''
    form.type = ''
    form.hourly_rate = ''
    form.status = 'AVAILABLE'
    
    errors.name = ''
    errors.type = ''
    errors.hourly_rate = ''
    errors.status = ''
}

// Watch for field changes (for edit mode)
watch(() => props.field, (newField) => {
    if (newField) {
        form.name = newField.name
        form.type = newField.type
        form.hourly_rate = newField.hourly_rate.toString()
        form.status = newField.status
    } else {
        resetForm()
    }
}, { immediate: true })

// Watch for show changes to reset form when modal opens
watch(() => props.show, (show) => {
    if (show && !props.field) {
        resetForm()
    }
})

function validateForm(): boolean {
    let isValid = true
    
    // Reset errors
    errors.name = ''
    errors.type = ''
    errors.hourly_rate = ''
    errors.status = ''
    
    // Validate name
    if (!form.name.trim()) {
        errors.name = 'Nama lapangan tidak boleh kosong'
        isValid = false
    } else if (form.name.trim().length < 3) {
        errors.name = 'Nama lapangan minimal 3 karakter'
        isValid = false
    }
    
    // Validate type
    if (!form.type) {
        errors.type = 'Jenis lapangan harus dipilih'
        isValid = false
    }
    
    // Validate hourly rate
    if (!form.hourly_rate) {
        errors.hourly_rate = 'Harga per jam tidak boleh kosong'
        isValid = false
    } else if (parseFloat(form.hourly_rate.toString()) <= 0) {
        errors.hourly_rate = 'Harga per jam harus lebih dari 0'
        isValid = false
    } else if (parseFloat(form.hourly_rate.toString()) < 10000) {
        errors.hourly_rate = 'Harga per jam minimal Rp 10.000'
        isValid = false
    }
    
    // Validate status
    if (!form.status) {
        errors.status = 'Status lapangan harus dipilih'
        isValid = false
    }
    
    return isValid
}

function clearError(fieldName: keyof FieldErrors) {
    errors[fieldName] = ''
}

function handleSubmit() {
    if (!validateForm()) {
        return
    }
    
    const submitData: Field = {
        name: form.name.trim(),
        type: form.type,
        hourly_rate: parseFloat(form.hourly_rate.toString()),
        status: form.status
    }
    
    // Add ID for edit mode
    if (isEdit.value && props.field?.id) {
        submitData.id = props.field.id
    }
    
    emit('submit', submitData)
}

function handleCancel() {
    resetForm()
    emit('close')
}

// Expose method to set errors from parent (for API validation errors)
function setErrors(apiErrors: Partial<FieldErrors>) {
    Object.keys(apiErrors).forEach(key => {
        if (key in errors) {
            errors[key as keyof FieldErrors] = apiErrors[key as keyof FieldErrors] || ''
        }
    })
}

defineExpose({
    setErrors
})
</script>