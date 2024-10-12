import type { RollOutcome } from '@/models/RollOutcome'
import type { Probability } from '@/models/Probability'

export default function getModifiedRollOutcomes(
  target: number,
  reroll: boolean,
  reroll1: boolean,
  crit: number
): Record<RollOutcome, Probability> {
  const outcomes: Record<RollOutcome, Probability> = { fail: 0, norm: 0, crit: 0 }
  for (let d1 = 1; d1 <= 6; d1++) {
    if (d1 >= crit) {
      outcomes.crit += 1 / 6
    } else if (d1 >= target) {
      outcomes.norm += 1 / 6
    } else {
      if (reroll || (reroll1 && d1 == 1)) {
        for (let d2 = 1; d2 <= 6; d2++) {
          if (d2 >= crit) {
            outcomes.crit += 1 / 36
          } else if (d2 >= target) {
            outcomes.norm += 1 / 36
          } else {
            outcomes.fail += 1 / 36
          }
        }
      } else {
        outcomes.fail += 1 / 6
      }
    }
  }

  return outcomes
}
