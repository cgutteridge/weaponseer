import type { Defender } from '@/model/Defender'

export default function allocateDamage (defState: string[], defenders: Defender[], damage: number) {
  for (let i = 0; i < defState.length; i++) {
    const dProps = defState[i].split(',')
    let count: number = parseInt(dProps[0])
    let woundsTaken: number = parseInt(dProps[1])
    if (count > 0) {
      woundsTaken += damage
      if (woundsTaken >= defenders[i].w) {
        count -= 1
        woundsTaken = 0
      }
      defState[i] = `${count},${woundsTaken}`
      return
    }
  }
}