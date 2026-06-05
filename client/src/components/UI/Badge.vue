<script setup lang="ts">
    defineProps<{
        profile: string;
    }>();

    function getProfileTask(profile: string): string {
        switch (profile) {
            case 'Backend':
                return 'bg-primary/30 text-primary ';
            case 'Devops':
                return 'bg-tertiary/30 text-tertiary';
            case 'security':
                return 'bg-neutral/30 text-neutral';
            default:
                return 'bg-gray-500';
        }
    }
</script>

<template>
  <span
    :class="getProfileTask(profile)"
    class="text-sm font-bold font-jetbrains px-1 rounded-xs"
  >
    {{ profile }}
  </span>
</template>
