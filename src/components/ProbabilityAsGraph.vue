<script setup lang="ts">
import { computed } from 'vue'
import type { Probability } from '@/models/Probability'

const props = defineProps<{ probability: Probability, cumulative: Probability }>()

const percentage = computed(
  () => 100 * props.probability
)
const colour = computed(() => {
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