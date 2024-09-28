import Probability from '@/Probability'
import type { BattleReport } from '@/model/BattleReport'
import type { Defender } from '@/model/Defender'
import type DefenderState from '@/model/DefenderState'

// nb this assumes damage is applied sequentially and not using precision attacks
export function assignDamageToModels (outcome: [string, Probability], defState: DefenderState[], report: BattleReport, defenders: Defender[]) {
  // find the unit before the first unit at full strength
  const firstFullIndex = defState.findIndex(
    defStateItem => defStateItem.killed == 0 && defStateItem.woundsTaken == 0
  )
  // calculate total wounds done
  let totalWounds = 0
  defState.forEach((defStateItem, defIndex) => {
    totalWounds += defStateItem.killed * defenders[defIndex].w + defStateItem.woundsTaken
  })
  if (totalWounds === 0) {
    // if all units are at full strength then no damage happened
    report.noDamage = outcome[1]
    return
  }

  let unitIndex = 0
  let model = 1
  let wounds = 0
  for (let i = 0; i < totalWounds; i++) {
    wounds++
    if (wounds > defenders[unitIndex].w) {
      wounds = 1
      model++
      if (model > defenders[unitIndex].n) {
        unitIndex++
        model = 1
      }
    }
  }
  report.units[unitIndex].models[model - 1][wounds - 1].probability = outcome[1]
}