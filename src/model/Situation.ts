import type { Defender } from '@/model/Defender'
import type { Spread } from '@/model/Spread'

export interface Situation {
  defenders: Defender[]
  scenarios: Spread<String>
}