import type { Defender } from '@/models/Defender'
import type { Spread } from '@/models/Spread'
import dicePhraseToProbability from '@/helpers/dicePhraseToProbability'
import renderCode from '@/helpers/renderCode'
import addToSpread from '@/helpers/spreadHelpers/addToSpread'

import setWoundsToApply from '@/helpers/stepHelpers/setWoundsToApply'

// step props: (countDicePhrase, optsList)
export default function processStepCalculateDamage (props: string[], steps: string[], defState: string[], defenders: Defender[]): Spread<string> {
  const attacksDicePhraseString = props.shift() ?? '1'

  const rollSpread = dicePhraseToProbability(attacksDicePhraseString)

  const newSpread: Spread<string> = []

  rollSpread.map(rollSpreadItem => {
    addToSpread(
      newSpread,
      renderCode(setWoundsToApply( steps, rollSpreadItem.item), defState),
      rollSpreadItem.probability)
  })

  return newSpread
}