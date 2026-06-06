<script setup lang="ts">
import Form from "@/components/Form.vue";
</script>

<template>
  <section class="bg-gradient-primary-secondary w-full h-screen inline-block">
    <div class="my-10 max-w-100 mx-auto">
      <div class="bg-neutral-800 border border-neutral-700 p-4 max-w-full">
        <div class="p-4">
          <h1 class="text-2xl font-bold text-white text-center">
            Welcome Back
          </h1>
          <p class="text-neutral-400 text-sm text-center mt-2">
            Please sign in to your account
          </p>
          <Form />
        </div>
      </div>
      <span
        class="text-sm text-neutral-400 mt-4 block font-jetbrains text-center"
        >Don't have an account?
        <a href="/register" class="text-primary-500">Sign up</a></span
      >
    </div>
  </section>
</template>
