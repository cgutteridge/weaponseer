// props: ROLL NEEDED, opts
import type { Defender } from '@/model/Defender'
import type { Spread } from '@/model/Spread'
import getModifiedRollOutcomes from '@/helpers/getModifiedRollOutcomes'
import establishTarget from '@/helpers/establishTarget'
import processStepNull from '@/steps/processStepNull'
import nullifyCurrentAttack from '@/steps/nullifyCurrentAttack'
import strengthAndToughnessToTargetRoll from '@/steps/strengthAndToughnessToTargetRoll'
import diceChancesToStepsSpread from '@/steps/diceChancesToStepsSpread'

// step props: (strength, optsList)
// TODO the -1 if s higher than t rule
export default function processStepRollToWound (props: string[], steps: string[], defState: string[], defenders: Defender[]): Spread<string> {
  // later need to worry about sustained, lethal and rerolls
  // lethal would alter next step to be an auto hit
  // sustained 3 would need to rewrite the weapon to be 1 weapon + 3 nulls  or 4 weapons (sheesh)
  // crits might be lower than 6
  const strength = parseInt(props.shift() ?? '99')

  const target: Defender | undefined = establishTarget(defState, defenders)
  if (target === undefined) {
    return processStepNull(props, steps, defState, defenders)
  }

  // first work out the target roll
  const toughness = target.t
  const targetRoll = strengthAndToughnessToTargetRoll(strength, toughness)

  return diceChancesToStepsSpread(
    getModifiedRollOutcomes(targetRoll, false, false, 7),
    {
      fail: nullifyCurrentAttack(steps),
      normal: [...steps],
      crit: [...steps]
    },
    defState)
}