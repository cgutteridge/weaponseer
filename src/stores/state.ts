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

  let nextWeaponId = 0
  let nextDefenderId = 0

  const addWeapon = (weapon: Weapon) => weapons.value.push({ ...weapon, id: nextWeaponId++ })
  const addDefender = (defender: Defender) => defenders.value.push({ ...defender, id: nextDefenderId++ })

  const addDefaultWeapon = () => {
    addWeapon({
      ap: 0, attacks: '1', damage: '1', name: 'Lasgun', options: [], strength: 3, ws: 4
    })
  }
  const addDefaultDefender = () => {
    addDefender({
      ac: 5, fnp: 7, invuln: 7, n: 10, name: 'Guardsman', t: 3, w: 1
    })
  }

  const removeWeapon = (id: number) =>
    weapons.value = weapons.value.filter(weapon => weapon.id !== id)

  const removeDefender = (id: number) =>
    defenders.value = defenders.value.filter(defender => defender.id !== id)

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
      return []
    }
  })

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
    addDefaultDefender,

    weapons,
    addWeapon,
    removeWeapon,
    weaponCount,
    getWeapon,
    addDefaultWeapon,

    startingSpread,
    spreadErrors
  }
})
