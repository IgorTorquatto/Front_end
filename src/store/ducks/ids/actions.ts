import { action } from 'typesafe-actions';
import { idsTypes } from './types';

export const updateCar = (id: string) => action(idsTypes.UPDATECAR, { id });

