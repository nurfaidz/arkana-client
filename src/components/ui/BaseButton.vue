<template>
    <button :type="type" :disabled="disabled || loading" :class="buttonClasses" @click="$emit('click', $event)">
        <svg v-if="loading" class="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none"
            viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
            </path>
        </svg>
        <slot></slot>
    </button>
</template>

<script>
export default {
    name: 'BaseButton',
    emits: ['click'],
    props: {
        variant: {
            type: String,
            default: 'primary',
            validator: (value) => ['primary', 'secondary', 'danger', 'success', 'outline'].includes(value)
        },
        size: {
            type: String,
            default: 'md',
            validator: (value) => ['sm', 'md', 'lg'].includes(value)
        },
        type: {
            type: String,
            default: 'button'
        },
        disabled: {
            type: Boolean,
            default: false
        },
        loading: {
            type: Boolean,
            default: false
        },
        fullWidth: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        buttonClasses() {
            const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'
            const sizeClasses = {
                sm: 'px-3 py-1.5 text-sm',
                md: 'px-4 py-2 text-sm',
                lg: 'px-6 py-3 text-base',
            }
            const variantClasses = {
                primary: 'bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500',
                secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-800 focus:ring-gray-500',
                danger: 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500',
                success: 'bg-green-600 hover:bg-green-700 text-white focus:ring-green-500',
                outline: 'border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 focus:ring-blue-500'
            }
            const widthClass = this.fullWidth ? 'w-full' : ''
            
            return [
                baseClasses,
                sizeClasses[this.size],
                variantClasses[this.variant],
                widthClass
            ].join(' ') 
        }
    }
}
</script>