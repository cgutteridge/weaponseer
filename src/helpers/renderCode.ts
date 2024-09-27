
export default function renderCode (steps: string[], defState: string[]) {
  return steps.join('|') + '>' + defState.join('|')
}