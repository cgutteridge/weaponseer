import type { Weapon } from '@/models/Weapon'

export default function weaponToStep(weapon: Weapon) {
  console.log(weapon)
  // set no killed and no wounds for each unit

  const steps: string[] = []
  steps.push('A:' + weapon.attacks)
  steps.push('H:' + weapon.ws)
  steps.push('S:' + weapon.strength)
  steps.push('SAVE:' + weapon.ap)
  steps.push('D:' + weapon.damage)
  steps.push('FNP')
  steps.push('AD:0')
  steps.push('*')
  return steps.join('|')
}
