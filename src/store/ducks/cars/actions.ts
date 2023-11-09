import { action } from 'typesafe-actions';
import { CarsTypes, Car } from './types';



export const loadRequest = (data: string) => action(CarsTypes.LOAD_REQUEST, { data });

export const loadSuccess = (data: Car[]) => action(CarsTypes.LOAD_SUCCCES, { data });

export const loadFailure = () => action(CarsTypes.LOAD_FAILURE);
