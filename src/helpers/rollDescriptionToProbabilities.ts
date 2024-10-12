import type RollDescription from '@/models/RollDescription'
import type { Spread } from '@/models/Spread'
import always from '@/helpers/always'
import addToSpread from '@/helpers/spreadHelpers/addToSpread'

export default function rollDescriptionToProbabilities(rollDescription: RollDescription) {
  let spread: Spread<number> = [{ item: rollDescription.n, probability: always() }]

  for (let i = 0; i < rollDescription.d3; i++) {
    const newSpread: Spread<number> = []
    for (let j = 1; j <= 3; j++) {
      spread.forEach((spreadItem) => {
        addToSpread(newSpread, spreadItem.item + j, spreadItem.probability * (1 / 3))
      })
    }
    spread = newSpread
  }

  for (let i = 0; i < rollDescription.d6; i++) {
    const newSpread: Spread<number> = []
    for (let j = 1; j <= 6; j++) {
      spread.forEach((spreadItem) => {
        addToSpread(newSpread, spreadItem.item + j, spreadItem.probability * (1 / 6))
      })
    }
    spread = newSpread
  }

  return spread
}
