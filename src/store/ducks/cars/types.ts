/**
 * Action types
 */
export enum CarsTypes {
  LOAD_REQUEST = '@repositories/LOAD_REQUEST',
  LOAD_SUCCCES = '@repositories/LOAD_SUCCCES',
  LOAD_FAILURE = '@repositories/LOAD_FAILURE'
}

/**
 * Data types
 */
export interface image {
  images_name: string
}
export interface Car {
  id: string;
  name: string;
  description: string;
  price: number;
  license_plate: string;
  brand: string;
  category_id: string;
  images: image[];
}

export interface ClinicData {
  clinic: Car
}

/**
 * State type
 */
export interface CarsState {
  readonly data: Car[]
  readonly loading: boolean
  readonly error: boolean
}

export interface CarsStateFromback {
  readonly data: Car[]
}
