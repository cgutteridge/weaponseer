// modifies the spread to add the chance of a thing happening.
// if there's already a chance, add the probabilities
import type { Spread } from '@/model/Spread'
import type Probability from '@/Probability'

export default function addToSpread<T> (spread: Spread<T>, item: T, probability: Probability) {
  const index = spread.findIndex(spreadItem => spreadItem.item === item)
  if (index === -1) {
    spread.push({ item, probability })
  } else {
    spread[index].probability = spread[index].probability.add(probability)
  }
}