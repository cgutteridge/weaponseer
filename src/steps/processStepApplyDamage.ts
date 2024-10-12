// Damage done (prop for mortals?)
// props: damage, mortals
import type { Defender } from '@/models/Defender'
import type { Spread } from '@/models/Spread'
import allocateDamage from '@/helpers/allocateDamage'
import renderCode from '@/helpers/renderCode'
import always from '@/helpers/always'

// step props: (damage)
export default function processStepApplyDamage(
  props: string[],
  steps: string[],
  defState: string[],
  defenders: Defender[]
): Spread<string> {
  const damage = parseInt(props[0] ?? '0')

  allocateDamage(defState, defenders, damage)

  return [
    {
      item: renderCode(steps, defState),
      probability: always()
    }
  ]
}
