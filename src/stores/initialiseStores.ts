import { getStateStore } from '@/stores/state'

export default function initialiseStores (): void {
  const state = getStateStore()
  state.addDefender( { invuln: 7, n: 5, ac: 3, w: 2, fnp: 7, t: 4, name:"Marines" } )
  state.addDefender( { invuln: 7, n: 1, ac: 3, w: 4, fnp: 7, t: 4, name:"Marine character"} )
}
