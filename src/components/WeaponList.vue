<script setup lang="ts">
import { getStateStore } from '@/stores/state'
import { computed } from 'vue'
import DefenderItem from '@/components/DefenderItem.vue'
import WeaponItem from '@/components/WeaponItem.vue'
import { faAdd } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

const stateStore = getStateStore()
const count = computed(() => stateStore.weaponCount)

</script>

<template>
  <div class="weapon-list">
    <weapon-item v-for="n in count" :key="n" :weaponId="n-1"></weapon-item>
    <div>
      <FontAwesomeIcon :icon="faAdd"
                       @click="stateStore.addDefaultWeapon()"
                       style="cursor: pointer; margin-left: 0.5em" />
    </div>
  </div>
</template>

<style scoped>

</style>