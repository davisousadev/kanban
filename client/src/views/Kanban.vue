<script setup lang="ts">
import Header from "@/components/layout/Header.vue";
import Modal from "@/components/Modal.vue";
import KanbanBoard from "@/components/KanbanBoard.vue";
</script>

<template>
    <section class="bg-secondary w-full h-screen inline-block">
        <div class="container my-8 mx-auto">
            <Header />
            <KanbanBoard />
            <Modal />
        </div>
    </section>
</template>
