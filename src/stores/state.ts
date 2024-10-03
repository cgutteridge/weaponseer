import { defineStore } from 'pinia'
import type { Defender } from '@/models/Defender'
import { computed, type Ref, ref } from 'vue'
import always from '@/helpers/always'
import type { Spread } from '@/models/Spread'
import type { Weapon } from '@/models/Weapon'
import weaponsAndDefendersToStartingSpread from '@/helpers/weaponsAndDefendersToStartingSpread'

export const getStateStore = defineStore('state', () => {

  const weapons: Ref<Weapon[]> = ref([])
  const defenders: Ref<Defender[]> = ref([])

  const addDefender = (defender: Defender) => defenders.value.push(defender)

  const removeDefender = (defenderIndex: number) => defenders.value.splice(defenderIndex, 1)

  const defenderCount = computed(() => defenders.value.length)

  const getDefender = (defenderIndex: number): Defender => {
    const defender = defenders.value[defenderIndex]
    if (defender === null) {
      throw new Error(`No such defender ${defenderIndex}`)
    }
    return defender
  }

  const spreadErrors: Ref<undefined | string> = ref('')

  const startingSpread = computed((): Spread<string> => {
    spreadErrors.value = undefined
    try {
      const startingState = weaponsAndDefendersToStartingSpread(weapons.value, defenders.value)
      console.log(startingState)
      return [
        { item: startingState, probability: always() }
      ]
    } catch (error) {
      console.error(error)
      spreadErrors.value = (error as Error).message
      return [
      ]
    }
  })

  const addWeapon = (weapon: Weapon) => weapons.value.push(weapon)

  const weaponCount = computed(() => weapons.value.length)

  const getWeapon = (weaponIndex: number): Weapon => {
    const weapon = weapons.value[weaponIndex]
    if (weapon === null) {
      throw new Error(`No such weapon ${weaponIndex}`)
    }
    return weapon
  }

  return {

    defenders,
    addDefender,
    removeDefender,
    defenderCount,
    getDefender,

    weapons,
    addWeapon,
    weaponCount,
    getWeapon,

    startingSpread,
    spreadErrors
  }
})
