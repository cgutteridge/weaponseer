import parseDefState from '@/helpers/parseDefState'
import { expect, it } from 'vitest'

it('works correctly', () => {
  const output = parseDefState('0,4|4,5|1,0')
  expect(output).toStrictEqual([
    { killed: 0, woundsTaken: 4 },
    { killed: 4, woundsTaken: 5 },
    { killed: 1, woundsTaken: 0 }
  ])
})
