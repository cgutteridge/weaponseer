import type { Defender } from '@/model/Defender'
import establishTargetIndex from '@/helpers/establishTargetIndex'

export default function establishTarget (defState: string[], defenders: Defender[]): Defender | undefined {
  const targetIndex = establishTargetIndex(defState,defenders)
  if (targetIndex === -1) {
    return undefined
  } else {
    return defenders[targetIndex]
  }
}