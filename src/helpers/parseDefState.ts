import type DefenderState from '@/models/DefenderState'

export default function parseDefState (defStateString: string): DefenderState[] {
  const strForm: string[][] = defStateString.split(/\|/).map(defStateItem => defStateItem.split(/,/))
  const numForm: number[][] = strForm.map(strNums => strNums.map(str => parseInt(str)))
  return numForm.map( numFormItem=>{return {killed:numFormItem[0],woundsTaken:numFormItem[1]}
  })
}