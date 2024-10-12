// sets actual damage on the current weapon
export default function setWoundsToApply(steps: string[], damage: number): string[] {
  const outputSteps = [...steps]
  // remove everything to the next * from the stepsFail as the sequence ends
  for (let i = 0; outputSteps[i] !== '*' && i < outputSteps.length; i++) {
    if (outputSteps[i].substring(0, 3) == 'AD:') {
      outputSteps[i] = `AD:${damage}`
    }
  }
  return outputSteps
}
