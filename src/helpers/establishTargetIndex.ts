import type { Defender } from '@/model/Defender'

export default function establishTargetIndex (defState: string[], defenders: Defender[]) {
  const targetIndex = defState.findIndex((defender,defIndex) => {
    const bits = defender.split(',')
    const killed = parseInt(bits[0])
    return killed < defenders[defIndex].n
  })
  return targetIndex
}