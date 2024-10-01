import type { Spread } from '@/models/Spread'
import addToSpread from '@/helpers/spreadHelpers/addToSpread'
import type { Defender } from '@/models/Defender'
import processStep from '@/steps/processStep'

export default function processSpreadStep (battleSpread: Spread<string>, defenders: Defender[]): Spread<string> {
  // run this step for each scenario and create new scenarios for the next step
  const newBattleSpread: Spread<string> = []
  battleSpread.forEach(spreadItem => {
    const a = spreadItem.item.split(/>/)
    const steps = a[0].split(/\|/)
    const defState = a[1].split(/\|/)
    const nextStep = steps.shift() ?? 'ERROR'
    const props = nextStep.split(/[:,]/)
    const stepType = props.shift() ?? 'ERROR2'
    const stepResults = processStep(stepType, props, steps, defState, defenders)
    stepResults.forEach(stepResult => {
      addToSpread(
        newBattleSpread,
        stepResult.item,
        stepResult.probability * spreadItem.probability)
    })
  })
  return newBattleSpread
}