<script setup lang="ts">
import type { BattleReport } from '@/models/BattleReport'
import ProbabilityAsPercentage from '@/components/ProbabilityAsPercentage.vue'
import ProbabilityAsGraph from '@/components/ProbabilityAsGraph.vue'
import { computed } from 'vue'
import type BattleReportUnit from '@/models/BattleReportUnit'
import type BattleReportModel from '@/models/BattleReportModel'

const props = defineProps<{ report: BattleReport }>()

const averageOutput = computed(() => {
  let total = 0
  props.report.units.forEach((unitState: BattleReportUnit) => {
    unitState.models.forEach((modelStates: BattleReportModel[]) => {
      modelStates.forEach((modelState: BattleReportModel) => {
        total += modelState.cumulativeWoundsTaken * modelState.probability
      })
    })
  })
  return total
})
</script>

<template>
  <table style="width: 100%">
    <tr>
      <th>Total<br />Wounds</th>
      <th>Model</th>
      <th>Wounds<br />inflicted</th>
      <td colspan="5" style="text-align: center">Median wounds: {{ averageOutput.toFixed(2) }}</td>
    </tr>
    <tr>
      <td style="text-align: right; background-color: #eee">0</td>
      <td>No&nbsp;damage</td>
      <td></td>
      <td></td>
      <td style="float: right">
        <probability-as-percentage :probability="report.noDamage"></probability-as-percentage>
      </td>
      <td style="width: 100%">
        <probability-as-graph
          :probability="report.noDamage"
          :cumulative="report.noDamage"
        ></probability-as-graph>
      </td>
    </tr>
    <template v-for="(unit, unitIndex) in report.units" :key="unitIndex">
      <template v-for="(model, modelIndex) in unit.models" :key="modelIndex">
        <tr
          v-for="(modelState, modelStateIndex) in model"
          :key="modelStateIndex"
          :item="modelState"
        >
          <td style="text-align: right; background-color: #eee">
            {{ modelState.cumulativeWoundsTaken }}
          </td>
          <td
            style="background-color: #ccc"
            v-if="modelStateIndex === 0"
            :rowspan="unit.defender.w"
          >
            {{ unit.defender.name }}
            <template v-if="unit.defender.n > 1">{{ modelIndex + 1 }}</template>
          </td>
          <td style="background-color: #ccc; text-align: center">{{ modelState.woundsTaken }}</td>
          <template v-if="modelState.probability < 0.000001">
            <td></td>
            <td></td>
          </template>
          <template v-else>
            <td style="text-align: right">
              <probability-as-percentage
                :probability="modelState.cumulative"
              ></probability-as-percentage>
            </td>
            <td style="text-align: right">
              <probability-as-percentage
                :probability="modelState.probability"
              ></probability-as-percentage>
            </td>
            <td style="text-align: right">
              <probability-as-graph
                :probability="modelState.probability"
                :cumulative="modelState.cumulative"
              ></probability-as-graph>
            </td>
          </template>
        </tr>
      </template>
    </template>
  </table>
</template>

<style scoped></style>
