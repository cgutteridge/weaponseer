import type { Spread } from '@/model/Spread'
import addToSpread from '@/helpers/addToSpread'
import type { Defender } from '@/model/Defender'
import processStep from '@/steps/processStep'

export default function processSpreadStep (battleSpread: Spread<string>, defenders: Defender[]): Spread<string> {
  // run this step for each scenario add make it's results probability add up badger fuzzle
  const newBattleSpread: Spread<string> = []
  battleSpread.forEach(spreadItem => {
    const a = spreadItem[0].split(/>/)
    const steps = a[0].split(/\|/)
    const defState = a[1].split(/\|/)
    const nextStep = steps.shift() ?? 'ERROR'
    const props = nextStep.split(/[:,]/)
    const stepType = props.shift() ?? 'ERROR2'
    const stepResults = processStep(stepType, props, steps, defState, defenders)
    stepResults.map(stepResult => {
      const newP = stepResult[1].multiply(spreadItem[1])
      addToSpread(newBattleSpread, stepResult[0], newP)
    })
  })
  return newBattleSpread
}