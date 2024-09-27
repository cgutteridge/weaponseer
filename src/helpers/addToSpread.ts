// modifies the spread to add the chance of a thing happening.
// if there's already a chance, than add the probabilities
import type { Spread } from '@/model/Spread'
import type Probability from '@/Probability'

export default function addToSpread<T> (spread: Spread<T>, newV: T, newP: Probability) {
  const index = spread.findIndex(spreadItem => spreadItem[0] === newV)
  if (index === -1) {
    spread.push([newV, newP])
  } else {
    spread[index][1] = spread[index][1].add(newP)
  }
}