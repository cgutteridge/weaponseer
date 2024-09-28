<script setup lang="ts">
import type Probability from '@/Probability'
import { computed, type Ref } from 'vue'

const props = defineProps<{ 'probability': Probability }>()

const percentage: Ref<number> = computed<number>(
  () => 100 * props.probability.n / props.probability.d
)
</script>

<template>
  <template v-if="percentage<0.01 && percentage > 0">
    &lt;0.01%
  </template>
  <template v-else>
    {{ percentage.toFixed(2) }}%
  </template>
</template>

<style scoped>

</style>