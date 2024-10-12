export default function nullifyCurrentAttack(steps: string[]) {
  const outputSteps = [...steps]
  // remove everything to the next * from the stepsFail as the sequence ends
  for (let i = 0; outputSteps[i] !== '*' && i < outputSteps.length; i++) {
    if (outputSteps[i].substring(0, 2) == 'D:') {
      outputSteps[i] = 'D:0'
    }
    if (outputSteps[i].substring(0, 3) == 'AD:') {
      outputSteps[i] = 'AD:0'
    }
  }
  return outputSteps
}
