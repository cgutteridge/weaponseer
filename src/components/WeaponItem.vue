<script setup lang="ts">
import { getStateStore } from '@/stores/state'
import { computed } from 'vue'
import type { Weapon } from '@/models/Weapon'
import RollInput from '@/components/RollInput.vue'
import TargetRollInput from '@/components/TargetRollInput.vue'

const stateStore = getStateStore()

const props = defineProps<{ weaponId: number }>()
const weapon = computed<Weapon>(
  () => stateStore.getWeapon(props.weaponId)
)
</script>

<template>
  <div style="background-color:#ccc; padding: 0.2rem; margin-bottom: 0.2rem">
    <div>
      ✥
      <input v-model="weapon.name" />
      A:
      <roll-input v-model:roll="weapon.attacks" />
      H:
      <target-roll-input v-model:value="weapon.ws" />
      S:<input v-model="weapon.strength" type="number" min="1" max="30" />
      AP:<input v-model="weapon.ap" type="number" min="-6" max="0" />
      D:
      <roll-input v-model:roll="weapon.damage" />
      [remove TODO]
    </div>
  </div>

</template>

<style scoped>

</style>