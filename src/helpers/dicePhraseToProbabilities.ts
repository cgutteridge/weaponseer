import type { Spread } from '@/models/Spread'
import type RollDescription from '@/models/RollDescription'
import dicePhraseToRollDescription from '@/helpers/dicePhraseToRollDescription'
import rollDescriptionToProbabilities from '@/helpers/rollDescriptionToProbabilities'

// assumes that it's all the same size dice. Not D3+D6
export default function dicePhraseToProbabilities(dicePhrase: string): Spread<number> {
  const rollDescription: RollDescription = dicePhraseToRollDescription(dicePhrase)
  return rollDescriptionToProbabilities(rollDescription)
}
