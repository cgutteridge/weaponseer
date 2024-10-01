import { expect, it } from 'vitest'
import getModifiedRollOutcomes from '@/helpers/getModifiedRollOutcomes'

it('is 50:50 of fail/normal when the roll is 4+ ', () => {
  const output = getModifiedRollOutcomes(4, false, false, 7)
  expect(output.fail).toBeCloseTo( 3/6 )
  expect(output.norm).toBeCloseTo( 3/6 )
  expect(output.crit).toBeCloseTo( 0/6 )
})

it('is 1:5 of fail/normal when the roll is 2+', () => {
  const output = getModifiedRollOutcomes(2, false, false, 7)
  expect(output.fail).toBeCloseTo( 1/6 )
  expect(output.norm).toBeCloseTo( 5/6 )
  expect(output.crit).toBeCloseTo( 0/6 )
})

it('is 5:1 of fail/normal when the roll is 6+', () => {
  const output = getModifiedRollOutcomes(6, false, false, 7)
  expect(output.fail).toBeCloseTo( 5/6 )
  expect(output.norm).toBeCloseTo( 1/6 )
  expect(output.crit).toBeCloseTo( 0/6 )
})

it('is 1:4:1 of fail/normal/crit when the roll is 2+, crit is 6+', () => {
  const output = getModifiedRollOutcomes(2, false, false, 6)
  expect(output.fail).toBeCloseTo( 1/6 )
  expect(output.norm).toBeCloseTo( 4/6 )
  expect(output.crit).toBeCloseTo( 1/6 )
})

it('is 5:1 of fail/normal/crit when the roll is 6+, crit is 6+\'', () => {
  const output = getModifiedRollOutcomes(6, false, false, 6)
  expect(output.fail).toBeCloseTo( 5/6 )
  expect(output.norm).toBeCloseTo( 0/6 )
  expect(output.crit).toBeCloseTo( 1/6 )
})