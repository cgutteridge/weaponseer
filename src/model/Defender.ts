import type { DicePhrase } from '@/model/DicePhrase'
import type { WeaponOption } from '@/model/WeaponOption'

export interface Defender {
  t: number
  save: number
  invuln: number
  fnp: number
  w: number
  n: number
}