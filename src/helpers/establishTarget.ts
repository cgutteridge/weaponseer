import type { Defender } from '@/model/Defender'

export default function establishTarget (defState: string[], defenders: Defender[]): Defender | undefined {
// establish target
  const targetIndex = defState.findIndex(defender => {
    const bits = defender.split(',')
    const count = parseInt(bits[0])
    return count > 0
  })
  if (targetIndex === -1) {
    return undefined
  } else {
    return defenders[targetIndex]
  }
}