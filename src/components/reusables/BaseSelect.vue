<template>
    <div class="flex flex-col gap-y-4">
        <label :for="label" class=" font-bold text-sm2 leading-6 ">{{label}}</label>
        <v-select
            class="text-sm2"
            label="name"
            :id="label"
            :multiple="multiple"
            :value="modelValue"
            :options="options"
            v-bind="{
                ...$attrs,
                onInput: ($event) => {
                $emit('update:modelValue', ($event.target as HTMLInputElement).value);
                },
            }"
        >
        <template v-slot:option="option">
            <div class="  text-greenBg dropdown-item " v-if="option.name === 'Active'"
                @mouseenter="showHover = true"
                @mouseleave="showHover = false"
                :class="{'bg-[#F9FAFB] rounded-xl': showHover}"
            >
                <div class="dot bg-greenBg" />                      
                <span class="capitalize text-sm2">{{ option.name }}</span>
            </div>
            <div class=" text-orangeBg dropdown-item " v-if="option.name === 'Inactive'"
                @mouseenter="showHover2 = true"
                @mouseleave="showHover2 = false"
                :class="{'bg-[#F9FAFB] rounded-xl': showHover2}"
            >
                <div class="dot bg-orangeBg" />                      
                <span class="capitalize text-sm2">{{ option.name }}</span>
            </div>
            <div class=" text-purpleBg dropdown-item " v-if="option.name === 'Paid'"
                @mouseenter="showHover4 = true"
                @mouseleave="showHover4 = false"
                :class="{'bg-[#F9FAFB] rounded-xl': showHover4}"
            >
                <div class="dot bg-purpleBg" />                      
                <span class="capitalize text-sm2">{{ option.name }}</span>
            </div>
            <div class=" text-yellowBg dropdown-item " v-if="option.name === 'Unpaid'"
                @mouseenter="showHover5 = true"
                @mouseleave="showHover5 = false"
                :class="{'bg-[#F9FAFB] rounded-xl': showHover5}"
            >
                <div class="dot bg-yellowBg" />                      
                <span class="capitalize text-sm2">{{ option.name }}</span>
            </div>
            <div class=" text-redBg dropdown-item " v-if="option.name === 'Overdue'"
                @mouseenter="showHover6 = true"
                @mouseleave="showHover6 = false"
                :class="{'bg-[#F9FAFB] rounded-xl': showHover6}"
            >
                <div class="dot bg-redBg" />                      
                <span class="capitalize text-sm2">{{ option.name }}</span>
            </div>
            <div class="  dropdown-item text-primary " v-if="option.name === 'All'"
                @mouseenter="showHover3 = true"
                @mouseleave="showHover3 = false"
                :class="{'bg-[#F9FAFB] rounded-xl': showHover3}"
            >                    
                <span class="capitalize text-sm2">{{ option.name }}</span>
            </div>
        </template>
        </v-select>
    </div>
</template>

<script setup lang="ts">
import {ref} from "vue"

const emit = defineEmits(['changeType', 'update:modelValue'])
const props = defineProps({
    label: {
        type: String,
        default: '',
    },
    modelValue: {
        type: [String, Number, Array],
        required: true,
    },
    options: {
        type: Array,
        // required: true,
    },
    multiple: {
        type: Boolean,
        default: false,
    },
});
const showHover = ref(false)
const showHover2 = ref(false)
const showHover3 = ref(false)
const showHover4 = ref(false)
const showHover5 = ref(false)
const showHover6 = ref(false)

</script>

<style >
:deep() {
  /* --vs-controls-color: #664cc3;
  --vs-border-color: #664cc3; */

  --vs-dropdown-bg: #282c34;
  --vs-dropdown-color: #fff;
  --vs-dropdown-option-color: #cc99cd;

  /* --vs-selected-bg: #664cc3; */
  --vs-selected-color: #eeeeee;

  --vs-search-input-color: #eeeeee;

  --vs-dropdown-option--active-bg: #664cc3;
  --vs-dropdown-option--active-color: #eeeeee;
}

.vs__dropdown-toggle{
    @apply !bg-grayBg w-full shadow-none  focus:outline-none outline-none !border-none focus:border focus:border-solid !px-4 !py-5
      focus:border-[#E2E1E1] rounded-md placeholder:text-[#8D8D99] font-medium text-sm ;
}

.vs__dropdown-menu {
    /* background: green !important; */
}

.vs__dropdown-menu > li {
    @apply  bg-[#fff] gap-y-0;
}

.dropdown-item {
    @apply flex items-center gap-x-4 py-4 px-4
}

.dot {
    @apply w-[6px] h-[6px] rounded-full;
}

</style>