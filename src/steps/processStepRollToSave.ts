// props: ROLL NEEDED, opts
import type { Defender } from '@/models/Defender'
import type { Spread } from '@/models/Spread'
import establishTarget from '@/helpers/establishTarget'
import processStepNull from '@/steps/processStepNull'
import nullifyCurrentAttack from '@/helpers/stepHelpers/nullifyCurrentAttack'
import getModifiedRollOutcomes from '@/helpers/getModifiedRollOutcomes'
import diceChancesToStepsSpread from '@/helpers/diceChancesToStepsSpread'

// step props: (acMod, optsList)
// TODO rerolls, crits, devestating,
export default function processStepRollToSave(
  props: string[],
  steps: string[],
  defState: string[],
  defenders: Defender[]
): Spread<string> {
  const target: Defender | undefined = establishTarget(defState, defenders)
  if (target === undefined) {
    return processStepNull(props, steps, defState, defenders)
  }
  const acMod = parseInt(props.shift() ?? '0')
  let targetRoll = target.ac - acMod
  if (target.invuln < targetRoll) {
    targetRoll = target.invuln
  }

  return diceChancesToStepsSpread(
    getModifiedRollOutcomes(targetRoll, false, false, 7),
    // nb. a success here ends the attack sequence
    {
      fail: [...steps],
      norm: nullifyCurrentAttack(steps),
      crit: [...steps] // there is no critical
    },
    defState
  )
}
