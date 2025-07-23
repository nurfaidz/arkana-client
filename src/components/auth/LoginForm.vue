<script setup>
    import { ref, reactive } from 'vue'
    import BaseButton from '../ui/BaseButton.vue'
    import BaseInput from '../ui/BaseInput.vue'

    const emit = defineEmits(['submit'])

    const showPassword = ref(false)
    const loading = ref(false)

    const form = reactive({
        username: '',
        password: '',
        rememberMe: false
    })

    const errors = reactive({
        username: '',
        password: ''
    })

    const generalError = ref('')

    const validateForm = () => {
        errors.username = ''
        errors.password = ''
        generalError.value = ''

        let isValid = true

        if (!form.username) {
            errors.username = 'Username harus diisi'
            isValid = false
        }

        if (!form.password) {
            errors.password = 'Password harus diisi'
            isValid = false
        } else if (form.password.length < 6) {
            errors.password = 'Password minimal 6 karakter'
            isValid = false
        }

        return isValid
    }

    const handleSubmit = async () => {
        if (!validateForm()) {
            return
        }

        loading.value = true

        try {
            await emit('submit', { ...form })
        } catch (error) {
            generalError.value = error.message || 'Terjadi kesalahan saat login'
        } finally {
            loading.value = false
        }
    }
</script>

<template>
    <form @submit.prevent="handleSubmit" class="space-y-6">
        <div>
            <BaseInput v-model="form.username" type="text" label="Username" placeholder="Masukan Username" required
                :error="errors.username">
                <template #prefix>
                    <svg class="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd"
                            d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 2a6 6 0 110 12A6 6 0 0110 4z"
                            clip-rule="evenodd" />
                        <path d="M10 8a2 2 0 100-4 2 2 0 000 4z" />
                    </svg>
                </template>
            </BaseInput>
        </div>

        <div>
            <BaseInput v-model="form.password" :type="showPassword ? 'text' : 'password'" label="Password"
                placeholder="Masukan Kata Sandi" required :error="errors.password">
                <template #prefix>
                    <svg class="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd"
                            d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                            clip-rule="evenodd" />
                    </svg>
                </template>
                <template #suffix>
                    <button type="button" @click="showPassword = !showPassword"
                        class="text-gray-400 hover:text-gray-600 focus:outline-none">
                        <svg v-if="showPassword" class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd"
                                d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z"
                                clip-rule="evenodd" />
                            <path
                                d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                        </svg>
                        <svg v-else class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                            <path fill-rule="evenodd"
                                d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                                clip-rule="evenodd" />
                        </svg>
                    </button>
                </template>
            </BaseInput>
        </div>

        <div class="flex items-center justify-between">
            <div class="flex items-center">
                <input id="remember-me" v-model="form.rememberMe" type="checkbox"
                    class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                <label for="remember-me" class="ml-2 block text-sm text-gray-700">
                    Ingat saya
                </label>
            </div>
            <div class="text-sm">
                <router-link to="/auth/forgot-password" class="font-medium text-blue-600 hover:text-blue-500">
                    Lupa password?
                </router-link>
            </div>
        </div>

        <div v-if="generalError" class="bg-red-50 border border-red-200 rounded-md p-3">
            <p class="text-sm text-red-600">{{ generalError }}</p>
        </div>

        <BaseButton type="submit" variant="primary" size="lg" :loading="loading" full-width>
            {{ loading ? 'Masuk...' : 'Masuk' }}
        </BaseButton>

    </form>
</template>
