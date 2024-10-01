import type { Defender } from '@/models/Defender'

export default function validateDefender (defender: Defender) {
  if (defender.n < 1 || defender.n > 50) {return false}
  if (defender.w < 1) { return false}
  if (defender.ac < 2) { return false}
  if (defender.t < 1) { return false}
  if (defender.invuln < 2) { return false}
  if (defender.fnp < 2) { return false}
  return true
}
