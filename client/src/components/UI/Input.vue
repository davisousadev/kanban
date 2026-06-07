<script setup lang="ts">
const props = defineProps<{
  id: string;
  label?: string;
  type?: string;
  modelValue?: string;
}>();

const emit = defineEmits(['update:modelValue']);
</script>

<template>
  <div>
    <label
      class="block text-base font-medium text-neutral-400 font-jetbrains mb-1"
      :for="props.id"
      v-if="props.label"
      >{{ props.label }}</label
    >
    <input
      :id="props.id"
      class="bg-neutral-900 border border-neutral-700 p-2 text-neutral-400 rounded w-full placeholder:text-neutral-700"
      :type="props.type || 'text'"
      :value="props.modelValue"
      @input="(e: InputEvent) => emit('update:modelValue', (e.target as HTMLInputElement).value)"
      v-bind="$attrs"
    />
  </div>
</template>
