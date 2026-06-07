<script setup lang="ts">
import FormRegister from "@/components/FormRegister.vue";

</script>

<template>
  <section class="bg-gradient-primary-secondary w-full h-screen inline-block">
    <div class="my-10 max-w-100 mx-auto">
      <div class="bg-neutral-800 border border-neutral-700 p-4 max-w-full">
        <div class="p-4">
          <h1 class="text-2xl font-bold text-white text-center">
            Create an Account
          </h1>
          <p class="text-neutral-400 text-sm text-center mt-2">
            Please fill in the form to create an account
          </p>
          <FormRegister />
        </div>
      </div>
      <span
        class="text-sm text-neutral-400 mt-4 block font-jetbrains text-center"
        >You already have an account?
        <a href="/" class="text-primary-500">Login </a></span
      >
    </div>
  </section>
</template>
