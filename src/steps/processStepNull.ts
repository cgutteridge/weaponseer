import type { Defender } from '@/model/Defender'
import type { Spread } from '@/model/Spread'
import Probability from '@/Probability'
import renderCode from '@/helpers/renderCode'
import always from '@/helpers/always'

export default function processStepNull (props: string[], steps: string[], defState: string[], defenders: Defender[]): Spread<string> {
  const spread: Spread<string> = []
  spread.push([renderCode(steps, defState), always()])
  return spread
}