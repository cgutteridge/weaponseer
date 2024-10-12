import { expect, it } from 'vitest'
import dicePhraseToRollDescription from '@/helpers/dicePhraseToRollDescription'

it('works with input 3', () => {
  const output = dicePhraseToRollDescription('3')

  expect(output).toStrictEqual({ n: 3, d3: 0, d6: 0 })
})

it('works with input D6', () => {
  const output = dicePhraseToRollDescription('D6')

  expect(output).toStrictEqual({ n: 0, d3: 0, d6: 1 })
})

it('works with input 2D3', () => {
  const output = dicePhraseToRollDescription('2D3')

  expect(output).toStrictEqual({ n: 0, d3: 2, d6: 0 })
})

it('works with input D3+3', () => {
  const output = dicePhraseToRollDescription('D3+3')

  expect(output).toStrictEqual({ n: 3, d3: 1, d6: 0 })
})

// TODO test error cases
