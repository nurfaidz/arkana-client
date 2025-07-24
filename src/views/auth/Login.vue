<script setup lang="ts">
import AuthLayout from '../../components/auth/AuthLayout.vue';
import LoginForm from '../../components/auth/LoginForm.vue';
import { useRouter } from 'vue-router';
import { useToast } from '../../composables/useToast';
import api from '../../services/api';
import Cookies from 'js-cookie';

const router = useRouter();
const { success, error } = useToast();

const handleLogin = async (formData: any) => {
    try {
        const response = await api.post('/login', formData);

        // Set cookies
        Cookies.set('token', response.data.data.token);
        Cookies.set('user', JSON.stringify(response.data.data.user));

        success('Login berhasil! Selamat datang, ' + response.data.data.user.name);

        if (Cookies.get('token')) {
            setTimeout(() => {
                router.push({name: 'dashboard'});
            },1500)
        }
    } catch (err) {
        console.log('Login error:', err);

        let errorMessage = 'Terjadi kesalahan saat login';

        if (err.response?.status === 401) {
            errorMessage = 'Username atau password salah';
        } else if (err.response?.status === 422) {
            errorMessage = 'Data tidak valid';
        } else if (err.response?.status === 429) {
            errorMessage = 'Terlalu banyak permintaan, silakan coba lagi nanti';
        } else if (err.response?.data?.message) {
            errorMessage = err.response.data.message;
        } else if (!navigator.onLine) {
            errorMessage = 'Tidak ada koneksi internet';
        }

        // Show error toast
        error(errorMessage, 'Login Error');

        throw new Error(errorMessage);
    }
}
</script>

<template>
    <AuthLayout subtitle="Silakan masuk untuk melanjutkan">
        <LoginForm @submit="handleLogin" />
    </AuthLayout>
</template>