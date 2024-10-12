export default function addMortalWoundsToApply(steps: string[], mortalWounds: number): string[] {
  const outputSteps = [...steps]
  // remove everything to the next * from the stepsFail as the sequence ends
  // should just be one M: step near the end
  for (let i = 0; i < outputSteps.length; i++) {
    if (outputSteps[i].substring(0, 2) == 'M:') {
      const currentMortalWounds = parseInt(outputSteps[i].substring(2))
      outputSteps[i] = `M:${currentMortalWounds + mortalWounds}`
      break
    }
  }
  return outputSteps
}
