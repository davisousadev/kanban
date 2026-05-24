<script setup lang="ts">
import { ref } from "vue";
// @ts-ignore: Unable to find declaration file for module '../../stores/modal'
import { useModalStore } from "../stores/modal";
import Button from "./UI/Button.vue";

const modalStore = useModalStore();

const title = ref("");
const description = ref("");
const profile = ref("");

const addTask = () => {
  const newTask = {
    id: crypto.randomUUID(),
    title: title.value,
    description: description.value,
    profile: profile.value,
    status: "todo",
  };
  const existingTasks = localStorage.getItem("tasks");
  const tasks = existingTasks ? JSON.parse(existingTasks) : [];
  tasks.push(newTask);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  modalStore.close();
};
</script>

<template>
  <div
    v-if="modalStore.isOpen"
    class="fixed inset-0 bg-neutral-900/70 backdrop-blur-sm flex items-center justify-center z-50"
  >
    <div class="bg-neutral-800 p-6 rounded-lg w-96">
      <h2 class="text-xl font-bold mb-4 text-white">Add New Task</h2>
      <form @submit.prevent="addTask">
        <div class="mb-4">
          <label class="block text-neutral-300 mb-2" for="title">Title</label>
          <input
            v-model="title"
            id="title"
            type="text"
            class="w-full p-2 rounded bg-neutral-700 text-white"
            required
          />
        </div>
        <div class="mb-4">
          <label class="block text-neutral-300 mb-2" for="description"
            >Description</label
          >
          <textarea
            v-model="description"
            id="description"
            class="w-full p-2 rounded bg-neutral-700 text-white"
            required
          ></textarea>
        </div>
        <div class="mb-4">
          <label class="block text-neutral-300 mb-2" for="profile"
            >Profile</label
          >
          <select
            v-model="profile"
            id="profile"
            class="w-full p-2 rounded bg-neutral-700 text-white"
            required
          >
            <option value="" disabled>Select profile</option>
            <option value="Backend">BACKEND</option>
            <option value="Devops">DEVOPS</option>
            <option value="Security">SECURITY</option>
          </select>
        </div>
        <div class="flex justify-end">
          <Button
            label="Cancel"
            theme="secondary"
            @click="modalStore.close()"
            class="mr-2"
          />
          <Button type="submit" label="Add Task" theme="primary" />
        </div>
      </form>
    </div>
  </div>
</template>
