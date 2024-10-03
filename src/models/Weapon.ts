import type { WeaponOption } from '@/models/WeaponOption'

export interface Weapon {
  name: string
  attacks: string
  strength: number
  ws: number
  ap: number
  options: WeaponOption[]
  damage: string
}