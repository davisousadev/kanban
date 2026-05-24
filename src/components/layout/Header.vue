<script setup lang="ts">
    import Button from '../UI/Button.vue';
    // @ts-ignore: Unable to find declaration file for module '../../stores/modal'
    import { useModalStore } from "../../stores/modal";
    const modalStore = useModalStore();
</script>

<template>
    <header class="flex items-center justify-between w-full text-white p-4">
        <h1 class="text-3xl text-primary font-bold">DevFlow Board</h1>
        <Button label="Add Task" theme="primary" @click="modalStore.open()" />
    </header>
</template>