import type { Defender } from '@/models/Defender'
import type { Spread } from '@/models/Spread'
import dicePhraseToProbability from '@/helpers/dicePhraseToProbability'
import renderCode from '@/helpers/renderCode'
import addToSpread from '@/helpers/spreadHelpers/addToSpread'

// step props: (countDicePhrase, optsList)
export default function processStepNumberOfAttacks (props: string[], steps: string[], defState: string[], defenders: Defender[]): Spread<string> {
  const attacksDicePhraseString = props.shift() ?? '1'

  const rollSpread = dicePhraseToProbability(attacksDicePhraseString)

  // find the highest number of attacks
  const maxAttacks: number = rollSpread.reduce(
    (acc, rollSpreadItem) => Math.max(acc, rollSpreadItem.item), 0)
  // pull off the rest of this weapon off the steps, and make a null weapon with the same number of steps

  const weapon: string[] = []
  const nullWeapon: string[] = []
  while (steps[0] !== '*') {
    const step = steps.shift() ?? 'ERROR3'
    weapon.push(step)
    // just zero the damage on a null weapon
    if (step.substring(0, 2) == 'D:') {
      nullWeapon.push('D:0')
    } else {
      nullWeapon.push(step)
    }
  }
  // don't forget the * (end of weapon sequence) step
  weapon.push(steps.shift() ?? 'ERROR3')
  nullWeapon.push('*')

  const newSpread: Spread<string> = []
  rollSpread.map(rollSpreadItem => {
    const newSteps: string[] = []
    for (let attackNumber = 1; attackNumber <= maxAttacks; attackNumber++) {
      if (attackNumber <= rollSpreadItem.item) {
        newSteps.push(...weapon)
      } else {
        newSteps.push(...nullWeapon)
      }
    }
    newSteps.push(...steps)
    addToSpread(newSpread, renderCode(newSteps, defState), rollSpreadItem.probability)
  })

  return newSpread
}