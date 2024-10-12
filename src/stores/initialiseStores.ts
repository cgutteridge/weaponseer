import { getStateStore } from '@/stores/state'

export default function initialiseStores(): void {
  const state = getStateStore()

  state.addDefender({ invuln: 7, n: 5, ac: 3, w: 2, fnp: 7, t: 4, name: 'Marines' })
  state.addDefender({ invuln: 7, n: 1, ac: 3, w: 4, fnp: 7, t: 4, name: 'Marine character' })

  /*
  sarge
  hw team
  special weapon
  6 basic dudes
   */

  /*
  state.addWeapon(
    {
      name: 'Heavy Bolter',
      attacks: '3',
      strength: 5,
      ws: 4,
      ap: -1,
      options: [],
      damage: '2',
    }
  )

   */
  /*
  state.addWeapon(
    {
      name: 'Las Cannon',
      attacks: '1',
      strength: 12,
      ws: 4,
      ap: -3,
      options: [],
      damage: 'D6+1',
    }
  )
*/

  /*
  state.addWeapon(
      {
        name: 'Flamer',
        attacks: 'D6',
        strength: 4,
        ws: 1,
        ap: 0,
        options: [],
        damage: '1',
      }
    )

*/
  state.addWeapon({
    name: 'Lasgun',
    attacks: '12',
    strength: 3,
    ws: 4,
    ap: 0,
    options: [],
    damage: '1'
  })
  /*
  state.addWeapon(
    {
      name: 'Laspistol',
      attacks: '1',
      strength: 3,
      ws: 4,
      ap: 0,
      options: [],
      damage: '1',
    }
  )


   */
}
