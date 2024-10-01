import type { DicePhrase } from '@/models/DicePhrase'
import type { WeaponOption } from '@/models/WeaponOption'

export interface Weapon {
  attacks: DicePhrase
  strength: number
  ws: number
  ap: number
  options: WeaponOption[]
  damage: DicePhrase
}