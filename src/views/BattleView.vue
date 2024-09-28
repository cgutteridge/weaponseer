<script setup lang="ts">

import { getStateStore } from '@/stores/state'
import type { Defender } from '@/model/Defender'
import Probability from '@/Probability'
import type { Spread } from '@/model/Spread'
import processSpreadStep from '@/processSpreadStep'
import battleSpreadToBattleReport from '@/helpers/battleSpreadToBattleReport'
import BattleReport from '@/components/BattleReport.vue'
import { computed } from 'vue'
import DefenderList from '@/components/DefenderList.vue'
import never from '@/helpers/never'
import always from '@/helpers/always'
import validateDefenders from '@/helpers/validateDefenders'

const stateStore = getStateStore()

// TODO move to
const report = computed(() => {

  const defenders = stateStore.defenders
  if (!validateDefenders(defenders)) {
    return { units: [], noDamage: never() }
  }
  let battleSpread: Spread<string> = [
    ['A:20|H:4|S:3|D:1|*>0,0|0,0', always()]
  ]

  while (battleSpread[0][0][0] !== '>') {
    battleSpread = processSpreadStep(battleSpread, defenders)
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