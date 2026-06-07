<script setup lang="ts">
defineProps<{
  label: string;
  theme?: "primary" | "secondary" | "tertiary" | "neutral" | "danger";
  loading?: boolean;
}>();

function getThemes(theme: string | undefined) {
  switch (theme) {
    case "primary":
      return "bg-primary text-secondary hover:bg-primary-hover";
    case "secondary":
      return "bg-secondary text-white hover:bg-secondary-hover";
    case "tertiary":
      return "bg-tertiary text-white  hover:bg-tertiary-hover";
    case "neutral":
      return "bg-neutral text-white hover:bg-neutral-hover";
    case "danger":
      return "bg-red-500 text-white hover:bg-red-500-hover";
    default:
      return "";
  }
}
</script>

<template>
  <button
    :class="getThemes(theme)"
    class="px-4 py-2 font-jetbrains font-bold transition-colors duration-200"
    v-bind="$attrs"
    :disabled="loading"
  >
    <span v-if="loading" class="loader">...</span>
    <span v-else>{{ label }}</span>
  </button>
</template>
