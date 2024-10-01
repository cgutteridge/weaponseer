import type { Probability } from '@/models/Probability'

export default interface BattleReportModel {
  cumulativeWoundsTaken: number,
  woundsTaken: number,
  probability: Probability,
  cumulative: Probability
}

