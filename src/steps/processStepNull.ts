import type { Defender } from '@/model/Defender'
import type { Spread } from '@/model/Spread'
import renderCode from '@/helpers/renderCode'
import always from '@/helpers/always'

export default function processStepNull (props: string[], steps: string[], defState: string[], defenders: Defender[]): Spread<string> {
  return [{
    item: renderCode(steps, defState),
    probability: always()
  }]
}