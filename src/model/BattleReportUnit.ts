import type { Defender } from '@/model/Defender'
import type { BattleReportModel } from '@/model/BattleReportModel'

export interface BattleReportUnit {
  defender : Defender
  models : BattleReportModel[]
}


