<script setup>
import AuthLayout from '../../components/auth/AuthLayout.vue';
import LoginForm from '../../components/auth/LoginForm.vue';

const handleLogin = async (formData) => {
    try {
        console.log('Login data:', formData);
        // Handle login logic here
    } catch (error) {
        console.error('Login error:', error);
    }
}

</script>

<template>
    <AuthLayout subtitle="Please log in to continue">
        <LoginForm @submit="handleLogin" />
    </AuthLayout>
</template>