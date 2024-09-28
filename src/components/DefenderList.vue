<script setup lang="ts">
import { getStateStore } from '@/stores/state'
import { computed } from 'vue'
import DefenderItem from '@/components/DefenderItem.vue'

const stateStore=getStateStore()
const count = computed( ()=>stateStore.defenderCount)

</script>

<template>
<div class="defender-list">
  <defender-item v-for="n in count" :key="n" :defenderId="n-1"></defender-item>
  <div>ADD (TODO)</div>
</div>
</template>

<style scoped>

</style>