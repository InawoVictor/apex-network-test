<template>
    <div class="flex flex-col gap-y-4">
        <label :for="label" class=" font-bold text-sm2 leading-6 ">{{label}}</label>
        <Input :id="label" :value="modelValue" 
        :type="type"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)" 
        :placeholder="placeholder" 
        class="input-field" 
        v-bind="$attrs"
        />
    </div>
</template>

<script setup lang="ts">

interface Props {
    type: string
    modelValue: string | number | object
    placeholder?: string
    label?: string
}

const props = defineProps<Props>()

const emit = defineEmits(['update:modelValue'])
</script>