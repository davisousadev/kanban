<script setup lang="ts">
import { useKanban } from "@/composables/useKanban.ts";
import Button from "./UI/Button.vue";
const props = defineProps<{
  id: number;
  onClose: () => void;
}>();

const { getTasks } = useKanban();

async function deleteTask() {
  try {
    const response = await fetch(`http://localhost:3000/kanban/${props.id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Failed to delete task");
    }
  } catch (error) {
    console.error("Error deleting task:", error);
  } finally {
    await getTasks();
    props.onClose();
  }
}
</script>

<template>
  <div
    class="fixed inset-0 bg-neutral-900/70 backdrop-blur-sm flex items-center justify-center z-50"
  >
    <div class="bg-neutral-800 p-6 rounded-md">
      <h2 class="text-xl font-bold text-white mb-4">Delete Task</h2>
      <p class="text-neutral-400 mb-6">
        Are you sure you want to delete this task?
      </p>
      <div class="flex justify-end space-x-4">
        <Button theme="neutral" label="Cancel" @click="props.onClose" />
        <Button theme="danger" label="Delete" @click="deleteTask" />
      </div>
    </div>
  </div>
</template>
