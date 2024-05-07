<template>
    <div>
        <ul class="flex pb-0 overflow-x-auto items-center bor-b w-[719px]">
            <li style="transition: all .4s ease-out;"
                :class="
                    title === selectedTitle ? 
                    ' selected-tab-header' :
                    ''
                "
                class="tab-header text-nowrap"
                v-for="title in tabTitles" :key="title"
                @click="selectTitle(title)"
            >
                {{ title }}
            </li>
        </ul>

    </div>
</template>

<script setup lang="ts">
import {ref} from 'vue'

const emit = defineEmits();
const {tabTitles} = defineProps({
    tabTitles: {
        type: Array,
        required: true,
    }
});

const selectedTitle = ref(tabTitles[0]);

const selectTitle = (title: string) => {
    selectedTitle.value = title
    emit('update:title', title)
}

</script>

<style scoped>
li{
    /* transition: aftear .4s ease-in; */
    position: relative;
}
.tab-header {
    @apply leading-6 text-[1.5rem] font-normal text-txtDark p-7 cursor-pointer transition-all ease-in-out duration-200;
}
.selected-tab-header{
    @apply text-greenBg font-semibold;
}
.selected-tab-header::after {
    content: "";
    height: 2px;
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
    @apply bg-greenBg; 
}
</style>