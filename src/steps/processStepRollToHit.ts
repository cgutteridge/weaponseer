import type { Defender } from '@/models/Defender'
import type { Spread } from '@/models/Spread'
import nullifyCurrentAttack from '@/helpers/stepHelpers/nullifyCurrentAttack'
import getModifiedRollOutcomes from '@/helpers/getModifiedRollOutcomes'
import diceChancesToStepsSpread from '@/helpers/diceChancesToStepsSpread'

// step props: (targetRoll, optsList)
export default function processStepRollToHit (props: string[], steps: string[], defState: string[], defenders: Defender[]): Spread<string> {
  // later need to worry about sustained, lethal and rerolls
  // lethal would alter next step to be a auto
  // sustained 3 would need to rewrite the weapon to be 1 weapon + 3 nulls  or 4 weapons (sheesh)
  // crits might be lower than 6
  const targetRoll = parseInt(props.shift() ?? "7")

  return diceChancesToStepsSpread(
    getModifiedRollOutcomes(targetRoll, false, false, 7),
    {
      fail: nullifyCurrentAttack(steps),
      norm: [...steps],
      crit: [...steps]
    },
    defState)
}