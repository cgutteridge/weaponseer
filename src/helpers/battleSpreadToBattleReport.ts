import type { Spread } from '@/models/Spread'
import type { BattleReport } from '@/models/BattleReport'
import type { Defender } from '@/models/Defender'
import parseDefState from '@/helpers/parseDefState'
import { assignDamageToModels } from '@/helpers/assignDamageToModels'
import never from '@/helpers/never'
import always from '@/helpers/always'
import type { Probability } from '@/models/Probability'
import type BattleReportModel from '@/models/BattleReportModel'

export default function battleSpreadToBattleReport (battleSpread: Spread<string>, defenders: Defender[]): BattleReport {
  const report: BattleReport = { units: [], noDamage: always() }
  let cumulativeWoundsTaken=1
  defenders.forEach(defender => {
    const models: BattleReportModel[][] = []
    for (let i = 0; i < defender.n; i++) {
      models[i] = []
      for (let j = 0; j < defender.w; j++) {
        models[i][j] = { cumulativeWoundsTaken, woundsTaken: j + 1, probability: never(), cumulative: never() } // no chance unless there is
        cumulativeWoundsTaken++
      }
    }
    report.units.push({ defender, models })
  })

  battleSpread.forEach((outcome) => {
    const defState = parseDefState(outcome.item.substring(1))
    assignDamageToModels(outcome, defState, report, defenders)
  })

  // work out cumulative probability
  let cumulative: Probability = always() - report.noDamage
  report.units.forEach(unit => {
    for (let model = 1; model <= unit.defender.n; model++) {
      for (let woundsTaken = 1; woundsTaken <= unit.defender.w; woundsTaken++) {
        if (unit.models[model] === null) {continue}
        const woundReport = unit.models[model - 1][woundsTaken - 1]
        woundReport.cumulative = cumulative
        cumulative = cumulative - woundReport.probability
      }
    }
  })

  return report
}