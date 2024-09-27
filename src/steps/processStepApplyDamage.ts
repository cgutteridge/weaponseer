// Damage done (prop for mortals?)
// props: damage, mortals
import type { Defender } from '@/model/Defender'
import type { Spread } from '@/model/Spread'
import Probability from '@/Probability'
import allocateDamage from '@/helpers/allocateDamage'
import renderCode from '@/helpers/renderCode'

export default function processStepApplyDamage (props: string[], steps: string[], defState: string[], defenders: Defender[]): Spread<string> {
  const spread: Spread<string> = []

  allocateDamage(defState, defenders, parseInt(props[0]))

  // mortals
  if (props[1] !== undefined) {
    for (let i = 0; i < props[1].length; i++) {
      allocateDamage(defState, defenders, 1)
    }
  }

  spread.push([renderCode(steps, defState), new Probability(1, 1)])
  return spread
}