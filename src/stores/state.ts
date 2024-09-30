import { defineStore } from 'pinia'
import type { Weapon } from '@/model/Weapon'
import type { Defender } from '@/model/Defender'
import { computed, type Ref, ref } from 'vue'

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

  return {
    weapons,
    addDefender,
    removeDefender,
    defenderCount,
    getDefender,
    defenders
  }
})
