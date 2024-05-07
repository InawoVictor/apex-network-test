<template>
    <div v-show="dialog.loading" class=" flex justify-center items-center w-full h-screen fixed top-0 left-0" 
        style="background: rgba(0,0,0, .345)"
    >
        <img src="/img/loader.gif" class="w-[150px] h-[150px]" alt="">
    </div>
</template>

<script setup >
import {useDialogStore} from "../stores/dialog"

const dialog = useDialogStore();

</script>