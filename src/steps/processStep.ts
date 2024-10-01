// all the returned scenarios should return
import type { Defender } from '@/models/Defender'
import type { Spread } from '@/models/Spread'
import processStepApplyDamage from '@/steps/processStepApplyDamage'
import processStepNull from '@/steps/processStepNull'
import processStepNumberOfAttacks from '@/steps/processStepNumberOfAttacks'
import processStepRollToHit from '@/steps/processStepRollToHit'
import processStepRollToWound from '@/steps/processStepRollToWound'
import processStepRollToSave from '@/steps/processStepRollToSave'
import processStepCalculateDamage from '@/steps/processStepCalculateDamage'
import processStepApplyMortalWounds from '@/steps/processStepApplyMortalWounds'
import processStepRollToFeelNoPain from '@/steps/processStepRollToFeelNoPain'

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
  if (stepType === 'SAVE') {
    return processStepRollToSave(props, steps, defState, defenders)
  }
  if (stepType === 'D') {
    return processStepCalculateDamage(props, steps, defState, defenders)
  }
  if (stepType === 'AD') {
    return processStepApplyDamage(props, steps, defState, defenders)
  }
  if (stepType === 'FNP') {
    return processStepRollToFeelNoPain(props, steps, defState, defenders)
  }
  if (stepType === 'X' || stepType === '*') {
    return processStepNull(props, steps, defState, defenders)
  }
  if (stepType === 'M' ) {
    return processStepApplyMortalWounds(props, steps, defState, defenders)
  }
  throw new Error('BAD STEP TYPE: ' + stepType + ' ')
}