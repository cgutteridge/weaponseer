// all the returned scenarios should return
import type { Defender } from '@/model/Defender'
import type { Spread } from '@/model/Spread'
import processStepApplyDamage from '@/steps/processStepApplyDamage'
import processStepNull from '@/steps/processStepNull'
import processStepNumberOfAttacks from '@/steps/processStepNumberOfAttacks'
import processStepRollToHit from '@/steps/processStepRollToHit'
import processStepRollToWound from '@/steps/processStepRollToWound'

export default function processStep (stepType: string, props: string[], steps: string[], defState: string[], defenders: Defender[]): Spread<string> {
  if (stepType === 'A') {
    return processStepNumberOfAttacks(props, steps, defState, defenders)
  }
  if (stepType === 'H') {
    return processStepRollToHit(props, steps, defState, defenders)
  }
  if (stepType === 'S') {
    return processStepRollToWound(props, steps, defState, defenders)
  }
  if (stepType === 'D') {
    return processStepApplyDamage(props, steps, defState, defenders)
  }
  if (stepType === 'X' || stepType === '*') {
    return processStepNull(props, steps, defState, defenders)
  }
  throw new Error('BAD STEP TYPE: ' + stepType + ' ')
}