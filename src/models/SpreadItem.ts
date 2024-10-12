// a range of probabilities to get a number

import type { Probability } from '@/models/Probability'

export default interface SpreadItem<T> {
  item: T
  probability: Probability
}
