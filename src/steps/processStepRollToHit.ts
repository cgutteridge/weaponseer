// props: ROLL NEEDED, opts
import type { Defender } from '@/model/Defender'
import type { Spread } from '@/model/Spread'
import Probability from '@/Probability'
import getModifiedDiceSpread from '@/helpers/getModifiedDiceSpread'
import renderCode from '@/helpers/renderCode'

export default function processStepRollToHit (props: string[], steps: string[], defState: string[], defenders: Defender[]): Spread<string> {
  // later need to worry about sustained, lethal and rerolls
  // lethal would alter next step to be a auto
  // sustained 3 would need to rewrite the weapon to be 1 weapon + 3 nulls  or 4 weapons (sheesh)
  // crits might be lower than 6
  const diceChances = getModifiedDiceSpread(parseInt(props[0]), false, false, 7)
  const stepsFail = [...steps]
  const stepsNormal = [...steps]
  // remove everything to the next * from the stepsFail
  for (let i = 0; stepsFail[i] !== '*' && i < stepsFail.length; i++) {
    stepsFail[i] = 'X'
  }
  const spread: Spread<string> = []
  if (diceChances.fail > 0) {
    spread.push([renderCode(stepsFail, defState), new Probability(diceChances.fail, 36)])
  }
  if (diceChances.normal > 0) {
    spread.push([renderCode(stepsNormal, defState), new Probability(diceChances.normal, 36)])
  }
  return spread
}