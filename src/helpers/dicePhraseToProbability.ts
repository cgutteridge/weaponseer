import type { Spread } from '@/models/Spread'
import addToSpread from '@/helpers/spreadHelpers/addToSpread'
import always from '@/helpers/always'

// assumes that it's all the same size dice. Not D3+D6
export default function dicePhraseToProbability (dicePhrase: string): Spread<number> {
  const diceRegex = /^(\d+)?[dD](\d+)([+-]\d+)?|(\d+)$/

  const bits: RegExpMatchArray | null = dicePhrase.match(diceRegex)
  if (bits === null) {
    throw new Error('Bad dice phrase ' + dicePhrase)
  }
  let item = 0
  if (bits[3] !== undefined) {
    item = parseInt(bits[3])
  }
  if (bits[4] !== undefined) {
    item = parseInt(bits[4])
  }
  let count = 0
  let diceSize = 0
  if (bits[2] !== undefined) {
    diceSize = parseInt(bits[2])
    count = bits[1] === undefined ? 1 : parseInt(bits[1])
  }

  let spread: Spread<number> = [{ item, probability: always() }]
  while (count > 0) {
    const newSpread: Spread<number> = []
    for (let i = 1; i <= diceSize; i++) {
      spread.forEach(spreadItem => {
        addToSpread(newSpread,
          spreadItem.item + i,
          spreadItem.probability * (1/diceSize)
        )
      })
    }
    spread = newSpread
    count--
  }

  return spread
}