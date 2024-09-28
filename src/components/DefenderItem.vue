<script setup lang="ts">
import { getStateStore } from '@/stores/state'
import { computed } from 'vue'
import type { Defender } from '@/model/Defender'

const stateStore = getStateStore()

const props = defineProps<{ defenderId: number }>()
const defender = computed<Defender>(
  () => stateStore.getDefender(props.defenderId)
)
</script>

<template>
  <div style="background-color:#ccc; padding: 0.2rem; margin-bottom: 0.2rem">
    <div>
      <input v-model="defender.name" />
      Count:<input v-model="defender.n" type="number" min="1" max="30"/>
      T:<input v-model="defender.t" type="number" min="1" max="30"/>
      AC:<input v-model="defender.ac" type="number" min="2" max="7"/>
      W:<input v-model="defender.w" type="number" min="1" max="200"/>
      Inv:<input v-model="defender.invuln" type="number" min="2" max="7"/>
      FNP:<input v-model="defender.fnp" type="number" min="2" max="7"/>
    </div>
  </div>

</template>

<style scoped>

</style>