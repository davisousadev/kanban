<script setup lang="ts">
    defineProps<{
        label: string;
        theme?: 'primary' | 'secondary' | 'tertiary' | 'neutral';
    }>();

    function getThemes(theme: string | undefined) {
        switch (theme) {
            case 'primary':
                return 'bg-primary text-secondary';
            case 'secondary':
                return 'bg-secondary text-white';
            case 'tertiary':
                return 'bg-tertiary text-white';
            case 'neutral':
                return 'bg-neutral text-white';
            default:
                return '';
        }
    }
</script>

<template>
    <button :class="getThemes(theme)" class="px-4 py-2 font-jetbrains font-bold ">
        {{ label }}
    </button>
</template>