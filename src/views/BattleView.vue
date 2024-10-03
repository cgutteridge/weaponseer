<script setup lang="ts">

import { getStateStore } from '@/stores/state'
import BattleReport from '@/components/BattleReport.vue'
import { computed } from 'vue'
import DefenderList from '@/components/DefenderList.vue'
import resolveBattleSpread from '@/helpers/spreadHelpers/resolveBattleSpread'
import WeaponList from '@/components/WeaponList.vue'

const stateStore = getStateStore()

// TODO move to file
const report = computed(() => {
  const defenders = stateStore.defenders
  const startingSpread = stateStore.startingSpread
  return resolveBattleSpread(defenders,startingSpread)
})


</script>

<template>
  <defender-list></defender-list>
  <weapon-list></weapon-list>
  <hr />
  <battle-report :report="report" />
  <hr />
  <div style="border: solid 1px red; padding:1em">{{ stateStore.spreadErrors}}</div>
  <pre>Starting state: {{ stateStore.startingSpread }}
  </pre>
</template>

<style scoped>
</style>