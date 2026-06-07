import type { Task } from "@/types/task";
import { ref } from "vue";

const tasks = ref<Task[]>([]);

export function useKanban() {
  async function getTasks() {
    try {
      const response = await fetch("http://localhost:3000/kanban", {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("token") || ""}`,
          },
      });
      const data = await response.json();
      tasks.value = data;
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  }

  return {
    tasks,
    getTasks,
  };
}
