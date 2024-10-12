// Damage done (prop for mortals?)
// props: damage, mortals
import type { Defender } from '@/models/Defender'
import type { Spread } from '@/models/Spread'
import allocateDamage from '@/helpers/allocateDamage'
import renderCode from '@/helpers/renderCode'
import always from '@/helpers/always'

// step props: (damage, mortals)
export default function processStepApplyMortalWounds(
  props: string[],
  steps: string[],
  defState: string[],
  defenders: Defender[]
): Spread<string> {
  const mortals = parseInt(props[0] ?? '0')

  for (let i = 0; i < mortals; i++) {
    allocateDamage(defState, defenders, 1)
  }

  return [
    {
      item: renderCode(steps, defState),
      probability: always()
    }
  ]
}
