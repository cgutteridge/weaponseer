<script setup lang="ts">
import dicePhraseToRollDescription from '@/helpers/dicePhraseToRollDescription'
import { computed, ref, watch } from 'vue'


const props = defineProps<{ roll: string }>()
const emit = defineEmits(['update:roll'])

const inputValue = ref(props.roll)
const inputValid = ref(true) // To track error state

const inputClass = computed(() => {
  return inputValid.value ? 'good' : 'bad'
})

// Watch for changes in the prop and update inputValue accordingly
watch(() => props.roll, (newValue) => {
  inputValue.value = newValue
})

function valueChanged (event: Event) {
  const value = (event.target as HTMLInputElement)?.value ?? ''
  inputValue.value = value
  // emit if valid
  try {
    const dicePhrase = dicePhraseToRollDescription(value)
    inputValid.value = true
    emit('update:roll', value) // Emit the valid value upwards
  } catch (err) {
    inputValid.value = false
  }
}
</script>

<template>
  <input :value="inputValue" style="width:4em" @input="valueChanged" ref="input" :class="inputClass">
</template>

<style scoped>
.bad {
  border: solid 3px red;
}
.good {
  border: solid 3px transparent;
}
</style>