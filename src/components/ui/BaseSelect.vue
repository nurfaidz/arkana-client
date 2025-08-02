<template>
    <div class="space-y-1">
        <label v-if="label" :for="selectId" class="block text-sm font-medium text-gray-700">
            {{ label }}
            <span v-if="required" class="text-red-500">*</span>
        </label>

        <div class="relative">
            <div v-if="$slots.prefix" class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <slot name="prefix" />
            </div>

            <select 
                :id="selectId" 
                ref="select" 
                v-model="selectValue" 
                :disabled="disabled" 
                :required="required" 
                :class="selectClasses"
                @blur="$emit('blur', $event)" 
                @focus="$emit('focus', $event)" 
                @change="$emit('change', $event)"
            >
                <option v-if="placeholder" value="" disabled>
                    {{ placeholder }}
                </option>
                
                <template v-if="options.length">
                    <option 
                        v-for="option in options" 
                        :key="getOptionValue(option)" 
                        :value="getOptionValue(option)"
                        :disabled="getOptionDisabled(option)"
                    >
                        {{ getOptionLabel(option) }}
                    </option>
                </template>
                
                <slot v-else />
            </select>

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
    name: 'BaseSelect',
    emits: ['update:modelValue', 'blur', 'focus', 'change'],
    props: {
        modelValue: {
            type: [String, Number, Boolean],
            default: ''
        },
        label: {
            type: String,
            default: ''
        },
        placeholder: {
            type: String,
            default: ''
        },
        options: {
            type: Array,
            default: () => []
        },
        optionValue: {
            type: String,
            default: 'value'
        },
        optionLabel: {
            type: String,
            default: 'label'
        },
        optionDisabled: {
            type: String,
            default: 'disabled'
        },
        disabled: {
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
        selectId() {
            return `select-${Math.random().toString(36).substr(2, 9)}`
        },
        selectValue: {
            get() {
                return this.modelValue
            },
            set(value) {
                this.$emit('update:modelValue', value)
            }
        },
        selectClasses() {
            const baseClasses = 'block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 disabled:bg-gray-50 disabled:text-gray-500 appearance-none bg-white'

            const sizeClasses = {
                sm: 'px-3 py-1.5 text-sm',
                md: 'px-3 py-2 text-sm',
                lg: 'px-4 py-3 text-base'
            }

            const errorClasses = this.error ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''
            const prefixClasses = this.$slots.prefix ? 'pl-10' : ''
            const suffixClasses = this.$slots.suffix ? 'pr-10' : 'pr-8'

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
            this.$refs.select.focus()
        },
        getOptionValue(option) {
            if (typeof option === 'object' && option !== null) {
                return option[this.optionValue]
            }
            return option
        },
        getOptionLabel(option) {
            if (typeof option === 'object' && option !== null) {
                return option[this.optionLabel]
            }
            return option
        },
        getOptionDisabled(option) {
            if (typeof option === 'object' && option !== null) {
                return option[this.optionDisabled] || false
            }
            return false
        }
    }
}
</script>

<style scoped>
select {
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e");
    background-position: right 0.5rem center;
    background-repeat: no-repeat;
    background-size: 1.5em 1.5em;
}
</style>