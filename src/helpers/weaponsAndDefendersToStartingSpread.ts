import type { Defender } from '@/models/Defender'
import type { Weapon } from '@/models/Weapon'
import weaponToStep from '@/helpers/stepHelpers/weaponToStep'

export default function weaponsAndDefendersToStartingSpread (weapons: Weapon[], defenders: Defender[]) {
  // set no killed and no wounds for each unit
  const defendersPart = defenders.map(() => '0,0').join('|')
  const weaponsPart =weapons.map( weaponToStep ).join('|')+"|M:0"
  return weaponsPart + '>' + defendersPart
}