// props: ROLL NEEDED, opts
import type { Defender } from '@/model/Defender'
import type { Spread } from '@/model/Spread'
import Probability from '@/Probability'
import getModifiedDiceSpread from '@/helpers/getModifiedDiceSpread'
import renderCode from '@/helpers/renderCode'
import establishTarget from '@/helpers/establishTarget'
import processStepNull from '@/steps/processStepNull'

// prop[0] - is Strength of attack
// TODO rerolls, crits, devestating, -X to AP
// TODO "anti" which would mean knowing types of anti and target
// TODO the -1 if s higher than t rule
export default function processStepRollToWound (props: string[], steps: string[], defState: string[], defenders: Defender[]): Spread<string> {
  // later need to worry about sustained, lethal and rerolls
  // lethal would alter next step to be a auto
  // sustained 3 would need to rewrite the weapon to be 1 weapon + 3 nulls  or 4 weapons (sheesh)
  // crits might be lower than 6

  const target: Defender | undefined = establishTarget(defState, defenders)
  if (target === undefined) {
    return processStepNull(props, steps, defState, defenders)
  }

  // first work out the target roll
  const strength = parseInt(props.shift() ?? "99")
  const toughness = target.t
  let targetRoll = 6
  if (strength >= toughness / 2) { targetRoll = 5 }
  if (strength == toughness ) { targetRoll = 4 }
  if (strength > toughness ) { targetRoll = 3 }
  if (strength >= toughness*2 ) { targetRoll = 2 }

  const diceChances = getModifiedDiceSpread(targetRoll, false, false, 7)

  const stepsFail = [...steps]
  const stepsNormal = [...steps]
  // remove everything to the next * from the stepsFail as the sequence ends
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