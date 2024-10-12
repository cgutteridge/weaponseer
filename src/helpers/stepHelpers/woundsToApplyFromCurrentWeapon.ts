// find the damage we are expecting to do with the next weapon
// so we can ruin it with a FNP probably
export default function woundsToApplyFromCurrentWeapon(steps: string[]): number {
  const outputSteps = [...steps]
  // remove everything to the next * from the stepsFail as the sequence ends
  for (let i = 0; outputSteps[i] !== '*' && i < outputSteps.length; i++) {
    if (outputSteps[i].substring(0, 3) == 'AD:') {
      return parseInt(outputSteps[i].substring(3))
    }
  }
  return 0
}
