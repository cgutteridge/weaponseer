import type { Spread } from '@/model/Spread'
import type { BattleReport } from '@/model/BattleReport'
import type { Defender } from '@/model/Defender'
import Probability from '@/Probability'
import type { BattleReportModel } from '@/model/BattleReportModel'
import parseDefState from '@/helpers/parseDefState'
import { assignDamageToModels } from '@/helpers/assignDamageToModels'
import never from '@/helpers/never'
import always from '@/helpers/always'

export default function battleSpreadToBattleReport (battleSpread: Spread<string>, defenders: Defender[]): BattleReport {
  const report: BattleReport = { units: [], noDamage: new Probability(1, 1) }
  defenders.forEach(defender => {
    const models: BattleReportModel[] = []
    for (let i = 0; i < defender.n; i++) {
      models[i] = []
      for (let j = 0; j < defender.w; j++) {
        models[i][j] = { woundsTaken: j+1, probability:never(), cumulative:never() } // no chance unless there is
      }
    }
    report.units.push({ defender, models })
  })
  battleSpread.forEach((outcome) => {
    const defState = parseDefState(outcome[0].substring(1))
    assignDamageToModels(outcome, defState, report, defenders)
  })
  let cumulative: Probability = always().subtract(report.noDamage)
  report.units.forEach(unit => {
    for (let model = 1; model <= unit.defender.n; model++) {
      for (let woundsTaken = 1; woundsTaken <= unit.defender.w; woundsTaken++) {
        if (unit.models[model] === null) {continue}
        const woundReport = unit.models[model-1][woundsTaken-1]
        woundReport.cumulative = cumulative
        cumulative = cumulative.subtract(woundReport.probability)
      }
    }
  })

  return report
}