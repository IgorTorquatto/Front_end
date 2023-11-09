/**
 * Action types
 */
export enum idsTypes {

  UPDATECAR = '@ids/CHANGE_CARID',
}



/**
 * State type
 */
export interface idsState {
  readonly carId: string
  readonly loading: boolean
  readonly error: boolean
}
