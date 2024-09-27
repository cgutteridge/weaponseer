<script setup lang="ts">

import { getStateStore } from '@/stores/state'
import type { Defender } from '@/model/Defender'
import Probability from '@/Probability'
import type { Spread } from '@/model/Spread'
import processSpreadStep from '@/processSpreadStep'

const stateStore = getStateStore()

const defenders: Defender[] = [
  { invuln: 0, n: 5, save: 3, w: 2, fnp: 0, t: 4 },
  { invuln: 0, n: 10, save: 3, w: 4, fnp: 0, t: 4 },
]

let battleSpread: Spread<string> = [
  ['A:20|H:4|S:3|D:1|*>5,0|1,0', new Probability(1, 1)]
]

console.log(battleSpread)
while (battleSpread[0][0][0] !== '>') {
  battleSpread = processSpreadStep(battleSpread,defenders)
  console.log(battleSpread)
}


</script>

<template>
  // state
  defendants facing attacks
<pre>{{battleSpread}}</pre>

</template>

<style scoped>
</style>