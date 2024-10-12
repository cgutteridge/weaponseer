<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps<{ value: number }>()
const emit = defineEmits(['update:value'])

const targetValue = ref(props.value)

// Watch for changes in the prop and update inputValue accordingly
watch(
  () => props.value,
  (newValue) => {
    targetValue.value = newValue
  }
)

function valueChanged(event: Event) {
  const value: string = (event.target as HTMLInputElement)?.value ?? ''
  targetValue.value = parseInt(value)
  emit('update:value', targetValue.value) // Emit the valid value upwards
}
</script>

<template>
  <select :value="value" @input="valueChanged">
    <option value="1">1+</option>
    <option value="2">2+</option>
    <option value="3">3+</option>
    <option value="4">4+</option>
    <option value="5">5+</option>
    <option value="6">6+</option>
    <option value="7">7+</option>
  </select>
</template>

<style scoped></style>
