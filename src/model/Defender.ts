import type { DicePhrase } from '@/model/DicePhrase'
import type { WeaponOption } from '@/model/WeaponOption'

export interface Defender {
  name: string
  t: number
  ac: number
  invuln: number
  fnp: number
  w: number
  n: number // number in unit
}