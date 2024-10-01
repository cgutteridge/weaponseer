<script setup lang="ts">

import { getStateStore } from '@/stores/state'
import type { Spread } from '@/models/Spread'
import processSpreadStep from '@/helpers/processSpreadStep'
import battleSpreadToBattleReport from '@/helpers/battleSpreadToBattleReport'
import BattleReport from '@/components/BattleReport.vue'
import { computed } from 'vue'
import DefenderList from '@/components/DefenderList.vue'
import never from '@/helpers/never'
import always from '@/helpers/always'
import validateDefenders from '@/helpers/validateDefenders'

const stateStore = getStateStore()

// TODO move to file
const report = computed(() => {

  const defenders = stateStore.defenders
  if (!validateDefenders(defenders)) {
    return { units: [], noDamage: never() }
  }
  let battleSpread: Spread<string> = [
    { item: 'H:4|D:2|FNP|AD:0|*|M:0>0,0|0,0', probability: always() }
  ]

  while (battleSpread[0].item[0] !== '>') {
    battleSpread = processSpreadStep(battleSpread, defenders)
    console.log(battleSpread)
  }
  return battleSpreadToBattleReport(battleSpread, defenders)
})


</script>

<template>
  <defender-list></defender-list>
  <hr />
  <battle-report :report="report" />
</template>

<style scoped>
</style>