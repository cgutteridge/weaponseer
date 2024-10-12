<script setup lang="ts">
import { getStateStore } from '@/stores/state'
import dicePhraseToRollDescription from '@/helpers/dicePhraseToRollDescription'
import { computed, type Ref, ref, watch } from 'vue'
import { n } from 'vitest/dist/reporters-yx5ZTtEV'

const stateStore = getStateStore()

const props = defineProps<{ value: number, min: number, max: number }>()
const emit = defineEmits(['update:value'])

const inputValue: Ref<string> = ref(`${props.value}`)
const inputValid = ref(true) // To track error state

const inputClass = computed(() => {
  return inputValid.value ? 'good' : 'bad'
})

// Watch for changes in the prop and update inputValue accordingly
watch(() => props.value, (newValue) => {
  inputValue.value = `${newValue}`
})

function valueChanged (event: Event) {
  const rawValue: string = (event.target as HTMLInputElement)?.value ?? ''
  const value: number = parseInt(rawValue)
  inputValue.value = rawValue
  if (isNaN(value) || value < props.min || value > props.max) {
    // don't emit bad values
    inputValid.value = false
  } else {
    inputValid.value = true
    emit('update:value', value) // Emit the valid value upwards
  }
}
</script>

<template>
  <input :value="inputValue" @input="valueChanged" size="1" type="number" :min="min" :max="max" :class="inputClass" />
</template>

<style scoped>
.bad {
  border: solid 2px red;
}

.good {
  border: solid 2px transparent;
}
</style>