import type { Defender } from '@/models/Defender'
import type { Spread } from '@/models/Spread'
import validateDefenders from '@/helpers/validateDefenders'
import never from '@/helpers/never'
import processSpreadStep from '@/helpers/processSpreadStep'
import battleSpreadToBattleReport from '@/helpers/battleSpreadToBattleReport'

export default function resolveBattleSpread(defenders: Defender[], startingSpread: Spread<string>) {
  if (!validateDefenders(defenders)) {
    return { units: [], noDamage: never() }
  }
  let battleSpread: Spread<string> = [...startingSpread]

  while (battleSpread[0].item[0] !== '>') {
    battleSpread = processSpreadStep(battleSpread, defenders)
    console.log(battleSpread)
  }
  return battleSpreadToBattleReport(battleSpread, defenders)
}
