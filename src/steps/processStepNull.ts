import type { Defender } from '@/models/Defender'
import type { Spread } from '@/models/Spread'
import renderCode from '@/helpers/renderCode'
import always from '@/helpers/always'

export default function processStepNull (props: string[], steps: string[], defState: string[], defenders: Defender[]): Spread<string> {
  return [{
    item: renderCode(steps, defState),
    probability: always()
  }]
}