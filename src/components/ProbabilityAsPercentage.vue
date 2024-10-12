<script setup lang="ts">
import { computed, type Ref } from 'vue'
import type { Probability } from '@/models/Probability'

const props = defineProps<{ probability: Probability }>()

const percentage: Ref<number> = computed<number>(() => 100 * props.probability)
</script>

<template>
  <template v-if="percentage < 0.01 && percentage > 0.00000001"> &lt;0.01% </template>
  <template v-else> {{ percentage.toFixed(1) }}% </template>
</template>

<style scoped></style>
