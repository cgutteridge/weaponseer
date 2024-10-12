<script setup lang="ts">
import { getStateStore } from '@/stores/state'
import { computed } from 'vue'
import type { Defender } from '@/models/Defender'
import TargetRollInput from '@/components/TargetRollInput.vue'
import NumberInput from '@/components/NumberInput.vue'
import { faBars, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

const stateStore = getStateStore()

const props = defineProps<{ defenderId: number }>()
const defender = computed<Defender>(() => stateStore.getDefender(props.defenderId))
</script>

<template>
  <div style="background-color: #ccc; padding: 0.2rem; margin-bottom: 0.2rem">
    <div>
      <FontAwesomeIcon :icon="faBars" style="margin-right: 0.5rem" />
      <input v-model="defender.name" style="width: 10em" />
      Count:<number-input v-model:value="defender.n" :min="1" :max="30" /> T:<number-input
        v-model:value="defender.t"
        :min="1"
        :max="30"
      />
      AC:
      <target-roll-input v-model:value="defender.ac" />
      W:<number-input v-model:value="defender.w" :min="1" :max="200" /> Inv:<target-roll-input
        v-model:value="defender.invuln"
      />
      FNP:<target-roll-input v-model:value="defender.fnp" />
      <FontAwesomeIcon
        :icon="faTrashCan"
        @click="stateStore.removeDefender(defender.id as number)"
        style="margin-left: 0.5rem; cursor: pointer; display: inline-block"
      />
    </div>
  </div>
</template>

<style scoped></style>
