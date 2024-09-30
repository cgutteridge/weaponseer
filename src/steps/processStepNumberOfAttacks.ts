import type { Defender } from '@/model/Defender'
import type { Spread } from '@/model/Spread'
import dicePhraseToProbability from '@/helpers/dicePhraseToProbability'
import renderCode from '@/helpers/renderCode'

// step props: (countDicePhrase, optsList)
export default function processStepNumberOfAttacks (props: string[], steps: string[], defState: string[], defenders: Defender[]): Spread<string> {
  const rollSpread = dicePhraseToProbability(props[0])
  const maxAttacks: number = rollSpread.reduce((acc, rollSpreadItem) => Math.max(acc, rollSpreadItem[0]), 0)
  // pull off the rest of this weapon off the steps, and make a null weapon with the same number of steps

  const weapon: string[] = []
  const nullWeapon: string[] = []
  while (steps[0] !== '*') {
    weapon.push(steps.shift() ?? 'ERROR3')
    nullWeapon.push('X')
  }
  // don't forget the * (resolve damage) step
  weapon.push(steps.shift() ?? 'ERROR3')
  nullWeapon.push('*')

  const newSpread: Spread<string> = []
  rollSpread.map(rollSpreadItem => {
    const newSteps: string[] = []
    for (let attackNumber = 1; attackNumber <= maxAttacks; attackNumber++) {
      if (attackNumber <= rollSpreadItem[0]) {
        newSteps.push(...weapon)
      } else {
        newSteps.push(...nullWeapon)
      }
    }
    newSteps.push(...steps)
    const code = renderCode(newSteps, defState)

    newSpread.push([code, rollSpreadItem[1]])
  })

  return newSpread
}