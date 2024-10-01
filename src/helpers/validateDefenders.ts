import type { Defender } from '@/models/Defender'
import validateDefender from '@/helpers/validateDefender'

export default function validateDefenders (defenders: Defender[]) :boolean {
  for (const defender of defenders) {
    if (!validateDefender(defender)) {
      return false
    }
  }
  return true
}