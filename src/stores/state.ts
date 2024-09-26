import { defineStore } from 'pinia'
import type { Weapon } from '@/model/Weapon'
import type { Defender } from '@/model/Defender'

export const getStateStore = defineStore('state', () => {

  const weapons :Weapon[] = []
  const defenders : Defender[] = []

  return {
    weapons,
    defenders
  }
})
