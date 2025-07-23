<script setup>
import AuthLayout from '../../components/auth/AuthLayout.vue';
import LoginForm from '../../components/auth/LoginForm.vue';
import { useRouter } from 'vue-router';

const handleLogin = async (formData) => {

    router = useRouter();
    try {
        console.log('Login data:', formData);

        // Handle router to dashboard
        router()
    } catch (error) {
        console.error('Login error:', error);
    }
}

</script>

<template>
    <AuthLayout subtitle="Silakan masuk untuk melanjutkan">
        <LoginForm @submit="handleLogin" />
    </AuthLayout>
</template>