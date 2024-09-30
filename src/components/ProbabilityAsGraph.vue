<script setup lang="ts">
import type Probability from '@/Probability'
import { computed } from 'vue'

const props = defineProps<{ probability: Probability, cumulative: Probability }>()

const percentage = computed(
  () => 100 * props.probability.n / props.probability.d
)
const colour = computed(() => {
    const cumulativePercentage = 100 * props.cumulative.n / props.cumulative.d
    if (cumulativePercentage < 10 || cumulativePercentage > 90) {return 'red'}
    if (cumulativePercentage < 30 || cumulativePercentage > 70) {return 'orange'}
    return 'green'
  }
)
</script>

<template>
  <div :style="`background-color:${colour}; width: ${percentage}%`">&nbsp;
  </div>
</template>

<style scoped>

</style>