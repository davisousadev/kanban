<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import type { Task } from "../types/task.ts";
import KanbanCard from "./KanbanCard.vue";

const tasks = ref<Task[]>([]);

async function getTasks(){
  try {
    const response = await fetch("http://localhost:3000/kanban");
    const data = await response.json();
    tasks.value = data;
    console.log("Fetched tasks:", data);
  } catch (error) {
    console.error("Error fetching tasks:", error);
  }
}

onMounted(() => {
  getTasks();
});

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
  const task = tasks.value.find((t) => t.id.toString() === taskId);
  if (task) task.status = status; 
}
</script>

<template>
  <section>
    <div class="grid grid-cols-3 gap-4 mt-4">
      <div @dragover.prevent @drop="onDrop($event, 'todo')">
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
      <div @dragover.prevent @drop="onDrop($event, 'in-progress')">
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
      <div @dragover.prevent @drop="onDrop($event, 'done')">
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
