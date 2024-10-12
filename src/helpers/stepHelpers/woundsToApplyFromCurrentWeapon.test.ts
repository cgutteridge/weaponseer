import woundsToApplyFromCurrentWeapon from '@/helpers/stepHelpers/woundsToApplyFromCurrentWeapon'
import { expect, it } from 'vitest'

it('returns the value from the first D:n step as a number', () => {
  const output = woundsToApplyFromCurrentWeapon(['H:4', 'AD5', 'AD:23', '*', 'H5', 'AD:17', '*'])
  expect(output).toBe(23)
})

it('returns the 0 if there is no D:n step', () => {
  const output = woundsToApplyFromCurrentWeapon(['H:4', '*', 'H5', '*'])
  expect(output).toBe(0)
})
