import type { BattleReportUnit } from '@/models/BattleReportUnit'
import type { Probability } from '@/models/Probability'

export interface BattleReport {
  units : BattleReportUnit[]
  noDamage : Probability
}