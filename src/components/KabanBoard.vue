<script setup lang="ts">
import { computed, ref } from "vue";
// @ts-ignore: Unable to find declaration file for module '../types/task'
import { Task } from "../types/task";
import KanbanCard from "./KanbanCard.vue";

const tasks = ref<Task[]>(
  localStorage.getItem("tasks")
    ? JSON.parse(localStorage.getItem("tasks") as string)
    : [],
);

const todoTasks = computed(() =>
  tasks.value.filter((t: { status: string }) => t.status === "todo"),
);
const inProgressTasks = computed(() =>
  tasks.value.filter((t: { status: string }) => t.status === "in-progress"),
);
const doneTasks = computed(() =>
  tasks.value.filter((t: { status: string }) => t.status === "done"),
);

function onDrop(e: DragEvent, status: "todo" | "in-progress" | "done") {
  const taskId = e.dataTransfer!.getData("taskId");
  const task = tasks.value.find((t: { id: string }) => t.id === taskId);
  if (task) task.status = status;
}
</script>

<template>
  <section>
    <div class="grid grid-cols-3 gap-4 mt-4">
      <div
        class="border-2 h-fit border-dashed border-neutral-600 p-2 rounded-md"
        @dragover.prevent
        @drop="onDrop($event, 'todo')"
      >
        <h2 class="text-lg font-bold mb-2 text-neutral-300">TO DO</h2>
        <div class="space-y-4">
          <KanbanCard
            v-for="task in todoTasks"
            :key="task.id"
            :id="task.id"
            :title="task.title"
            :description="task.description"
            :profile="task.profile"
            :status="task.status"
          />
        </div>
      </div>
      <div
        class="border-2 h-fit border-dashed border-neutral-600 p-2 rounded-md"
        @dragover.prevent
        @drop="onDrop($event, 'in-progress')"
      >
        <h2 class="text-lg font-bold mb-2 text-neutral-300">IN PROGRESS</h2>
        <div class="space-y-4">
          <KanbanCard
            v-for="task in inProgressTasks"
            :key="task.id"
            :id="task.id"
            :title="task.title"
            :description="task.description"
            :profile="task.profile"
            :status="task.status"
          />
        </div>
      </div>
      <div
        class="border-2 h-fit border-dashed border-neutral-600 p-2 rounded-md"
        @dragover.prevent
        @drop="onDrop($event, 'done')"
      >
        <h2 class="text-lg font-bold mb-2 text-neutral-300">DONE</h2>
        <div class="space-y-4">
          <KanbanCard
            v-for="task in doneTasks"
            :key="task.id"
            :id="task.id"
            :title="task.title"
            :description="task.description"
            :profile="task.profile"
            :status="task.status"
          />
        </div>
      </div>
    </div>
  </section>
</template>
