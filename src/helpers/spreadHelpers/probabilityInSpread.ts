import type { Probability } from '@/models/Probability'
import type { Spread } from '@/models/Spread'
import never from '@/helpers/never'

export default function probabilityInSpread<T> (spread: Spread<T>, item: T): Probability {
  for (let i = 0; i < spread.length; i++) {
    if (spread[i].item === item) {
      return spread[i].probability
    }
  }
  return never()
}