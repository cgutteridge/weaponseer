<script setup lang="ts">
import { getStateStore } from '@/stores/state'
import { computed } from 'vue'
import type { Weapon } from '@/models/Weapon'
import RollInput from '@/components/RollInput.vue'
import TargetRollInput from '@/components/TargetRollInput.vue'
import NumberInput from '@/components/NumberInput.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faTrashCan, faBars } from '@fortawesome/free-solid-svg-icons'

const stateStore = getStateStore()

const props = defineProps<{ weaponId: number }>()
const weapon = computed<Weapon>(() => stateStore.getWeapon(props.weaponId))
</script>

<template>
  <div style="background-color: #ccc; padding: 0.2rem; margin-bottom: 0.2rem">
    <div>
      <FontAwesomeIcon :icon="faBars" style="margin-right: 0.5rem" />

      <input v-model="weapon.name" style="width: 10em" />
      A:
      <roll-input v-model:roll="weapon.attacks" />
      H:
      <target-roll-input v-model:value="weapon.ws" />
      S:
      <number-input v-model:value="weapon.strength" :min="1" :max="30" />
      AP:
      <number-input v-model:value="weapon.ap" :min="-6" :max="0" />
      D:
      <roll-input v-model:roll="weapon.damage" />
      <FontAwesomeIcon
        :icon="faTrashCan"
        @click="stateStore.removeWeapon(weapon.id as number)"
        style="margin-left: 0.5rem; cursor: pointer; display: inline-block"
      />
    </div>
  </div>
</template>

<style scoped></style>
