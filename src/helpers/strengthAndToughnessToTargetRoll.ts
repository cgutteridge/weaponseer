export default function strengthAndToughnessToTargetRoll (strength: number, toughness: number) {
  let targetRoll = 6
  if (strength >= toughness / 2) { targetRoll = 5 }
  if (strength == toughness) { targetRoll = 4 }
  if (strength > toughness) { targetRoll = 3 }
  if (strength >= toughness * 2) { targetRoll = 2 }
  return targetRoll
}