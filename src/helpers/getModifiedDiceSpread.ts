
export default function getModifiedDiceSpread (target: number, reroll: boolean, reroll1: boolean, crit: number) {
  const outcomes = { fail: 0, normal: 0, crit: 0 }
  for (let d1 = 1; d1 <= 6; d1++) {
    if (d1 >= crit) {
      outcomes.crit += 6
    } else if (d1 >= target) {
      outcomes.normal += 6
    } else {
      if (reroll || (reroll1 && d1 == 1)) {
        for (let d2 = 1; d2 <= 6; d2++) {
          if (d2 >= crit) {
            outcomes.crit += 1
          } else if (d2 >= target) {
            outcomes.normal += 1
          } else {
            outcomes.fail += 1
          }
        }
      } else {
        outcomes.fail += 6
      }
    }
  }
  return outcomes
}