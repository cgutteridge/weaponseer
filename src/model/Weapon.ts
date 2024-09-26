import type { DicePhrase } from '@/model/DicePhrase'
import type { WeaponOption } from '@/model/WeaponOption'

export interface Weapon {
  attacks: DicePhrase
  strength: number
  ws: number
  ap: number
  options: WeaponOption[]
  damage: DicePhrase
}