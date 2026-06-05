<script setup lang="ts">
import Header from "./components/layout/Header.vue";
import Modal from "./components/Modal.vue";
import KanbanBoard from "./components/KabanBoard.vue";
</script>

<template>
  <div class="container mx-auto p-5">
    <Header />
    <main>
      <KanbanBoard />
      <Modal />
    </main>
  </div>
</template>
