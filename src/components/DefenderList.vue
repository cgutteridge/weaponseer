<script setup lang="ts">
import { getStateStore } from '@/stores/state'
import { computed } from 'vue'
import DefenderItem from '@/components/DefenderItem.vue'
import { faAdd } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

const stateStore = getStateStore()
const count = computed(() => stateStore.defenderCount)

</script>

<template>
  <div class="defender-list">
    <defender-item v-for="n in count" :key="n" :defenderId="n-1"></defender-item>
    <div>
      <FontAwesomeIcon :icon="faAdd"
                       @click="stateStore.addDefaultDefender()"
                       style="cursor: pointer; margin-left: 0.5em" />
    </div>
  </div>
</template>

<style scoped>

</style>