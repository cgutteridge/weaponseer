// Damage done (prop for mortals?)
// props: damage, mortals
import type { Defender } from '@/model/Defender'
import type { Spread } from '@/model/Spread'
import Probability from '@/Probability'
import allocateDamage from '@/helpers/allocateDamage'
import renderCode from '@/helpers/renderCode'
import always from '@/helpers/always'

// step props: (damage, mortals)
export default function processStepApplyDamage (props: string[], steps: string[], defState: string[], defenders: Defender[]): Spread<string> {
  const damage = parseInt(props[0] ?? '0')
  const mortals = parseInt(props[1] ?? '0')

  allocateDamage(defState, defenders, damage)

  // mortals
  if (props[1] !== undefined) {
    for (let i = 0; i < mortals; i++) {
      allocateDamage(defState, defenders, 1)
    }
  }

  return [{
    item: renderCode(steps, defState),
    probability: always()
  }]
}