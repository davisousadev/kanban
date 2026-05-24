<script setup lang="ts">
import Badge from "./UI/Badge.vue";
interface Task {
  id: string;
  title: string;
  description: string;
  profile: string;
  status: "todo" | "in-progress" | "done";
}
const props = defineProps<Task>();

function onDragStart(event: DragEvent) {
  event.dataTransfer?.setData("taskId", props.id || "");
}
</script>

<template>
  <div
    class="border-2 border-neutral-700 p-4 rounded-md bg-neutral-800 cursor-pointer"
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
  </div>
</template>
