<script setup lang="ts">
import { computed, onMounted } from "vue";
import KanbanCard from "./KanbanCard.vue";
import {useKanban} from "@/composables/useKanban";

const { tasks, getTasks } = useKanban();

async function updateTaskStatus(taskId:number, status: "todo" | "in-progress" | "done"){
  try {
    const response = await fetch(`http://localhost:3000/kanban/${taskId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token") || ""}`,
      },
      body: JSON.stringify({ status }),
    })
    if (!response.ok) {
      throw new Error("Failed to update task status");
    }
    const updatedTask = await response.json();
    const index = tasks.value.findIndex((t) => t.id === taskId);
    if (index !== -1) {
      tasks.value[index] = updatedTask;
    }
  } catch (error) {
    console.error("Error updating task status:", error);
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
  updateTaskStatus(Number(taskId), status);
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
