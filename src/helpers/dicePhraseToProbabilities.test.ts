import { expect, it } from 'vitest'
import dicePhraseToProbabilities from '@/helpers/dicePhraseToProbabilities'
import probabilityInSpread from '@/helpers/spreadHelpers/probabilityInSpread'

it('works with input 3', () => {
  const output = dicePhraseToProbabilities('3')

  expect(output.length === 1)
  expect(probabilityInSpread(output, 3)).toBeCloseTo(1)
})

it('works with input D6', () => {
  const output = dicePhraseToProbabilities('D6')

  expect(output.length === 3)
  expect(probabilityInSpread(output, 1)).toBeCloseTo(1 / 6)
  expect(probabilityInSpread(output, 2)).toBeCloseTo(1 / 6)
  expect(probabilityInSpread(output, 3)).toBeCloseTo(1 / 6)
  expect(probabilityInSpread(output, 4)).toBeCloseTo(1 / 6)
  expect(probabilityInSpread(output, 5)).toBeCloseTo(1 / 6)
  expect(probabilityInSpread(output, 6)).toBeCloseTo(1 / 6)
})

it('works with input 2D3', () => {
  const output = dicePhraseToProbabilities('2D3')

  expect(output.length === 5)
  expect(probabilityInSpread(output, 2)).toBeCloseTo(1 / 9)
  expect(probabilityInSpread(output, 3)).toBeCloseTo(2 / 9)
  expect(probabilityInSpread(output, 4)).toBeCloseTo(3 / 9)
  expect(probabilityInSpread(output, 5)).toBeCloseTo(2 / 9)
  expect(probabilityInSpread(output, 6)).toBeCloseTo(1 / 9)
})

it('works with input D3+3', () => {
  const output = dicePhraseToProbabilities('D3+3')

  expect(output.length === 3)
  expect(probabilityInSpread(output, 4)).toBeCloseTo(1 / 3)
  expect(probabilityInSpread(output, 5)).toBeCloseTo(1 / 3)
  expect(probabilityInSpread(output, 6)).toBeCloseTo(1 / 3)
})
