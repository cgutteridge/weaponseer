import type { Defender } from '@/models/Defender'
import type { Spread } from '@/models/Spread'
import establishTarget from '@/helpers/establishTarget'
import processStepNull from '@/steps/processStepNull'
import getModifiedRollOutcomes from '@/helpers/getModifiedRollOutcomes'
import woundsToApplyFromCurrentWeapon from '@/helpers/stepHelpers/woundsToApplyFromCurrentWeapon'
import always from '@/helpers/always'
import addToSpread from '@/helpers/spreadHelpers/addToSpread'
import renderCode from '@/helpers/renderCode'
import setWoundsToApply from '@/helpers/stepHelpers/setWoundsToApply'

// step props: () -- no props
export default function processStepRollToFeelNoPain(
  props: string[],
  steps: string[],
  defState: string[],
  defenders: Defender[]
): Spread<string> {
  // not sure if we need a target, but can't hurt to work it out
  const target: Defender | undefined = establishTarget(defState, defenders)
  if (target === undefined) {
    return processStepNull(props, steps, defState, defenders)
  }

  const targetRoll = target.fnp
  if (targetRoll === 7) {
    return processStepNull(props, steps, defState, defenders)
  }

  // applies for each wound
  const woundsToApply = woundsToApplyFromCurrentWeapon(steps)
  if (woundsToApply === 0) {
    return processStepNull(props, steps, defState, defenders)
  }

  const fnpRoll = getModifiedRollOutcomes(targetRoll, false, false, 7)

  console.log(fnpRoll, woundsToApply, steps)

  let spread: Spread<number> = [{ item: 0, probability: always() }]
  for (let i = 0; i < woundsToApply; i++) {
    const newSpread: Spread<number> = []
    spread.forEach((spreadItem) => {
      addToSpread(newSpread, spreadItem.item + 1, spreadItem.probability * fnpRoll.fail)
      addToSpread(newSpread, spreadItem.item, spreadItem.probability * fnpRoll.norm)
    })
    spread = newSpread
  }

  // apply each of the possible FNP modified wound outputs to the steps
  const outputSpread: Spread<string> = []
  spread.forEach((spreadItem) => {
    addToSpread(
      outputSpread,
      renderCode(setWoundsToApply(steps, spreadItem.item), defState),
      spreadItem.probability
    )
  })

  return outputSpread
}
