import type { WeaponOption } from '@/models/WeaponOption'

export interface Weapon {
  id?: number
  name: string
  attacks: string
  strength: number
  ws: number
  ap: number
  options: WeaponOption[]
  damage: string
}