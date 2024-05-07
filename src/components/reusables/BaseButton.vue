<template>
    <div>
        <button class="bg-greenBg py-[.8rem] px-[2rem] rounded-xl w-full text-white text-sm2 font-bold">
            {{title}}
        </button>
    </div>
</template>

<script lang="ts" setup>
interface Props {
    title: string;
};

defineProps<Props>()
</script>
