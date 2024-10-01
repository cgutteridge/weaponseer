import type { Defender } from '@/models/Defender'
import type BattleReportModel from '@/models/BattleReportModel'

export default interface BattleReportUnit {
  defender : Defender
  models : BattleReportModel[][]
}


