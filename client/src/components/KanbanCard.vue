<script setup lang="ts">
import Badge from "./UI/Badge.vue";
import type { Task } from "../types/task.ts";
import Button from "./UI/Button.vue";
import { ref } from "vue";
import ModalDelete from "./ModalDelete.vue";
const props = defineProps<Task>();

const modalDeleteOpen = ref(false);

function onDragStart(event: DragEvent) {
  event.dataTransfer?.setData("taskId", props.id.toString());
}
</script>

<template>
  <div
    :class="[
      'border-2 border-neutral-700 p-4 rounded-md bg-neutral-800 cursor-pointer',
      { 'border-primary-300': props.status == 'in-progress' },
    ]"
    draggable="true"
    @dragstart="onDragStart"
  >
    <Badge :profile="props.profile" />
    <h2
      :class="[
        'text-xl font-bold text-white',
        { 'line-through text-neutral-500!': props.status === 'done' },
      ]"
    >
      {{ props.title }}
    </h2>
    <p class="text-neutral-400">{{ props.description }}</p>
    <div v-if="props.status === 'in-progress'" class="flex justify-end my-2">
      <span class="font-jetbrains text-primary-200">ACTIVE</span>
    </div>
    <div class="flex justify-end mt-2">
      <Button theme="danger" label="Delete" @click="modalDeleteOpen = true" />
    </div>
  </div>
  <ModalDelete
    v-if="modalDeleteOpen"
    :id="props.id"
    :onClose="() => (modalDeleteOpen = false)"
  />
</template>
