<script setup lang="ts">
import type { BattleReport } from '@/model/BattleReport'
import ProbabilityAsPercentage from '@/components/ProbabilityAsPercentage.vue'
import ProbabilityAsGraph from '@/components/ProbabilityAsGraph.vue'

const props = defineProps<{ 'report': BattleReport }>()
</script>

<template>
  <table style="width: 100%;">
    <tr>
      <th>Model</th>
      <th>Wounds<br />inflicted</th>
    </tr>
    <tr>
      <td>No&nbsp;damage</td>
      <td></td>
      <td></td>
      <td style="float:right">
        <probability-as-percentage :probability="report.noDamage"></probability-as-percentage>
      </td>
      <td style="width:100%">
        <probability-as-graph :probability="report.noDamage"
                              :cumulative="report.noDamage"></probability-as-graph>
      </td>
    </tr>
    <template v-for="(unit, unitIndex) in report.units" :key="unitIndex" :item="unit">
      <template v-for="(model, modelIndex) in unit.models" :key="modelIndex" :item="model">
        <tr v-for="(modelState, modelStateIndex) in model" :key="modelStateIndex"
            :item="modelState">
          <td style='background-color:#ccc' v-if="modelStateIndex===0" :rowspan="unit.defender.w">
            {{ unit.defender.name }}
            <template v-if="unit.defender.n>1">{{ modelIndex + 1 }}</template>
          </td>
          <td style="background-color:#ccc;text-align: center">{{ modelState.woundsTaken }}</td>
          <template v-if="modelState.probability.n===0">
            <td></td>
            <td></td>
          </template>
          <template v-else>
            <td style="text-align:right">
              <probability-as-percentage :probability="modelState.cumulative"></probability-as-percentage>
            </td>
            <td style="text-align:right">
              <probability-as-percentage :probability="modelState.probability"></probability-as-percentage>
            </td>
            <td style="text-align:right">
              <probability-as-graph :probability="modelState.probability"
                                    :cumulative="modelState.cumulative"></probability-as-graph>
            </td>
          </template>
        </tr>
      </template>
    </template>
  </table>
</template>

<style scoped>

</style>