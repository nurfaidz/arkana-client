<template>
    <div class="space-y-1">
        <label v-if="label" :for="inputId" class="block text-sm font-medium text-gray-700">
            {{ label }}
            <span v-if="required" class="text-red-500">*</span>
        </label>

        <div class="relative">
            <div v-if="$slots.prefix" class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <slot name="prefix" />
            </div>

            <input :id="inputId" ref="input" v-model="inputValue" :type="type" :placeholder="placeholder"
                :disabled="disabled" :readonly="readonly" :required="required" :class="inputClasses"
                @blur="$emit('blur', $event)" @focus="$emit('focus', $event)" @keydown="$emit('keydown', $event)" />

            <div v-if="$slots.suffix" class="absolute inset-y-0 right-0 pr-3 flex items-center">
                <slot name="suffix" />
            </div>
        </div>

        <p v-if="error" class="text-sm text-red-600">
            {{ error }}
        </p>

        <p v-if="hint && !error" class="text-sm text-gray-500">
            {{ hint }}
        </p>
    </div>
</template>

<script>
export default {
    name: 'BaseInput',
    emits: ['update:modelValue', 'blur', 'focus', 'keydown'],
    props: {
        modelValue: {
            type: [String, Number],
            default: ''
        },
        label: {
            type: String,
            default: ''
        },
        type: {
            type: String,
            default: 'text'
        },
        placeholder: {
            type: String,
            default: ''
        },
        disabled: {
            type: Boolean,
            default: false
        },
        readonly: {
            type: Boolean,
            default: false
        },
        required: {
            type: Boolean,
            default: false
        },
        error: {
            type: String,
            default: ''
        },
        hint: {
            type: String,
            default: ''
        },
        size: {
            type: String,
            default: 'md',
            validator: (value) => ['sm', 'md', 'lg'].includes(value)
        }
    },
    computed: {
        inputId() {
            return `input-${Math.random().toString(36).substr(2, 9)}`
        },
        inputValue: {
            get() {
                return this.modelValue
            },
            set(value) {
                this.$emit('update:modelValue', value)
            }
        },
        inputClasses() {
            const baseClasses = 'block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 disabled:bg-gray-50 disabled:text-gray-500'

            const sizeClasses = {
                sm: 'px-3 py-1.5 text-sm',
                md: 'px-3 py-2 text-sm',
                lg: 'px-4 py-3 text-base'
            }

            const errorClasses = this.error ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''
            const prefixClasses = this.$slots.prefix ? 'pl-10' : ''
            const suffixClasses = this.$slots.suffix ? 'pr-10' : ''

            return [
                baseClasses,
                sizeClasses[this.size],
                errorClasses,
                prefixClasses,
                suffixClasses
            ].join(' ')
        }
    },
    methods: {
        focus() {
            this.$refs.input.focus()
        }
    }
}
</script>