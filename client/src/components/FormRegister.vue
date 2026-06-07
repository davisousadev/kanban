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
    console.log("Submitting form with email:", email.value, "and password:", password.value);
    const response = await fetch("http://localhost:3000/register", {
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
      console.error("Registration failed:", errorData);
    }
  } catch (error) {
    console.error("Error registering user:", error);
  } finally {
    email.value = "";
    password.value = "";
  }
}
</script>

<template>
  <form class="space-y-4 my-4" @submit.prevent="handleSubmit()">
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
