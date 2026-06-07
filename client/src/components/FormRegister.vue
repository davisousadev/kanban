<script lang="ts" setup>
import { useRouter } from "vue-router";
import Button from "./UI/Button.vue";
import Input from "./UI/Input.vue";
import { ref } from "vue";
import { useToast } from "vue-toastification";

const toast = useToast();

const email = ref("");
const password = ref("");
const name = ref("");
const loading = ref(false);

const router = useRouter();

async function handleSubmit() {
  loading.value = true;
  if (!email.value.trim() || !password.value.trim() || !name.value.trim()) {
    toast.error("Please fill in all fields");
    loading.value = false;
    return;
  }

  if(password.value.length < 6){
    toast.error("Password must be at least 6 characters long");
    loading.value = false;
    return;
  }
  try {
    const response = await fetch("http://localhost:3000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email.value,
        password: password.value,
        name: name.value,
      }),
    });
    const {token} = await response.json();
    localStorage.setItem("token", token);
    if(response.ok){
      router.push("/kanban");
    }else{
      toast.error("Registration failed. Please try again.");
    }
  } catch (error) {
    toast.error("An error occurred while trying to register.");
    console.error("Error registering user:", error);
  } finally {
    email.value = "";
    password.value = "";
    loading.value = false;
  }
}
</script>

<template>
  <form class="space-y-4 my-4" @submit.prevent="handleSubmit()">
    <Input
      v-model="name"
      id="name"
      label="Name"
      placeholder="Your name"
      required
    />
    <Input
      v-model="email"
      id="email"
      label="Email Address"
      placeholder="you@example.com"
      required
    />
    <Input
      v-model="password"
      id="password"
      label="Password"
      type="password"
      placeholder="Enter your password"
      required
    />
    <Button
      theme="primary"
      type="submit"
      label="Create Account"
      class="w-full"
    />
  </form>
</template>
