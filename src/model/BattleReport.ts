import type { BattleReportUnit } from '@/model/BattleReportUnit'
import type Probability from '@/Probability'

export interface BattleReport {
  units : BattleReportUnit[]
  noDamage : Probability
}