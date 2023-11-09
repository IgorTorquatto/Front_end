import { Reducer } from 'redux';
import { Car, CarsState, CarsTypes } from './types';

const INITIAL_STATE: CarsState = {
  data: [{} as Car

  ],

  error: false,
  loading: true,
};


const reducer: Reducer<CarsState> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CarsTypes.LOAD_REQUEST:
      return { ...state, loading: true };
    case CarsTypes.LOAD_SUCCCES:
      return {
        ...state, loading: false, error: false, data: action.payload.data,
      };
    case CarsTypes.LOAD_FAILURE:
      return {
        ...state, loading: false, error: true, data: [],
      };
    default:
      return state;
  }
};

export default reducer;
