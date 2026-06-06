<script lang="ts" setup>
import Button from './UI/Button.vue';
import Input from './UI/Input.vue';

</script>

<template>
  <form class="space-y-4 my-4">
    <Input id="email" label="Email Address" placeholder="you@example.com" />
    <Input id="password" label="Password" type="password" placeholder="Enter your password" />
    <Button theme="primary" type="submit" label="Sign In" class="w-full" />
  </form>
</template>