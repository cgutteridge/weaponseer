import type { Defender } from '@/models/Defender'

export default function allocateDamage (defState: string[], defenders: Defender[], damage: number) {
  for (let i = 0; i < defState.length; i++) {
    const dProps = defState[i].split(',')
    let killed: number = parseInt(dProps[0])
    let woundsTaken: number = parseInt(dProps[1])
    if (killed < defenders[i].n) {
      woundsTaken += damage
      if (woundsTaken >= defenders[i].w) {
        killed += 1
        woundsTaken = 0
      }
      defState[i] = `${killed},${woundsTaken}`
      return
    }
  }
}