import type { Spread } from '@/model/Spread'
import Probability from '@/Probability'
import addToSpread from '@/helpers/addToSpread'

export default function dicePhraseToProbability (dicePhrase: string): Spread<number> {
  const diceRegex = /^(\d+)?[dD](\d+)([+-]\d+)?|(\d+)$/

  const bits: RegExpMatchArray | null = dicePhrase.match(diceRegex)
  if (bits === null) {
    throw new Error('Bad dice phrase ' + dicePhrase)
  }
  let n = 0
  if (bits[3] !== undefined) {
    n = parseInt(bits[3])
  }
  if (bits[4] !== undefined) {
    n = parseInt(bits[4])
  }
  let count = 0
  let d = 0
  if (bits[2] !== undefined) {
    d = parseInt(bits[2])
    count = bits[1] === undefined ? 1 : parseInt(bits[1])
  }

  let spread: Spread<number> = [[n, new Probability(1, 1)]]
  while (count > 0) {
    const newSpread: Spread<number> = []
    for (let i = 1; i <= d; i++) {
      spread.forEach(spreadItem => {
        const newV = spreadItem[0] + i
        const newP = spreadItem[1].multiply(new Probability(1, d))
        addToSpread(newSpread, newV, newP)
      })
    }
    spread = newSpread
    count--
  }

  return spread
}