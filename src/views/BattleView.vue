<script setup lang="ts">

import { getStateStore } from '@/stores/state'
import type { Defender } from '@/model/Defender'
import Probability from '@/Probability'
import type { Spread } from '@/model/Spread'
import processSpreadStep from '@/processSpreadStep'
import battleSpreadToBattleReport from '@/helpers/battleSpreadToBattleReport'
import BattleReport from '@/components/BattleReport.vue'

const stateStore = getStateStore()

const defenders: Defender[] = [
  { invuln: 0, n: 5, save: 3, w: 2, fnp: 0, t: 4, name:"Marines" },
  { invuln: 0, n: 1, save: 3, w: 4, fnp: 0, t: 4, name:"Marine character"},
]

let battleSpread: Spread<string> = [
  ['A:20|H:4|S:3|D:2|*>0,0|0,0', new Probability(1, 1)]
]

//console.log(battleSpread)
while (battleSpread[0][0][0] !== '>') {
  battleSpread = processSpreadStep(battleSpread,defenders)
  //console.log(battleSpread)
}
const report = battleSpreadToBattleReport(battleSpread,defenders)


</script>

<template>
  // state
  <battle-report :report="report" />
</template>

<style scoped>
</style>