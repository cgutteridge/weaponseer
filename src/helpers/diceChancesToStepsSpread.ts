import type { RollOutcome } from '@/models/RollOutcome'
import type { Spread } from '@/models/Spread'
import renderCode from '@/helpers/renderCode'
import type { Probability } from '@/models/Probability'

export default function diceChancesToStepsSpread(
  diceChances: Record<RollOutcome, Probability>,
  outcomeToSteps: Record<RollOutcome, string[]>,
  defState: string[]
) {
  const spread: Spread<string> = []
  if (diceChances.fail > 0) {
    spread.push({ item: renderCode(outcomeToSteps.fail, defState), probability: diceChances.fail })
  }
  if (diceChances.norm > 0) {
    spread.push({ item: renderCode(outcomeToSteps.norm, defState), probability: diceChances.norm })
  }
  if (diceChances.crit > 0) {
    spread.push({ item: renderCode(outcomeToSteps.crit, defState), probability: diceChances.crit })
  }
  return spread
}
