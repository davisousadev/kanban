<script lang="ts" setup>
import { useRouter } from "vue-router";
import Button from "./UI/Button.vue";
import Input from "./UI/Input.vue";
import { ref } from "vue";

const email = ref("");
const password = ref(""); 

const router = useRouter();

async function handleSubmit() {
  try {
    const response = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email.value,
        password: password.value,
      }),
    });
    if(response.ok){
      router.push("/kanban");
    }else{
      const errorData = await response.json();
      console.error("Login failed:", errorData);
    }
  } catch (error) {
    console.error("Error registering user:", error);
  }
}
</script>

<template>
  <form class="space-y-4 my-4" @submit.prevent="handleSubmit">
    <Input
      v-model="email"
      id="email"
      label="Email Address"
      placeholder="you@example.com"
    />
    <Input
      v-model="password"
      id="password"
      label="Password"
      type="password"
      placeholder="Enter your password"
    />
    <Button
      theme="primary"
      type="submit"
      label="Sign In"
      class="w-full"
    />
  </form>
</template>
