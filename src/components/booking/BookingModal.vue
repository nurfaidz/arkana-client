<template>
    <div v-if="show" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white rounded-xl shadow-2xl max-w-2xl w-full mx-4 max-h-screen overflow-y-auto">
            <div class="p-6">
                <div class="flex items-center justify-between mb-6">
                    <h3 class="text-xl font-semibold text-gray-900">
                        {{ isEdit ? 'Edit Booking' : 'Tambah Booking Baru' }}
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
                        <!-- Nama Pemesan -->
                        <div>
                            <BaseInput 
                                v-model="form.booking_name" 
                                label="Nama Pemesan"
                                placeholder="Masukkan nama pemesan" 
                                required 
                                :disabled="isSubmitting"
                                :error="errors.booking_name" 
                                @input="clearError('booking_name')" 
                            />
                        </div>

                        <!-- Nomor HP -->
                        <div>
                            <BaseInput 
                                v-model="form.phone" 
                                label="Nomor HP"
                                placeholder="Contoh: 08123456789" 
                                required 
                                :disabled="isSubmitting"
                                :error="errors.phone" 
                                @input="clearError('phone')" 
                            />
                        </div>

                        <!-- Lapangan -->
                        <div>
                            <BaseSelect 
                                v-model="form.field_id" 
                                label="Pilih Lapangan"
                                placeholder="Pilih lapangan" 
                                required
                                :disabled="isSubmitting"
                                :error="errors.field_id" 
                                @change="clearError('field_id')"
                            >
                                <option v-for="field in fields" :key="field.id" :value="field.id">
                                    {{ field.name }} - {{ field.type }} ({{ formatCurrency(field.hourly_rate) }}/jam)
                                </option>
                            </BaseSelect>
                        </div>

                        <!-- Status Booking -->
                        <div>
                            <BaseSelect 
                                v-model="form.booking_status" 
                                label="Status Pembayaran" 
                                placeholder="Pilih status" 
                                required
                                :disabled="isSubmitting" 
                                :error="errors.booking_status"
                                @change="clearError('booking_status')"
                            >
                                <option value="DOWNPAYMENT">DP Saja</option>
                                <option value="PAID">Lunas</option>
                            </BaseSelect>
                        </div>

                        <!-- Tanggal -->
                        <div>
                            <BaseInput 
                                v-model="form.date" 
                                label="Tanggal Booking"
                                type="date" 
                                required 
                                :disabled="isSubmitting"
                                :error="errors.date" 
                                @input="clearError('date')" 
                            />
                        </div>

                        <!-- Jam Mulai -->
                        <div>
                            <BaseInput 
                                v-model="form.start_at" 
                                label="Jam Mulai"
                                type="time" 
                                required 
                                :disabled="isSubmitting"
                                :error="errors.start_at" 
                                @input="clearError('start_at')" 
                            />
                        </div>

                        <!-- Jam Selesai -->
                        <div>
                            <BaseInput 
                                v-model="form.end_at" 
                                label="Jam Selesai"
                                type="time" 
                                required 
                                :disabled="isSubmitting"
                                :error="errors.end_at" 
                                @input="clearError('end_at')" 
                            />
                        </div>

                        <!-- Total Harga -->
                        <div>
                            <BaseInput 
                                v-model="form.total_price" 
                                label="Total Harga" 
                                type="number"
                                placeholder="Contoh: 150000" 
                                required 
                                min="10000" 
                                :disabled="isSubmitting"
                                :error="errors.total_price" 
                                hint="Minimal Rp 10.000"
                                @input="clearError('total_price')" 
                            />
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
    id: number | string
    name: string
    type: string
    hourly_rate: number
}

interface Booking {
    id?: number | string
    booking_name: string
    phone: string
    field_id: number | string
    date: string
    start_at: string
    end_at: string
    total_price: number | string
    booking_status: string
}

interface BookingErrors {
    booking_name: string
    phone: string
    field_id: string
    date: string
    start_at: string
    end_at: string
    total_price: string
    booking_status: string
}

const props = defineProps<{
    show: boolean
    booking?: Booking | null
    fields: Field[]
    isSubmitting?: boolean
}>()

const emit = defineEmits<{
    close: []
    submit: [booking: Booking]
}>()

const isEdit = computed(() => props.booking && props.booking.id)

// Form data
const form = reactive<Booking>({
    booking_name: '',
    phone: '',
    field_id: '',
    date: '',
    start_at: '',
    end_at: '',
    total_price: '',
    booking_status: 'DOWNPAYMENT'
})

// Form errors
const errors = reactive<BookingErrors>({
    booking_name: '',
    phone: '',
    field_id: '',
    date: '',
    start_at: '',
    end_at: '',
    total_price: '',
    booking_status: ''
})

// Define resetForm function before using it in watchers
function resetForm() {
    form.booking_name = ''
    form.phone = ''
    form.field_id = ''
    form.date = ''
    form.start_at = ''
    form.end_at = ''
    form.total_price = ''
    form.booking_status = 'DOWNPAYMENT'
    
    Object.keys(errors).forEach(key => {
        errors[key as keyof BookingErrors] = ''
    })
}

// Watch for booking changes (for edit mode)
watch(() => props.booking, (newBooking) => {
    if (newBooking) {
        form.booking_name = newBooking.booking_name || ''
        form.phone = newBooking.phone || ''
        form.field_id = newBooking.field_id || ''
        form.date = newBooking.date ? new Date(newBooking.date).toISOString().split('T')[0] : ''
        form.start_at = newBooking.start_at ? new Date(`2000-01-01T${newBooking.start_at}`).toTimeString().slice(0, 5) : ''
        form.end_at = newBooking.end_at ? new Date(`2000-01-01T${newBooking.end_at}`).toTimeString().slice(0, 5) : ''
        form.total_price = newBooking.total_price?.toString() || ''
        form.booking_status = newBooking.booking_status || 'DOWNPAYMENT'
    } else {
        resetForm()
    }
}, { immediate: true })

// Watch for show changes to reset form when modal opens
watch(() => props.show, (show) => {
    if (show && !props.booking) {
        resetForm()
    }
})

function validateForm(): boolean {
    let isValid = true
    
    // Reset errors
    Object.keys(errors).forEach(key => {
        errors[key as keyof BookingErrors] = ''
    })
    
    // Validate booking_name
    if (!form.booking_name.trim()) {
        errors.booking_name = 'Nama pemesan tidak boleh kosong'
        isValid = false
    } else if (form.booking_name.trim().length < 2) {
        errors.booking_name = 'Nama pemesan minimal 2 karakter'
        isValid = false
    }
    
    // Validate phone
    if (!form.phone.trim()) {
        errors.phone = 'Nomor HP tidak boleh kosong'
        isValid = false
    } else if (!/^[0-9+\-\s]+$/.test(form.phone.trim())) {
        errors.phone = 'Nomor HP tidak valid'
        isValid = false
    }
    
    // Validate field_id
    if (!form.field_id) {
        errors.field_id = 'Lapangan harus dipilih'
        isValid = false
    }
    
    // Validate date
    if (!form.date) {
        errors.date = 'Tanggal booking tidak boleh kosong'
        isValid = false
    } else {
        const selectedDate = new Date(form.date)
        const today = new Date()
        today.setHours(0, 0, 0, 0)
        
        if (selectedDate < today) {
            errors.date = 'Tanggal booking tidak boleh di masa lalu'
            isValid = false
        }
    }
    
    // Validate start_at
    if (!form.start_at) {
        errors.start_at = 'Jam mulai tidak boleh kosong'
        isValid = false
    }
    
    // Validate end_at
    if (!form.end_at) {
        errors.end_at = 'Jam selesai tidak boleh kosong'
        isValid = false
    } else if (form.start_at && form.end_at <= form.start_at) {
        errors.end_at = 'Jam selesai harus lebih besar dari jam mulai'
        isValid = false
    }
    
    // Validate total_price
    if (!form.total_price) {
        errors.total_price = 'Total harga tidak boleh kosong'
        isValid = false
    } else if (parseFloat(form.total_price.toString()) <= 0) {
        errors.total_price = 'Total harga harus lebih dari 0'
        isValid = false
    } else if (parseFloat(form.total_price.toString()) < 10000) {
        errors.total_price = 'Total harga minimal Rp 10.000'
        isValid = false
    }
    
    // Validate booking_status
    if (!form.booking_status) {
        errors.booking_status = 'Status pembayaran harus dipilih'
        isValid = false
    }
    
    return isValid
}

function clearError(fieldName: keyof BookingErrors) {
    errors[fieldName] = ''
}

function handleSubmit() {
    if (!validateForm()) {
        return
    }
    
    const submitData: Booking = {
        booking_name: form.booking_name.trim(),
        phone: form.phone.trim(),
        field_id: form.field_id,
        date: form.date,
        start_at: form.start_at,
        end_at: form.end_at,
        total_price: parseFloat(form.total_price.toString()),
        booking_status: form.booking_status
    }
    
    // Add ID for edit mode
    if (isEdit.value && props.booking?.id) {
        submitData.id = props.booking.id
    }
    
    emit('submit', submitData)
}

function handleCancel() {
    resetForm()
    emit('close')
}

function formatCurrency(amount: number) {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(amount)
}

// Expose method to set errors from parent (for API validation errors)
function setErrors(apiErrors: Partial<BookingErrors>) {
    Object.keys(apiErrors).forEach(key => {
        if (key in errors) {
            errors[key as keyof BookingErrors] = apiErrors[key as keyof BookingErrors] || ''
        }
    })
}

defineExpose({
    setErrors
})
</script>