import type RollDescription from '@/models/RollDescription'

export default function dicePhraseToRollDescription(dicePhrase: string): RollDescription {
  const diceRegex = /^((\d+)?[dD]([36])([+-]\d+)?|(\d+))$/

  const bits: RegExpMatchArray | null = dicePhrase.match(diceRegex)
  if (bits === null) {
    throw new Error('Bad dice phrase ' + dicePhrase)
  }
  let n = 0
  if (bits[4] !== undefined) {
    n = parseInt(bits[4])
  }
  if (bits[5] !== undefined) {
    n = parseInt(bits[5])
  }

  let d3 = 0
  let d6 = 0

  if (bits[3] === '3') {
    d3 = bits[2] === undefined ? 1 : parseInt(bits[2])
  }
  if (bits[3] === '6') {
    d6 = bits[2] === undefined ? 1 : parseInt(bits[2])
  }

  return { d3, d6, n }
}
