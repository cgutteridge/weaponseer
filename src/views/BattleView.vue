<script setup lang="ts">

import { getStateStore } from '@/stores/state'
import type { Situation } from '@/model/Situation'
import type { Defender } from '@/model/Defender'
import Probability from '@/Probability'
import type { Spread } from '@/model/Spread'

const stateStore = getStateStore()

let situation: Situation = {
  defenders: [
    { invuln: 0, n: 10, save: 3, w: 2, fnp: 0, t: 4 }
  ],
  scenarios: [
    ['A:D3|WS:4|D:1|*>10,0', new Probability(1, 1)]
  ]
}

console.log(situation.scenarios)
for (let i = 0; i < 10; i++) {
  situation = processSituation(situation)
  console.log(situation.scenarios)
}

function processSituation (situation: Situation): Situation {
  // run this step for each scenario add make it's results probability add up badger fuzzle
  const newScenarios: Spread<string> = []
  situation.scenarios.forEach(spreadItem => {
    const a = spreadItem[0].split(/>/)
    const steps = a[0].split(/\|/)
    const defState = a[1].split(/\|/)
    const nextStep = steps.shift() ?? 'ERROR'
    const props = nextStep.split(/[:,]/)
    const stepType = props.shift() ?? 'ERROR2'
    const stepResults = processStep(stepType, props, steps, defState, situation.defenders)
    stepResults.map(stepResult => {
      const newP = stepResult[1].mult(spreadItem[1])
      addToSpread(newScenarios, stepResult[0], newP)
    })
  })
  return { defenders: situation.defenders, scenarios: newScenarios }
}

// all the returned scenarios should return
function processStep (stepType: string, props: string[], steps: string[], defState: string[], defenders: Defender[]): Spread<string> {
  if (stepType === 'A') {
    return processStepAttacks(props, steps, defState, defenders)
  }
  if (stepType === 'WS') {
    return processStepWS(props, steps, defState, defenders)
  }
  throw new Error('BAD STEP TYPE: ' + stepType + ' ')
}

// props: ROLL NEEDED, opts
function processStepWS (props: string[], steps: string[], defState: string[], defenders: Defender[]): Spread<string> {
  // later need to worry about sustained, lethal and rerolls
  // lethal would alter next step to be a auto
  // sustained 3 would need to rewrite the weapon to be 1 weapon + 3 nulls  or 4 weapons (sheesh)
  // crits might be lower than 6
  const diceChances = getModifiedDiceSpread(parseInt(props[0]), false, false, 7)
  const stepsFail = [...steps]
  const stepsNormal = [...steps]
  // remove everything to the next * from the stepsFail
  for (let i = 0; stepsFail[i] !== '*' && i < stepsFail.length; i++) {
    stepsFail[i] = 'X'
  }
  const spread: Spread<string> = []
  if (diceChances.fail > 0) {
    spread.push([renderCode(stepsFail, defState), new Probability(diceChances.fail, 36)])
  }
  if (diceChances.normal > 0) {
    spread.push([renderCode(stepsNormal, defState), new Probability(diceChances.normal, 36)])
  }
  return spread
}

function getModifiedDiceSpread (target: number, reroll: boolean, reroll1: boolean, crit: number) {
  const outcomes = { fail: 0, normal: 0, crit: 0 }
  for (let d1 = 1; d1 <= 6; d1++) {
    if (d1 >= crit) {
      outcomes.crit += 6
    } else if (d1 >= target) {
      outcomes.normal += 6
    } else {
      if (reroll || (reroll1 && d1 == 1)) {
        for (let d2 = 1; d2 <= 6; d2++) {
          if (d2 >= crit) {
            outcomes.crit += 1
          } else if (d2 >= target) {
            outcomes.normal += 1
          } else {
            outcomes.fail += 1
          }
        }
      } else {
        outcomes.fail += 6
      }
    }
  }
  return outcomes
}

function processStepAttacks (props: string[], steps: string[], defState: string[], defenders: Defender[]): Spread<string> {
  const rollSpread = dicePhraseToProbability(props[0])
  const maxAttacks: number = rollSpread.reduce((acc, rollSpreadItem) => Math.max(acc, rollSpreadItem[0]), 0)
  // pull off the rest of this weapon
  const weapon: string[] = []
  const nullWeapon: string[] = []
  while (steps[0] !== '*') {
    weapon.push(steps.shift() ?? 'ERROR3')
    nullWeapon.push('X')
  }
  // don't forget the * (resolve damage) step
  weapon.push(steps.shift() ?? 'ERROR3')
  nullWeapon.push('*')

  const newSpread: Spread<string> = []
  rollSpread.map(rollSpreadItem => {
    const newSteps: string[] = []
    for (let attackNumber = 1; attackNumber <= maxAttacks; attackNumber++) {
      if (attackNumber <= rollSpreadItem[0]) {
        newSteps.push(...weapon)
      } else {
        newSteps.push(...nullWeapon)
      }
    }
    newSteps.push(...steps)
    const code = renderCode(newSteps, defState)

    newSpread.push([code, rollSpreadItem[1]])
  })

  return newSpread
}

function renderCode (steps: string[], defState: string[]) {
  return steps.join('|') + '>' + defState.join('|')
}

function dicePhraseToProbability (dicePhrase: string): Spread<number> {
  const diceRegex = /^(\d+)?[dD](\d+)([+-]\d+)?|(\d+)$/

  const bits: RegExpMatchArray | null = dicePhrase.match(diceRegex)
  if (bits === null) {
    throw new Error('Bad dice phrase ' + dicePhrase)
  }
  let n = 0
  if (bits[3] !== undefined) {
    n = parseInt(bits[3])
  }
  if (bits[4] !== undefined) {
    n = parseInt(bits[4])
  }
  let count = 0
  let d = 0
  if (bits[2] !== undefined) {
    d = parseInt(bits[2])
    count = bits[1] === undefined ? 1 : parseInt(bits[1])
  }

  let spread: Spread<number> = [[n, new Probability(1, 1)]]
  while (count > 0) {
    const newSpread: Spread<number> = []
    for (let i = 1; i <= d; i++) {
      spread.forEach(spreadItem => {
        const newV = spreadItem[0] + i
        const newP = spreadItem[1].mult(new Probability(1, d))
        addToSpread(newSpread, newV, newP)
      })
    }
    spread = newSpread
    count--
  }

  return spread
}

// modifies the spread to add this situation
function addToSpread<T> (spread: Spread<T>, newV: T, newP: Probability) {
  const index = spread.findIndex(spreadItem => spreadItem[0] === newV)
  if (index === -1) {
    spread.push([newV, newP])
  } else {
    spread[index][1] = spread[index][1].add(newP)
  }
}

</script>

<template>
  <pre>{{ stateStore.attacker }}</pre>
  // state
  defendants facing attacks


</template>

<style scoped>
</style>